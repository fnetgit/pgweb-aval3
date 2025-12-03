import { useEffect, useState } from "react";
import {
  getCountryDetails,
  getBorderCountries,
  getCountryNameInPortuguese,
  type Country,
  type BorderCountry,
} from "../services/api";
import { extractReadableFlagColor } from "../utils/colorSampler";

interface UseCountryDetailsReturn {
  country: Country | null;
  isLoading: boolean;
  error: string | null;
  labelColor: string | null;
  languages: string;
  currencies: string;
  borderCodes: string[];
  borderCountries: BorderCountry[];
}

export const useCountryDetails = (
  code: string | undefined
): UseCountryDetailsReturn => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [labelColor, setLabelColor] = useState<string | null>(null);
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) {
        setError("Código do país não fornecido");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getCountryDetails(code);
        setCountry(data);

        (async () => {
          try {
            const color = await extractReadableFlagColor(data.flags.svg);
            setLabelColor(color);
          } catch {
            setLabelColor(null);
          }
        })();

        if (data.borders && data.borders.length > 0) {
          try {
            const borderCountriesData = await getBorderCountries(data.borders);
            const bordersWithNames = borderCountriesData.map(
              (borderCountry) => ({
                code: borderCountry.cca3,
                name: getCountryNameInPortuguese(borderCountry),
              })
            );
            setBorderCountries(bordersWithNames);
          } catch {
            setBorderCountries(
              data.borders.map((borderCode) => ({
                code: borderCode,
                name: borderCode,
              }))
            );
          }
        } else {
          setBorderCountries([]);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar país");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  const getLanguages = (): string => {
    if (!country?.languages) return "Linguagens Indisponíveis";
    return Object.values(country.languages).join(", ");
  };

  const getCurrencies = (): string => {
    if (!country?.currencies) return "Moedas Indisponíveis";
    return Object.entries(country.currencies)
      .map(([code, curr]) => `${curr.name} (${curr.symbol || code})`)
      .join(", ");
  };

  const getBorderCodes = (): string[] => {
    if (!country?.borders || country.borders.length === 0) return [];
    return country.borders;
  };

  return {
    country,
    isLoading,
    error,
    labelColor,
    languages: getLanguages(),
    currencies: getCurrencies(),
    borderCodes: getBorderCodes(),
    borderCountries,
  };
};
