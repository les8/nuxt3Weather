import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weatherStore', () => {
  const currentCity = ref('');
  const currentWeather = ref({});
  const apiKey = ref('');
  const currentPosition = ref({});
  const inFahrenheit = ref(false);
  const fahrenheitTemperature = ref('');

  function setCurrentCity(newCurrentCity) {
    currentCity = newCurrentCity;
  }

  function setCurrentWeather(newCurrentWeather) {
    currentWeather = newCurrentWeather;
  }

  function setCurrentPosition(newCurrentPosition) {
    currentPosition = newCurrentPosition;
  }

  function toggleFahrenheitTemperature(booleanValue) {
    inFahrenheit = booleanValue;
  }

  function setFahrenheitTemperature(value) {
    fahrenheitTemperature = value;
  }

  function setCurrentApi(value) {
    apiKey = value;
  }

  async function setWeatherByName() {
    try {
      const weatherByName = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`
        )
        .then((response) => response.data);
      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(kelvinToFahrenheit(weatherByName.main.temp).toFixed(0));
    } catch {
      alert("Incorrect name");
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
      const weatherByCoords = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${apiKey}`
        )
        .then((response) => response.data);
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
