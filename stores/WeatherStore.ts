import { defineStore } from "pinia";
import { kelvinToFahrenheit } from "@/helpers/formules";
import { Mode } from "~/types/Mode";
import {
  WeatherByCoords,
  WeatherByName,
} from "~/types/weather/WeatherInterfaces";
import { Position, PositionCoords } from "~/types/Position";

const nullCurrentPosition = {
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
}

export const useWeatherStore = defineStore("weatherStore", () => {
  let mode = ref<Mode>("name");
  let currentCity = ref<string>("Okinawa");
  let previousCity = ref<string>("");
  let currentWeather =
    mode.value === "name"
      ? ref<WeatherByName | {}>({})
      : ref<WeatherByCoords | {}>({});
  let currentPosition = ref<PositionCoords>(structuredClone(nullCurrentPosition));
  let inFahrenheit = ref<boolean>(false);
  let fahrenheitTemperature = ref<string>("");
  let isGeolocationActive = ref<boolean>(false);
  let isLoadingData = ref<boolean>(false);
  let isMenuVisible = ref<boolean>(false);

  function setCurrentCity(newCurrentCity: string) {
    currentCity.value = newCurrentCity;
  }

  function setPreviousCity() {
    previousCity.value = currentCity.value;
  }

  function setCurrentWeather(
    newCurrentWeather: WeatherByName | WeatherByCoords
  ) {
    currentWeather.value = newCurrentWeather;
  }

  function setCurrentPosition(newCurrentPosition: PositionCoords) {
    currentPosition.value = newCurrentPosition;
  }

  function clearCurrentPosition() {
    //т.к. на данный момент погода по запросу и по координатам хранится в одном месте
    currentPosition.value = structuredClone(nullCurrentPosition);
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

  async function setWeatherByName(): Promise<void> {
    toggleLoading(true);
    clearCurrentPosition();
    setMode("name");

    try {
      const weatherByName: WeatherByName = await $fetch(
        `/api/weather/data?city=${currentCity.value}`
      );

      setCurrentWeather(weatherByName);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByName.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e: any) {
      toggleLoading(false);
      const error = e.data;
      if (error.data.cod === "404" && error.data.message === "city not found") {
        setCurrentCity(previousCity.value);
        alert("City not found.");
      } else alert(error);
    }
  }

  async function setWeatherByCoords(): Promise<void> {
    toggleLoading(true);

    try {
      const weatherByCoords: WeatherByCoords = await $fetch(
        `/api/weather/data?latitude=${currentPosition.value.latitude}&longitude=${currentPosition.value.longitude}`
      );

      setCurrentWeather(weatherByCoords);
      setCurrentCity(weatherByCoords.name);
      setFahrenheitTemperature(
        kelvinToFahrenheit(weatherByCoords.main.temp).toFixed(0)
      );

      setTimeout(toggleLoading, 600, false);
    } catch (e) {
      alert(e);
      toggleLoading(false);
    }
  }

  async function setCoordinates(): Promise<void> {
    toggleLoading(true);

    function getCoordinates(): Promise<Position> {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }

    try {
      const position: Position = await getCoordinates();

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
    } catch (e: any) {
      if (e.code === 1) {
        alert("Please, turn on your geolocation.");
        toggleGeolocationActivity(false);
        toggleLoading(false);
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
