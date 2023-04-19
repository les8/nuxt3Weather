import { defineStore } from 'pinia';
import { useFetch } from 'nuxt/app';
import { kelvinToFahrenheit } from '@/helpers/formules';

export const useWeatherStore = defineStore('weatherStore', () => {
  let currentCity = ref('London');
  let currentWeather = ref({});
  let apiKey = ref('');
  let currentPosition = ref({});
  let inFahrenheit = ref(false);
  let fahrenheitTemperature = ref('');

  function setCurrentCity(newCurrentCity) {
    currentCity.value = newCurrentCity;
  }

  function setCurrentWeather(newCurrentWeather) {
    currentWeather.value = newCurrentWeather;
  }

  function setCurrentPosition(newCurrentPosition) {
    currentPosition.value = newCurrentPosition;
  }

  function toggleFahrenheitTemperature(booleanValue) {
    inFahrenheit.value = booleanValue;
  }

  function setFahrenheitTemperature(value) {
    fahrenheitTemperature.value = value;
  }

  function setCurrentApi(value) {
    apiKey.value = value;
  }

  async function setWeatherByName() {
    try {
      const weatherByName = await $fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey.value}`
      );

      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(kelvinToFahrenheit(weatherByName.main.temp).toFixed(0));
    } catch {
      alert("Something went wrong");
    }
  }

  async function setWeatherByCoords() {
    function getCoordinates() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
    await getCoordinates().then((pos) =>
      setCurrentPosition(pos.coords)
    );
    try {
      const weatherByCoords = await $fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${apiKey}`
      );

      setCurrentWeather(weatherByCoords);
      setCurrentCity(weatherByCoords.name);
      setFahrenheitTemperature(kelvinToFahrenheit(weatherByCoords.main.temp).toFixed(0));
    } catch {
      alert("Something went wrong");
    }
  }

  return {
    currentCity,
    currentWeather,
    apiKey,
    currentPosition,
    inFahrenheit,
    fahrenheitTemperature,
    setCurrentCity,
    setCurrentWeather,
    setCurrentPosition,
    toggleFahrenheitTemperature,
    setFahrenheitTemperature,
    setCurrentApi,
    setWeatherByName,
    setWeatherByCoords,
  }
})
