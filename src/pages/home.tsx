import { useCountries } from "../hooks/useCountries";
import { useFavorites } from "../hooks/useFavorites";
import { usePagination } from "../hooks/usePagination";
import { CountryGrid } from "../components/CountryGrid";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Pagination } from "../components/Pagination";
import { ScrollButtons } from "../components/ScrollButtons";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

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
    activeFilters,
  } = useCountries(favorites);

  const { currentPage, totalPages, startIndex, endIndex, goToPage, resetPage } =
    usePagination(countries.length, ITEMS_PER_PAGE);

  const currentCountries = countries.slice(startIndex, endIndex);

  const handleSearch = (term: string) => {
    searchByName(term);
    resetPage();
  };

  const handleFilter = (region: string) => {
    filterByRegion(region);
    resetPage();
  };

  const handleFavoritesFilter = (showOnlyFavorites: boolean) => {
    filterByFavorites(showOnlyFavorites);
    resetPage();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-(--color-primary-dark)">
      <Navbar />
      <ScrollButtons />
      <HeroSection
        onSearch={handleSearch}
        onFilter={handleFilter}
        onFavoritesFilter={handleFavoritesFilter}
        totalResults={countries.length}
        activeFilters={activeFilters}
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
          onPageChange={goToPage}
        />
      )}
      <Footer />
    </div>
  );
};
