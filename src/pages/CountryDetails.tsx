import { useParams, useNavigate } from "react-router-dom";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { getCountryNameInPortuguese } from "../services/api";
import { Footer } from "../components/Footer";
import { CountryFlag } from "../components/CountryFlag";
import { CountryInfo } from "../components/CountryInfo";
import { CountryStats } from "../components/CountryStats";
import { CountryAdditionalInfo } from "../components/CountryAdditionalInfo";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { ScrollButtons } from "../components/ScrollButtons";
import { CountryMap } from "../components/CountryMap";
import { UnifiedHeader } from "../components/UnifiedHeader";

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
    borderCodes,
  } = useCountryDetails(code);

  const handleBorderClick = (borderCode: string) => {
    navigate(`/country/${borderCode}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <UnifiedHeader showBackButton />
      <ScrollButtons />

      <div className="px-4 py-8 pt-24 sm:pt-28 max-w-2xl mx-auto">
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
          borderCodes={borderCodes}
          labelColor={labelColor}
          onBorderClick={handleBorderClick}
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
