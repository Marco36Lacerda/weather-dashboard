import type { GeoCoding } from "../types/weather";

interface LocationItemProps {
  location: GeoCoding;
  onSelect: (location: GeoCoding) => void;
}

export function LocationItem({ location, onSelect }: LocationItemProps) {
  return (
    <li
      onClick={() => onSelect(location)}
      className="px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 cursor-pointer transition"
    >
      {location.name}, {location.state && `${location.state}, `}
      {location.country}
    </li>
  );
}
