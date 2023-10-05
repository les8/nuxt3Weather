import { defineStore } from "pinia";
import { kelvinToFahrenheit } from "@/helpers/formules";

export const useWeatherStore = defineStore("weatherStore", () => {
  let currentCity = ref("Okinawa");
  let previousCity = ref("");
  let currentWeather = ref({});
  let currentPosition = ref({});
  let inFahrenheit = ref(false);
  let fahrenheitTemperature = ref("");
  let isGeolocationActive = ref(false);
  let isLoadingData = ref(false);
  let isMenuVisible = ref(false);
  let mode = ref("name");

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
    clearCurrentPosition();
    setMode("name");

    const cityForRequest = currentCity.value;

    try {
      const weatherByName = await $fetch(
        `/api/weather/data?city=${cityForRequest}`
      );

      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByName.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e) {
      toggleLoading(false);
      const error = e.data;
      if (error.data.cod === "404" && error.data.message === "city not found") {
        setCurrentCity(previousCity.value);

        return {
          id: "city_not_found",
          title: `City '${cityForRequest}' not found.`,
          color: "orange",
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
        setMode("location");
        setCurrentPosition(position.coords);
        toggleGeolocationActivity(true);
        toggleLoading(false);
        setWeatherByCoords();
      } else setTimeout(toggleLoading, 600, false);
    } catch (e) {
      if (e.code === 1) {
        toggleGeolocationActivity(false);
        toggleLoading(false);

        return {
          id: "no_geolocation",
          title:
            "To get the weather in your region, please enable geolocation.",
          color: "orange",
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
    currentWeather,
    currentPosition,
    inFahrenheit,
    fahrenheitTemperature,
    isGeolocationActive,
    isLoadingData,
    isMenuVisible,
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
  };
});
