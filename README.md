# Project 2 — Weather Dashboard

A weather dashboard built as part of a structured frontend curriculum to learn REST APIs, async patterns, custom hooks, and TypeScript with real external data.

## What it does

- Search for any city and see current weather conditions
- Geocoding with disambiguation — multiple cities with the same name are presented as a dropdown list, allowing the user to pick the exact location
- Displays temperature, description, humidity, wind speed, min/max temp, sunrise, and sunset — all in the local time of the searched city
- Toggle between Celsius and Fahrenheit
- Debounced search — API calls only fire after the user stops typing for 400ms

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- OpenWeatherMap API (Current Weather + Geocoding)

## Concepts covered

- `fetch` with `async/await` — calling real external APIs and handling the full Promise lifecycle
- Three-state async model — every API call has `loading`, `success`, and `error` states, modelled explicitly in TypeScript
- Custom hooks — `useWeather`, `useGeoCoding`, `useDebounce` — logic fully extracted from components
- TypeScript — typing nested API responses with composed interfaces
- Debounce — delaying API calls until the user stops typing, using `useEffect` cleanup (`clearTimeout`)
- `useEffect` cleanup — the return function inside `useEffect` and why it matters
- Derived values vs state — `cityCurrentTime`, `iconSrc` computed directly from props, not stored in state
- Geocoding flow — two-step API pattern: search by name → pick from list → fetch weather by coordinates
- `optional chaining` (`?.`) and `nullish coalescing` (`??`) — handling nullable state safely
- Component separation — display components (`WeatherCard`) know nothing about how data is fetched

## Project structure

```
src/
  components/
    LocationItem.tsx        # single geocoding result row
    LocationPicker.tsx      # dropdown list of geocoding results
    SearchBar.tsx           # debounced search input
    TemperatureToggle.tsx   # °C / °F toggle buttons
    WeatherCard.tsx         # weather data display
  hook/
    useDebounce.ts          # generic debounce hook
    useGeoCoding.ts         # geocoding API hook
    useWeather.ts           # weather API hook (accepts lat/lon)
  types/
    weather.ts              # all TypeScript interfaces and types
  utils/
    formatDate.ts           # localTime() and formatDate() utilities
  App.tsx
  main.tsx
```

## Environment setup

Create a `.env` file in the root (never commit this):

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api).

## Getting started

```bash
npm install
npm run dev
```

## Key decisions

**Two-step geocoding instead of direct city name search** — searching by city name alone is ambiguous (Dublin, IE vs Dublin, OH). The Geocoding API resolves a name to a list of real locations with coordinates. Weather is then fetched by `lat`/`lon`, which is unambiguous. This is the correct architectural pattern for location-based apps.

**`useWeather` accepts `lat | null` and `lon | null`** — before the user selects a location, there are no coordinates. The hook guards against fetching with `null` values at the top of `useEffect`, keeping the hook self-contained and safe to call unconditionally from `App`.

**`useDebounce` as a generic hook** — same generic `<T>` pattern as `useLocalStorage` from Project 1. Works for any type, not just strings. The `clearTimeout` in the `useEffect` cleanup is the key mechanism — without it, every keystroke would fire an API call.

**Sunrise/Sunset in the city's local time** — the OpenWeatherMap API returns a `timezone` field (UTC offset in seconds). Instead of relying on `toLocaleTimeString` with a fixed timezone string (which would require knowing the IANA timezone name), the conversion is done manually: add the offset to the UTC timestamp, then read the result with `getUTCHours`/`getUTCMinutes` to avoid the browser's local timezone being applied on top.

**Known limitation** — the OpenWeatherMap Geocoding API has a hard cap of 5 results regardless of the `limit` parameter. For more results, a Google Places Autocomplete or Mapbox Geocoding integration would be needed.
