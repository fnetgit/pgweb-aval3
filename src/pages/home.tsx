import { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import { useFavorites } from "../hooks/useFavorites";
import { CountryGrid } from "../components/CountryGrid";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Pagination } from "../components/Pagination";
import { ScrollButtons } from "../components/ScrollButtons";

const ITEMS_PER_PAGE = 20;

export const Home = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    countries,
    isLoading,
    error,
    filterByRegion,
    searchByName,
    filterByFavorites,
  } = useCountries(favorites);
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

  const handleFavoritesFilter = (showOnlyFavorites: boolean) => {
    filterByFavorites(showOnlyFavorites);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0e1e33]">
      <ScrollButtons />
      <HeroSection
        onSearch={handleSearch}
        onFilter={handleFilter}
        onFavoritesFilter={handleFavoritesFilter}
      />
      <CountryGrid
        countries={currentCountries}
        isLoading={isLoading}
        error={error}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
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
