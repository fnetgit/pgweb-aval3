import { useParams, useNavigate } from "react-router-dom";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { getCountryNameInPortuguese } from "../services/api";
import { Footer } from "../components/Footer";
import { CountryDetailsHeader } from "../components/CountryDetailsHeader";
import { CountryFlag } from "../components/CountryFlag";
import { CountryInfo } from "../components/CountryInfo";
import { CountryStats } from "../components/CountryStats";
import { CountryAdditionalInfo } from "../components/CountryAdditionalInfo";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { ScrollButtons } from "../components/ScrollButtons";
import { CountryMap } from "../components/CountryMap";

export const CountryDetails = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const {
    country,
    isLoading,
    error,
    labelColor,
    languages,
    currencies,
    borders,
  } = useCountryDetails(code);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !country) {
    return (
      <ErrorState
        message={error || "País não encontrado"}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-(--color-primary-dark) text-white text-shadow-lg/20">
      <ScrollButtons />
      <CountryDetailsHeader onBack={() => navigate(-1)} />

      <div className="px-4 py-8 max-w-2xl mx-auto">
        <CountryFlag
          flagUrl={country.flags.svg}
          alt={
            country.flags.alt ||
            `Bandeira de ${getCountryNameInPortuguese(country)}`
          }
        />

        <CountryInfo country={country} labelColor={labelColor} />

        <CountryStats
          population={country.population}
          languages={languages}
          currencies={currencies}
          area={country.area}
          labelColor={labelColor}
        />

        <CountryAdditionalInfo
          internetDomain={country.tld?.[0]}
          borders={borders}
          labelColor={labelColor}
        />

        <CountryMap
          countryName={country.name.common}
          latitude={country.latlng?.[0]}
          longitude={country.latlng?.[1]}
          googleMapsUrl={country.maps?.googleMaps}
        />

        <Footer />
      </div>
    </div>
  );
};
