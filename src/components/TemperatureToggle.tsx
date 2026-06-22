import type { UnitsType } from "../types/weather";

interface TemperatureToggleProps {
  unit: UnitsType;
  onToggle: (unit: UnitsType) => void;
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="gap-2 flex">
      <button
        className={` justify-self-auto py-2 px-4 rounded-2xl border  border-violet-800  hover:bg-violet-300  ${unit === "metric" ? "bg-violet-700 text-white" : "bg-violet-200 text-black"}`}
        onClick={() => onToggle("metric")}
      >
        °C
      </button>
      <button
        className={` justify-self-auto py-2 px-4 rounded-2xl border  border-violet-800  hover:bg-violet-300  ${unit === "imperial" ? "bg-violet-700 text-white" : "bg-violet-200 text-black"}`}
        onClick={() => onToggle("imperial")}
      >
        °F
      </button>
    </div>
  );
}
