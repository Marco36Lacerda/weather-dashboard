import type { GeoCoding } from "../types/weather";
import { LocationItem } from "./LocationItem";

interface LocationPickerProps {
  locations: GeoCoding[];
  onSelect: (location: GeoCoding) => void;
}
export function LocationPicker({ locations, onSelect }: LocationPickerProps) {
  return (
    <ul className="mt-2 bg-white rounded-lg shadow-sm border border-slate-200 divide-slate-100 overflow-hidden">
      {locations.length === 0 ? (
        <li className="px-4 py-3 text-sm text-slate-400">No locations found</li>
      ) : (
        locations.map((location) => (
          <LocationItem
            key={location.lat}
            location={location}
            onSelect={onSelect}
          />
        ))
      )}
    </ul>
  );
}
