import { FilterIcon, Star, X } from "lucide-react";
import { useState } from "react";
import { REGIONS } from "../../constants/regions";

interface SearchInputProps {
  onChange?: (value: string) => void;
  onFilterChange?: (region: string) => void;
  onFavoritesFilterChange?: (showOnlyFavorites: boolean) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  onChange,
  onFilterChange,
  onFavoritesFilterChange,
  placeholder = "Pesquisar por um país...",
  className = "",
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(
    () => localStorage.getItem("searchTerm") || ""
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(
    () => localStorage.getItem("selectedRegion") || ""
  );
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

  const handleClear = () => {
    setSearchValue("");
    localStorage.removeItem("searchTerm");
    onChange?.("");
  };

  return (
    <div
      className={`relative w-full sm:w-4/5 md:w-2/3 max-w-md z-50 ${className}`}
    >
      <div className="px-4 sm:px-0">
        <div className="p-2 sm:p-3 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="grow bg-transparent outline-none text-(--color-white) placeholder:text-(--color-text-secondary)"
          />
          {searchValue && (
            <button
              onClick={handleClear}
              className="cursor-pointer hover:scale-110 transition-transform text-(--color-text-secondary) hover:text-(--color-error)"
              type="button"
              title="Limpar busca"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={handleFavoritesToggle}
            className={`cursor-pointer hover:scale-110 transition-all ${
              showOnlyFavorites
                ? "text-(--color-accent-yellow)"
                : "text-(--color-text-secondary)"
            }`}
            type="button"
            title={
              showOnlyFavorites ? "Mostrar todos" : "Mostrar apenas favoritos"
            }
          >
            <Star
              size={20}
              className={
                showOnlyFavorites ? "fill-(--color-accent-yellow)" : ""
              }
            />
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="cursor-pointer hover:scale-110 transition-transform"
            type="button"
            title={
              isFilterOpen
                ? "Fechar opções de filtro"
                : "Mostrar opções de filtro"
            }
          >
            <FilterIcon className="text-(--color-text-secondary)" />
          </button>
        </div>

        {isFilterOpen && (
          <div className="absolute top-full mt-2 left-4 right-4 sm:left-0 sm:right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-md overflow-hidden z-50">
            <div className="p-2">
              <p className="text-(--color-white) text-sm font-semibold mb-2">
                Filtrar por Região
              </p>
              {REGIONS.map((region) => (
                <button
                  key={region.value}
                  onClick={() => handleRegionClick(region.value)}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded text-(--color-white) hover:bg-white/20 transition-colors ${
                    selectedRegion === region.value ? "bg-white/30" : ""
                  }`}
                >
                  {region.label}
                </button>
              ))}
              {selectedRegion && (
                <button
                  onClick={() => handleRegionClick("")}
                  type="button"
                  className="w-full text-left px-3 py-2 rounded text-red-400 hover:bg-red-500/20 transition-colors mt-1"
                >
                  Limpar Filtro
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
