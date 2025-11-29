import { type Country, getCountryNameInPortuguese } from "../services/api";

interface CountryInfoProps {
  country: Country;
  labelColor?: string | null;
}

export const CountryInfo = ({ country, labelColor }: CountryInfoProps) => {
  const nameInPortuguese = getCountryNameInPortuguese(country);
  const originalName = country.name.common;

  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold mb-1">{nameInPortuguese}</h1>
        <p className="text-gray-400 text-lg mb-1">{originalName}</p>
        <p className="text-gray-400 text-base">{country.region}</p>
      </div>

      <div className="text-center mb-8">
        <p
          className={`text-sm mb-1 transition-colors duration-200 ease-in-out ${
            !labelColor ? "text-[var(--color-accent-cyan)]" : ""
          }`}
          style={labelColor ? { color: labelColor } : undefined}
        >
          Capital
        </p>
        <p className="text-white text-xl font-semibold">
          {country.capital?.[0] || "N/A"}
        </p>
      </div>
    </>
  );
};
