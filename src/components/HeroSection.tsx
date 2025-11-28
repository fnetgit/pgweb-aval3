import { SearchInput } from "./SearchInput";

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (region: string) => void;
}

export const HeroSection = ({ onSearch, onFilter }: HeroSectionProps) => {
  return (
    <div className="flex items-center justify-center h-[60vh] sm:h-[70vh] md:h-screen">
      <div className="relative w-full px-4">
        <img src="/theEarth.png" alt="Earth" className="w-full max-w-md mx-auto" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 sm:gap-4 -mt-40 sm:-mt-48 md:-mt-60">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl">
            <span className="font-bold">Geo</span>Pedia
          </h1>
          <SearchInput onChange={onSearch} onFilterChange={onFilter} />
        </div>
      </div>
    </div>
  );
};
