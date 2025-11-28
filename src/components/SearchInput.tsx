import { FilterIcon } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  onChange?: (value: string) => void;
  onFilterChange?: (region: string) => void;
  placeholder?: string;
  className?: string;
}

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export const SearchInput = ({
  onChange,
  onFilterChange,
  placeholder = "Search for a country...",
  className = "",
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange?.(searchValue);
    }
  };

  const handleRegionClick = (region: string) => {
    const newRegion = selectedRegion === region ? "" : region;
    setSelectedRegion(newRegion);
    onFilterChange?.(newRegion);
    setIsFilterOpen(false);
  };

  return (
    <div className={`relative w-full sm:w-4/5 md:w-2/3 max-w-md px-4 sm:px-0 ${className}`}>
      <div className="p-2 sm:p-3 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="grow bg-transparent outline-none text-white placeholder:text-gray-300"
        />
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="cursor-pointer hover:scale-110 transition-transform"
          type="button"
        >
          <FilterIcon className="text-gray-300" />
        </button>
      </div>

      {isFilterOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-md overflow-hidden z-10">
          <div className="p-2">
            <p className="text-white text-sm font-semibold mb-2">
              Filter by Region
            </p>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionClick(region)}
                type="button"
                className={`w-full text-left px-3 py-2 rounded text-white hover:bg-white/20 transition-colors ${
                  selectedRegion === region ? "bg-white/30" : ""
                }`}
              >
                {region}
              </button>
            ))}
            {selectedRegion && (
              <button
                onClick={() => handleRegionClick("")}
                type="button"
                className="w-full text-left px-3 py-2 rounded text-gray-300 hover:bg-white/20 transition-colors mt-1"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
