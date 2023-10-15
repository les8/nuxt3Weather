import { defineStore } from 'pinia';
import { kelvinToFahrenheit } from '@/helpers/formules';
import { Weather, Mode, Position, PositionCoords } from '~/types/weather/weather';

function createWeatherObject(): Weather {
  return {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    clouds: {
      all: 0,
    },
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    base: '',
    visibility: 0,
    dt: 0,
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  };
}

function createPosition(): PositionCoords {
  return {
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 0,
    longitude: 0,
    speed: null,
  }
}

export const useWeatherStore = defineStore('weatherStore', () => {
  let currentCity = ref<string>('Okinawa');
  let previousCity = ref<string>('');
  let currentWeatherByPosition = ref<Weather>(createWeatherObject());
  let currentWeatherByName = ref<Weather>(createWeatherObject());
  let currentPosition = ref<PositionCoords>(createPosition());
  let inFahrenheit = ref<boolean>(false);
  let fahrenheitTemperature = ref<string>('');
  let isGeolocationActive = ref<boolean>(false);
  let isLoadingData = ref<boolean>(false);
  let isMenuVisible = ref<boolean>(false);
  let mode = ref<Mode>('Position'); // Name | Position

  function setCurrentCity(newCurrentCity: string) {
    currentCity.value = newCurrentCity;
  }

  function setPreviousCity() {
    previousCity.value = currentCity.value;
  }

  function setCurrentWeather(newCurrentWeather: Weather) {
    mode.value === 'Position'
      ? (currentWeatherByPosition.value = newCurrentWeather)
      : (currentWeatherByName.value = newCurrentWeather);
  }

  function setCurrentPosition(newCurrentPosition: PositionCoords) {
    currentPosition.value = newCurrentPosition;
  }

  function toggleFahrenheitTemperature(boolean: boolean) {
    inFahrenheit.value = boolean;
  }

  function setFahrenheitTemperature(value: string) {
    fahrenheitTemperature.value = value;
  }

  function toggleGeolocationActivity(boolean: boolean) {
    isGeolocationActive.value = boolean;
  }

  function toggleLoading(boolean: boolean) {
    isLoadingData.value = boolean;
  }

  function toggleMenuVisibility(boolean: boolean) {
    isMenuVisible.value = boolean;
  }

  function setMode(value: Mode) {
    mode.value = value;
  }

  async function setWeatherByName() {
    toggleLoading(true);

    const cityForRequest = currentCity.value;

    try {
      const weatherByName = await $fetch<Weather>(
        `/api/weather/data?city=${cityForRequest}`
      );

      setMode('Name');
      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByName.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e: any) {
      toggleLoading(false);

      const error = e.data;

      if (error.data.cod === '404' && error.data.message === 'city not found') {
        setCurrentCity(previousCity.value);

        return {
          id: 'city_not_found',
          title: `City '${cityForRequest}' not found.`,
          color: 'orange',
          timeout: 3500,
        };
      } else console.error(error);
    }
  }

  async function setWeatherByCoords() {
    toggleLoading(true);

    try {
      const weatherByCoords = await $fetch<Weather>(
        `/api/weather/data?latitude=${currentPosition.value.latitude}&longitude=${currentPosition.value.longitude}`
      );

      setMode('Position');
      setCurrentWeather(weatherByCoords);
      setCurrentCity(weatherByCoords.name);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByCoords.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e) {
      console.error(e);
      toggleLoading(false);
    }
  }

  async function setCoordinates() {
    toggleLoading(true);

    function getCoordinates(): Promise<Position> {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }

    try {
      const position = await getCoordinates();      

      if (
        position.coords.latitude !== currentPosition.value.latitude &&
        position.coords.longitude !== currentPosition.value.longitude
      ) {
        setCurrentPosition(position.coords);
        toggleGeolocationActivity(true);
        toggleLoading(false);
        setWeatherByCoords();
      } else {
        setMode('Position');
        setCurrentCity(currentWeatherByPosition.value.name);
        toggleLoading(false);
      }
    } catch (e: any) {
      if (e.code === 1) {
        toggleGeolocationActivity(false);
        toggleLoading(false);

        return {
          id: 'no_geolocation',
          title:
            'To get the weather in your region, please enable geolocation.',
          color: 'orange',
          timeout: 3000,
        };
      }
    }
  }

  async function setInitialWeather() {
    await setCoordinates();

    if (!isGeolocationActive.value) {
      setWeatherByName();
    }
  }

  return {
    currentCity,
    currentWeatherByPosition,
    currentWeatherByName,
    currentPosition,
    inFahrenheit,
    fahrenheitTemperature,
    isGeolocationActive,
    isLoadingData,
    isMenuVisible,
    mode,
    setCurrentCity,
    setPreviousCity,
    setCurrentWeather,
    setCurrentPosition,
    toggleFahrenheitTemperature,
    toggleMenuVisibility,
    setFahrenheitTemperature,
    setWeatherByName,
    setWeatherByCoords,
    setCoordinates,
    setInitialWeather,
    setMode,
  };
});
