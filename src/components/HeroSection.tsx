import { SearchInput } from "./SearchInput";
import { FilterInfo } from "./FilterInfo";

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (region: string) => void;
  onFavoritesFilter: (showOnlyFavorites: boolean) => void;
  totalResults: number;
  activeFilters: {
    region?: string;
    searchTerm?: string;
    showOnlyFavorites?: boolean;
  };
}

export const HeroSection = ({
  onSearch,
  onFilter,
  onFavoritesFilter,
  totalResults,
  activeFilters,
}: HeroSectionProps) => {
  return (
    <div className="flex items-center justify-center h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] pb-8">
      <div className="relative w-full px-4">
        <img
          src="/theEarth.png"
          alt="Imagem do planeta Terra visto do espaço"
          className="w-full max-w-md md:max-w-4xl lg:max-w-4x1 mx-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 sm:gap-4 -mt-12 sm:-mt-16 md:-mt-20">
          <h1 className="text-(--color-white) text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="font-bold">Geo</span>Pedia
          </h1>
          <div className="w-full max-w-2xl px-4 flex flex-col items-center">
            <SearchInput
              onChange={onSearch}
              onFilterChange={onFilter}
              onFavoritesFilterChange={onFavoritesFilter}
            />
            <div className="mt-3 w-full flex justify-center">
              <FilterInfo
                totalResults={totalResults}
                activeFilters={activeFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
