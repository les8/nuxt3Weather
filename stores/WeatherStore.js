import { defineStore } from 'pinia';
import { kelvinToFahrenheit } from '@/helpers/formules';

export const useWeatherStore = defineStore('weatherStore', () => {
  let currentCity = ref('');
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

  function toggleFahrenheitTemperature() {
    inFahrenheit.value = !inFahrenheit.value;
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.value.latitude}&lon=${currentPosition.value.longitude}&appid=${apiKey.value}`
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
