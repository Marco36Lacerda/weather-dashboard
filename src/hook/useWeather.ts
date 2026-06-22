import { useState, useEffect } from "react";
import type { UnitsType, WeatherData } from "../types/weather";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather(lat: number | null, lon: number | null) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<UnitsType>("metric");

  useEffect(() => {
    if (lat === null || lon === null) return;
    async function fetchWeather() {
      try {
        setLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const weatherCity = await response.json();
        setData(weatherCity);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lon, unit]);

  return { data, loading, error, unit, setUnit };
}
