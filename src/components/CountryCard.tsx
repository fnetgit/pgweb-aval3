import { type Country } from "../services/api";
import { Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  const navigate = useNavigate();

  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("en-US").format(pop);
  };

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:bg-white/20 transition-all duration-300 shadow-lg"
    >
      <div className="relative h-32 sm:h-36 md:h-40 w-full overflow-hidden">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 truncate">
          {country.name.common}
        </h3>

        <div className="space-y-1.5 sm:space-y-2 text-gray-200 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-300" />
            <span className="text-gray-400">População:</span>
            <span className="font-semibold">
              {formatPopulation(country.population)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-300" />
            <span className="text-gray-400">Região:</span>
            <span className="font-semibold">{country.region}</span>
          </div>

          {country.capital && country.capital.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-gray-400">Capital:</span>
              <span className="font-semibold">{country.capital[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
