import { FilterIcon, Star } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  onChange?: (value: string) => void;
  onFilterChange?: (region: string) => void;
  onFavoritesFilterChange?: (showOnlyFavorites: boolean) => void;
  placeholder?: string;
  className?: string;
}

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export const SearchInput = ({
  onChange,
  onFilterChange,
  onFavoritesFilterChange,
  placeholder = "Pesquisar por um país...",
  className = "",
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

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

  const handleFavoritesToggle = () => {
    const newValue = !showOnlyFavorites;
    setShowOnlyFavorites(newValue);
    onFavoritesFilterChange?.(newValue);
  };

  return (
    <div
      className={`relative w-full sm:w-4/5 md:w-2/3 max-w-md px-4 sm:px-0 ${className}`}
    >
      <div className="p-2 sm:p-3 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="grow bg-transparent outline-none text-white placeholder:text-gray-300"
        />
        <button
          onClick={handleFavoritesToggle}
          className={`cursor-pointer hover:scale-110 transition-all ${
            showOnlyFavorites ? "text-yellow-400" : "text-gray-300"
          }`}
          type="button"
          title={
            showOnlyFavorites ? "Mostrar todos" : "Mostrar apenas favoritos"
          }
        >
          <Star
            size={20}
            className={showOnlyFavorites ? "fill-yellow-400" : ""}
          />
        </button>
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
              Filtrar por Região
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
                Limpar Filtro
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
