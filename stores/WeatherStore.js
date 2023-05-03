import { defineStore } from 'pinia';
import { kelvinToFahrenheit } from '@/helpers/formules';

export const useWeatherStore = defineStore('weatherStore', () => {
  let currentCity = ref('Okinawa');
  let previousCity = ref('');
  let currentWeather = ref({});
  let currentPosition = ref({});
  let inFahrenheit = ref(false);
  let fahrenheitTemperature = ref('');
  let isGeolocationActive = ref(false);

  function setCurrentCity(newCurrentCity) {
    currentCity.value = newCurrentCity;
  }

  function setPreviousCity() {
    previousCity.value = currentCity.value;
  }

  function setCurrentWeather(newCurrentWeather) {
    currentWeather.value = newCurrentWeather;
  }

  function setCurrentPosition(newCurrentPosition) {
    currentPosition.value = newCurrentPosition;
  }

  function clearCurrentPosition() {
    //т.к. на данный момент погода по запросу и по координатам хранится в одном месте
    currentPosition.value = {};
  }

  function toggleFahrenheitTemperature(boolean) {
    inFahrenheit.value = boolean;
  }

  function setFahrenheitTemperature(value) {
    fahrenheitTemperature.value = value;
  }

  function toggleGeolocationActivity(boolean) {
    isGeolocationActive.value = boolean
  }

  async function setWeatherByName() {
    clearCurrentPosition();

    try {
      const weatherByName = await $fetch(`/api/weather/data?city=${currentCity.value}`);

      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(kelvinToFahrenheit(weatherByName.main.temp).toFixed(0));
    } catch (e) {
      const error = e.data;
      if (error.data.cod === '404' && error.data.message === 'city not found') {
        setCurrentCity(previousCity.value);        
        alert('City not found.');
      } else alert(error);
    }
  }

  async function setWeatherByCoords() {
    try {
      const weatherByCoords = await $fetch(`/api/weather/data?latitude=${currentPosition.value.latitude}&longitude=${currentPosition.value.longitude}`);

      setCurrentWeather(weatherByCoords);
      setCurrentCity(weatherByCoords.name);
      setFahrenheitTemperature(kelvinToFahrenheit(weatherByCoords.main.temp).toFixed(0));
    } catch (e) {
      alert(e);
    }
  }

  async function setCoordinates() {
    function getCoordinates() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }

    try {
      const position = await getCoordinates();
      if (position.coords.latitude !== currentPosition.value.latitude 
        && position.coords.longitude !== currentPosition.value.longitude) {

        setCurrentPosition(position.coords);
        toggleGeolocationActivity(true);
        setWeatherByCoords();
      }
    } catch (e) {
      if (e.code === 1) {
        alert('Please, turn on your geolocation.')
        toggleGeolocationActivity(false);
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
    currentWeather,
    currentPosition,
    inFahrenheit,
    fahrenheitTemperature,
    isGeolocationActive,
    setCurrentCity,
    setPreviousCity,
    setCurrentWeather,
    setCurrentPosition,
    toggleFahrenheitTemperature,
    setFahrenheitTemperature,
    setWeatherByName,
    setWeatherByCoords,
    setCoordinates,
    setInitialWeather,
  }
})
