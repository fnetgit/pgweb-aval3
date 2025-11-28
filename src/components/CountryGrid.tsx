import { type Country } from "../services/api";
import { CountryCard } from "./CountryCard";

interface CountryGridProps {
  countries: Country[];
  isLoading?: boolean;
  error?: string | null;
}

export const CountryGrid = ({
  countries,
  isLoading = false,
  error = null,
}: CountryGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-300 text-xl">
          No countries found. Try a different search.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 -mt-90 md:-mt-90 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {countries.slice(0, 20).map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};
