import { Main, Sys, Wind, CommonWeather } from "./CommonWeaterInterfaces";

export interface WeatherByName extends CommonWeather {
  main: Main;
  sys: SysWeatherByName;
  wind: Wind;
}

export interface WeatherByCoords extends CommonWeather {
  main: MainWeatherByCoords;
  sys: Sys;
  wind: WindWeatherByCoords;
}

interface SysWeatherByName extends Sys {
  id: number;
  type: number;
}

interface MainWeatherByCoords extends Main {
  grnd_level: number;
  sea_level: number;
}

interface WindWeatherByCoords extends Wind {
  gust: number;
}
