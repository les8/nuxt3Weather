export interface CommonWeather {
  base: string,
  clouds: Clouds,
  cod: number,
  coord: Coord,
  dt: number,
  id: number,
  name: string,
  timezone: number,
  weather: WeatherItem[],
}

export interface Clouds {
  all: number,
}

export interface Coord {
  lat: number,
  lon: number,
}

export interface Main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherItem {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Sys {
  country: string,
  sunrise: number,
  sunset: number,
}

export interface Wind {
  deg: number;
  speed: number;
}
