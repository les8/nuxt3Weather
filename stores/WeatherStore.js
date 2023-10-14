import { defineStore } from 'pinia';
import { kelvinToFahrenheit } from '@/helpers/formules';

function createWeatherObject() {
  return {
    coord: {
      lon: null,
      lat: null,
    },
    weather: [
      {
        id: null,
        main: '',
        description: '',
        icon: '',
      },
    ],
    main: {
      temp: null,
      feels_like: null,
      temp_min: null,
      temp_max: null,
      pressure: null,
      humidity: null,
    },
    wind: {
      speed: null,
      deg: null,
      gust: null,
    },
    clouds: {
      all: null,
    },
    sys: {
      type: null,
      id: null,
      country: '',
      sunrise: null,
      sunset: null,
    },
    base: '',
    visibility: null,
    dt: null,
    timezone: null,
    id: null,
    name: '',
    cod: null,
  };
}

export const useWeatherStore = defineStore('weatherStore', () => {
  let currentCity = ref('Okinawa');
  let previousCity = ref('');
  let currentWeatherByPosition = ref(createWeatherObject());
  let currentWeatherByName = ref(createWeatherObject());
  let currentPosition = ref({});
  let inFahrenheit = ref(false);
  let fahrenheitTemperature = ref('');
  let isGeolocationActive = ref(false);
  let isLoadingData = ref(false);
  let isMenuVisible = ref(false);
  let mode = ref('Position'); // Name | Position

  function setCurrentCity(newCurrentCity) {
    currentCity.value = newCurrentCity;
  }

  function setPreviousCity() {
    previousCity.value = currentCity.value;
  }

  function setCurrentWeather(newCurrentWeather) {
    mode.value === 'Position'
      ? (currentWeatherByPosition.value = newCurrentWeather)
      : (currentWeatherByName.value = newCurrentWeather);
  }

  function setCurrentPosition(newCurrentPosition) {
    currentPosition.value = newCurrentPosition;
  }

  function toggleFahrenheitTemperature(boolean) {
    inFahrenheit.value = boolean;
  }

  function setFahrenheitTemperature(value) {
    fahrenheitTemperature.value = value;
  }

  function toggleGeolocationActivity(boolean) {
    isGeolocationActive.value = boolean;
  }

  function toggleLoading(boolean) {
    isLoadingData.value = boolean;
  }

  function toggleMenuVisibility(boolean) {
    isMenuVisible.value = boolean;
  }

  function setMode(value) {
    mode.value = value;
  }

  async function setWeatherByName() {
    toggleLoading(true);

    const cityForRequest = currentCity.value;

    try {
      const weatherByName = await $fetch(
        `/api/weather/data?city=${cityForRequest}`
      );

      setMode('Name');
      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByName.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e) {
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
      const weatherByCoords = await $fetch(
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

    function getCoordinates() {
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
    } catch (e) {
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
