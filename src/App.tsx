import { useGeoCoding } from "./hook/useGeoCoding";
import { useWeather } from "./hook/useWeather";
import { LocationPicker } from "./components/LocationPicker";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { useState } from "react";
import type { GeoCoding } from "./types/weather";
import { TemperatureToggle } from "./components/TemperatureToggle";
import { useDebounce } from "./hook/useDebounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<GeoCoding | null>(
    null,
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchTerm, 400);
  const {
    data: locations,
    loading: geoLoading,
    error: geoError,
  } = useGeoCoding(debouncedSearch);
  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
    unit,
    setUnit,
  } = useWeather(selectedLocation?.lat ?? null, selectedLocation?.lon ?? null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowPicker(term.trim().length >= 3);
  };

  const handleSelect = (location: GeoCoding) => {
    setSelectedLocation(location);
    setShowPicker(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-slate-100 py-12 px-4">
      <div className="max-w-md mx-auto relative">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Weather
        </h1>
        <div className="relative">
          <SearchBar onSearch={handleSearch} />

          {geoLoading && (
            <p className="text-slate-500 text-sm mt-3">
              Searching locations...
            </p>
          )}
          {geoError && <p className="text-red-600 text-sm mt-3">{geoError}</p>}

          {showPicker && locations.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1">
              <LocationPicker locations={locations} onSelect={handleSelect} />
            </div>
          )}
        </div>
        {weatherLoading && (
          <p className="text-slate-500 text-sm mt-3">Loading weather...</p>
        )}
        {weatherError && (
          <p className="text-red-600 text-sm mt-3">{weatherError}</p>
        )}

        {weather && selectedLocation && (
          <div className="mt-4 relative z-10">
            <TemperatureToggle unit={unit} onToggle={setUnit} />
            <WeatherCard
              data={weather}
              unit={unit}
              geoCoding={selectedLocation}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
