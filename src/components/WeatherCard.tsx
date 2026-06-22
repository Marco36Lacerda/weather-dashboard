import type { GeoCoding, UnitsType, WeatherData } from "../types/weather";
import { formatDate, localTime } from "../utils/formatDate";

interface WeatherCardProps {
  data: WeatherData;
  unit: UnitsType;
  geoCoding: GeoCoding;
}

export function WeatherCard({ data, unit, geoCoding }: WeatherCardProps) {
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const cityCurrentTime = localTime(data.dt, data.timezone);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-3">
      <h2 className="text-sm text-slate-500 mb-1">
        {geoCoding.name} · {cityCurrentTime}
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Your local time: {formatDate()}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <img src={iconSrc} className="w-16 h-16" />
        <div>
          <p className="text-4xl font-bold text-slate-800">
            {Math.round(data.main.temp)}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <p className="text-sm text-slate-500 capitalize">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
        <p>Humidity: {data.main.humidity}%</p>
        <p>
          Wind: {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}
        </p>
        <p>Max: {Math.round(data.main.temp_max)}°</p>
        <p>Min: {Math.round(data.main.temp_min)}°</p>
        <p>Sunrise: {localTime(data.sys.sunrise, data.timezone)}</p>
        <p>Sunset: {localTime(data.sys.sunset, data.timezone)}</p>
      </div>
    </div>
  );
}
