import { useParams, useNavigate } from "react-router-dom";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { getCountryNameInPortuguese } from "../services/api";
import { Footer } from "../components/Layout/Footer";
import { CountryFlag } from "../components/CountryDetails/CountryFlag";
import { CountryInfo } from "../components/CountryDetails/CountryInfo";
import { CountryStats } from "../components/CountryDetails/CountryStats";
import { CountryAdditionalInfo } from "../components/CountryDetails/CountryAdditionalInfo";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { ScrollButtons } from "../components/Layout/ScrollButtons";
import { CountryMap } from "../components/CountryDetails/CountryMap";
import { UnifiedHeader } from "../components/Layout/UnifiedHeader";

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
    borderCountries,
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
          borderCountries={borderCountries}
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
