interface Coord {
  lon: number;
  lat: number;
}

interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export type Mode = 'Name' | 'Position';

export interface Weather {
  coord: Coord;
  weather: WeatherItem[];
  main: Main;
  wind: Wind;
  clouds: Clouds;
  sys: Sys;
  base: string;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Position {
  coords: PositionCoords;
  timestamp: number;
}

export interface PositionCoords {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}
