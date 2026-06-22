import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  const doSearch = () => {
    if (search.trim().length === 0) {
      return;
    }
    onSearch(search);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      doSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={search}
        type="text"
        placeholder="Search for a city..."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        onClick={doSearch}
        className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition"
      >
        Search
      </button>
    </div>
  );
}
