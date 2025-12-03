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
        <div className="text-(--color-white) text-xl">Carregando países...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-(--color-error) text-xl">Erro: {error}</div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-(--color-text-secondary) text-xl">
          Nenhum país encontrado. Tente uma busca diferente.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 relative z-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {countries.slice(0, 20).map((country) => (
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
