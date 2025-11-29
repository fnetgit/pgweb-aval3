import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryDetails, type Country } from "../services/api";
import { Footer } from "../components/Footer";
import { CountryDetailsHeader } from "../components/CountryDetailsHeader";
import { CountryFlag } from "../components/CountryFlag";
import { extractReadableFlagColor } from "../utils/colorSampler";
import { CountryInfo } from "../components/CountryInfo";
import { CountryStats } from "../components/CountryStats";
import { CountryAdditionalInfo } from "../components/CountryAdditionalInfo";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { ScrollButtons } from "../components/ScrollButtons";

export const CountryDetails = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
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

  const getLanguages = () => {
    if (!country?.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const getCurrencies = () => {
    if (!country?.currencies) return "N/A";
    return Object.entries(country.currencies)
      .map(([code, curr]) => `${curr.name} (${curr.symbol || code})`)
      .join(", ");
  };

  const getBorders = () => {
    if (!country?.borders || country.borders.length === 0) return "N/A";
    return country.borders.join(", ");
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !country) {
    return (
      <ErrorState
        message={error || "País não encontrado"}
        onBack={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-primary-dark)] text-white text-shadow-lg/20">
      <ScrollButtons />
      <CountryDetailsHeader onBack={() => navigate("/")} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        <CountryFlag
          flagUrl={country.flags.svg}
          alt={country.flags.alt || ""}
          countryName={country.name.common}
        />

        <CountryInfo country={country} labelColor={labelColor} />

        <CountryStats
          population={country.population}
          languages={getLanguages()}
          currencies={getCurrencies()}
          labelColor={labelColor}
        />

        <CountryAdditionalInfo
          internetDomain={country.tld?.[0]}
          borders={getBorders()}
          labelColor={labelColor}
        />

        <Footer />
      </div>
    </div>
  );
};
