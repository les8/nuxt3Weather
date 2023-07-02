import { PositionCoords } from "~/types/Position";
import { CurrentWeather } from "~/types/weather/WeatherInterfaces";

export const nullCurrentPosition: PositionCoords = {
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
};

export const nullCurrentWeather: CurrentWeather = {
  base: "",
  clouds: {
    all: 0,
  },
  cod: 0,
  coord: {
    lat: 0,
    lon: 0,
  },
  dt: 0,
  id: 0,
  name: "",
  timezone: 0,
  visibility: 0,
  weather: [
    {
      description: "",
      icon: "",
      id: 0,
      main: "",
    },
  ],
  main: {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  sys: {
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  wind: {
    deg: 0,
    speed: 0,
  },
};
