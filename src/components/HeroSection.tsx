import { SearchInput } from "./SearchInput";

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (region: string) => void;
}

export const HeroSection = ({ onSearch, onFilter }: HeroSectionProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <img src="/theEarth.png" alt="Earth" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 -mt-60 md:-mt-50">
          <h1 className="text-white text-3xl">
            <span className="font-bold">Geo</span>Pedia
          </h1>
          <SearchInput onChange={onSearch} onFilterChange={onFilter} />
        </div>
      </div>
    </div>
  );
};
