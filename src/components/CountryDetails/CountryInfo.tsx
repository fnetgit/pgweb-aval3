import { type Country, getCountryNameInPortuguese } from "../../services/api";
import { getRegionLabel } from "../../constants/regions";

interface CountryInfoProps {
  country: Country;
  labelColor?: string | null;
}

export const CountryInfo = ({ country, labelColor }: CountryInfoProps) => {
  const nameInPortuguese = getCountryNameInPortuguese(country);
  const originalName =
    country.translations?.por?.official || country.name.official;

  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold mb-1">{nameInPortuguese}</h1>
        <p className="text-(--color-text-muted) text-lg mb-1">{originalName}</p>
        <p className="text-(--color-text-muted) text-base">{getRegionLabel(country.region)}</p>
      </div>

      <div className="text-center mb-8">
        <p
          className={`text-sm mb-1 transition-colors duration-200 ease-in-out ${
            !labelColor ? "text-(--color-accent-cyan)" : ""
          }`}
          style={labelColor ? { color: labelColor } : undefined}
        >
          Capital
        </p>
        <p className="text-(--color-white) text-xl font-semibold">
          {country.capital?.[0] || "Capital Indisponível"}
        </p>
      </div>
    </>
  );
};
