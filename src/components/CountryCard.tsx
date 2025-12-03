import { type Country, getCountryNameInPortuguese } from "../services/api";
import { Users, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getRegionLabel } from "../constants/regions";

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryCode: string) => void;
}

export const CountryCard = ({
  country,
  isFavorite,
  onToggleFavorite,
}: CountryCardProps) => {
  const navigate = useNavigate();

  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("en-US").format(pop);
  };

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(country.cca3);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:bg-white/20 transition-all duration-300 shadow-lg"
    >
      <div className="relative h-24 sm:h-32 md:h-36 lg:h-40 w-full overflow-hidden bg-gray-900/30 flex items-center justify-center">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          className="w-full h-full object-contain"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 cursor-pointer"
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <Star
            size={20}
            className={`transition-colors ${
              isFavorite
                ? "fill-(--color-accent-yellow) text-(--color-accent-yellow)"
                : "text-white"
            }`}
          />
        </button>
      </div>

      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-(--color-white) font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2 md:mb-3 truncate">
          {getCountryNameInPortuguese(country)}
        </h3>

        <div className="space-y-0.5 sm:space-y-1 md:space-y-2 text-gray-200 text-[10px] sm:text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-(--color-text-secondary)" />
            <span className="text-(--color-text-muted)">População:</span>
            <span className="font-semibold">
              {formatPopulation(country.population)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-(--color-text-secondary)" />
            <span className="text-(--color-text-muted)">Região:</span>
            <span className="font-semibold">
              {getRegionLabel(country.region)}
            </span>
          </div>

          {country.capital && country.capital.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-(--color-text-muted)">Capital:</span>
              <span className="font-semibold">{country.capital[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
