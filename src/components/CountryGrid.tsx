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
        <div className="text-white text-xl">Carregando países...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-xl">Erro: {error}</div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-300 text-xl">
          Nenhum país encontrado. Tente uma busca diferente.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 -mt-20 sm:-mt-32 md:-mt-40 lg:-mt-50 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};
