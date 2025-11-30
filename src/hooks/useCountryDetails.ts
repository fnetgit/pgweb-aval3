import { useEffect, useState } from "react";
import { getCountryDetails, type Country } from "../services/api";
import { extractReadableFlagColor } from "../utils/colorSampler";

interface UseCountryDetailsReturn {
  country: Country | null;
  isLoading: boolean;
  error: string | null;
  labelColor: string | null;
  languages: string;
  currencies: string;
  borders: string;
}

export const useCountryDetails = (code: string | undefined): UseCountryDetailsReturn => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [labelColor, setLabelColor] = useState<string | null>(null);

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

  const getBorders = (): string => {
    if (!country?.borders || country.borders.length === 0) return "Fronteiras Indisponíveis";
    return country.borders.join(", ");
  };

  return {
    country,
    isLoading,
    error,
    labelColor,
    languages: getLanguages(),
    currencies: getCurrencies(),
    borders: getBorders(),
  };
};
