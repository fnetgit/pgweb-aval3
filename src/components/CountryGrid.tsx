import { type Country } from "../services/api";
import { CountryCard } from "./CountryCard";

interface CountryGridProps {
  countries: Country[];
  isLoading?: boolean;
  error?: string | null;
  isFavorite: (countryCode: string) => boolean;
  onToggleFavorite: (countryCode: string) => void;
}

export const CountryGrid = ({
  countries,
  isLoading = false,
  error = null,
  isFavorite,
  onToggleFavorite,
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
<<<<<<< HEAD
    <div className="container mx-auto px-4 mt-4 sm:mt-0 md:-mt-8 lg:-mt-12 relative z-10">
=======
    <div className="container mx-auto px-4 mt-16 sm:-mt-20 md:-mt-32 lg:-mt-40 relative z-10">
>>>>>>> 558b8976d2c2cb20f6ea68d1302e3b22d8c244c7
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={isFavorite(country.cca3)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
