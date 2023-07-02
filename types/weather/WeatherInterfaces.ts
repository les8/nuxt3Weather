import {
  Main,
  Sys,
  Wind,
  Clouds,
  Coord,
  WeatherItem,
} from "./CommonWeaterInterfaces";

export interface CurrentWeather {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  name: string;
  timezone: number;
  visibility: number;
  weather: WeatherItem[];
  main: Main;
  sys: Sys;
  wind: Wind;
}
