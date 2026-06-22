import { useState, useEffect } from "react";
import type { GeoCoding } from "../types/weather";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function useGeoCoding(city: string) {
  const [data, setData] = useState<GeoCoding[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city.trim().length === 0) {
      return;
    }
    async function fetchLocation() {
      try {
        setLoading(true);
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const cityLoc = await response.json();
        setData(cityLoc);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchLocation();
  }, [city]);
  return { data, loading, error };
}
