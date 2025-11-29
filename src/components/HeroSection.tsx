import { SearchInput } from "./SearchInput";

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (region: string) => void;
  onFavoritesFilter: (showOnlyFavorites: boolean) => void;
}

export const HeroSection = ({
  onSearch,
  onFilter,
  onFavoritesFilter,
}: HeroSectionProps) => {
  return (
    <div className="flex items-center justify-center h-[60vh] sm:h-[70vh] md:h-screen">
      <div className="relative w-full px-4">
        <img
          src="/theEarth.png"
          alt="Earth"
          className="w-full max-w-md md:max-w-4xl lg:max-w-4x1 mx-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 sm:gap-4 -mt-12 sm:-mt-16 md:-mt-20">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="font-bold">Geo</span>Pedia
          </h1>
          <SearchInput
            onChange={onSearch}
            onFilterChange={onFilter}
            onFavoritesFilterChange={onFavoritesFilter}
          />
        </div>
      </div>
    </div>
  );
};
