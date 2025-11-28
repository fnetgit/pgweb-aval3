import { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import { CountryGrid } from "../components/CountryGrid";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 20;

export const Home = () => {
  const { countries, isLoading, error, filterByRegion, searchByName } =
    useCountries();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (term: string) => {
    searchByName(term);
    setCurrentPage(1);
  };

  const handleFilter = (region: string) => {
    filterByRegion(region);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#213559]">
      <HeroSection onSearch={handleSearch} onFilter={handleFilter} />
      <CountryGrid
        countries={currentCountries}
        isLoading={isLoading}
        error={error}
      />
      {!isLoading && !error && countries.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <Footer />
    </div>
  );
};
