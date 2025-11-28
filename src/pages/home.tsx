import { useCountries } from "../hooks/useCountries";
import { CountryGrid } from "../components/CountryGrid";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";

export const Home = () => {
  const { countries, isLoading, error, filterByRegion, searchByName } =
    useCountries();

  return (
    <div className="min-h-screen bg-[#213559]">
      <HeroSection onSearch={searchByName} onFilter={filterByRegion} />
      <CountryGrid countries={countries} isLoading={isLoading} error={error} />
      <Footer />
    </div>
  );
};
