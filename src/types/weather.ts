export interface MainData {
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface WeatherCondition {
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
}

export interface Sys {
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  name: string;
  main: MainData;
  weather: WeatherCondition[];
  wind: Wind;
  sys: Sys;
  timezone: number;
  dt: number;
}

export interface GeoCoding {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export type UnitsType = "metric" | "imperial" | "standard";
