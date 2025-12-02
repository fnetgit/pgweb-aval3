import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAllCountries,
  getCountryNameInPortuguese,
  type Country,
} from "../services/api";

interface CountryFilter {
  region: string;
  searchTerm: string;
  showOnlyFavorites: boolean;
}

class CountryFilterService {
  static filterByRegion(countries: Country[], region: string): Country[] {
    if (!region) return countries;
    return countries.filter((country) => country.region === region);
  }

  static searchByName(countries: Country[], term: string): Country[] {
    if (!term) return countries;
    const lowerTerm = term.toLowerCase();
    return countries.filter((country) => {
      const englishName = country.name.common.toLowerCase();
      const portugueseName = getCountryNameInPortuguese(country).toLowerCase();
      return (
        englishName.includes(lowerTerm) || portugueseName.includes(lowerTerm)
      );
    });
  }

  static applyFilters(
    countries: Country[],
    filters: CountryFilter,
    favoritesCodes: string[]
  ): Country[] {
    let filtered = countries;

    if (filters.showOnlyFavorites) {
      filtered = filtered.filter((country) =>
        favoritesCodes.includes(country.cca3)
      );
    }

    if (filters.region) {
      filtered = this.filterByRegion(filtered, filters.region);
    }

    if (filters.searchTerm) {
      filtered = this.searchByName(filtered, filters.searchTerm);
    }

    return filtered;
  }

  static sortByName(countries: Country[]): Country[] {
    return [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }
}

export function useCountries(favoritesCodes: string[] = []) {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<CountryFilter>(() => {
    const savedRegion = localStorage.getItem("selectedRegion") || "";
    const savedSearch = localStorage.getItem("searchTerm") || "";
    return {
      region: savedRegion,
      searchTerm: savedSearch,
      showOnlyFavorites: false,
    };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        const sortedData = CountryFilterService.sortByName(data);
        setAllCountries(sortedData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar países"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(
    () =>
      CountryFilterService.applyFilters(allCountries, filters, favoritesCodes),
    [allCountries, filters, favoritesCodes]
  );

  const filterByRegion = useCallback((region: string) => {
    localStorage.setItem("selectedRegion", region);
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const searchByName = useCallback((searchTerm: string) => {
    localStorage.setItem("searchTerm", searchTerm);
    setFilters((prev) => ({ ...prev, searchTerm }));
  }, []);

  const resetFilters = useCallback(() => {
    localStorage.removeItem("selectedRegion");
    localStorage.removeItem("searchTerm");
    setFilters({ region: "", searchTerm: "", showOnlyFavorites: false });
  }, []);

  const filterByFavorites = useCallback((showOnlyFavorites: boolean) => {
    setFilters((prev) => ({ ...prev, showOnlyFavorites }));
  }, []);

  return {
    countries: filteredCountries,
    isLoading,
    error,
    filterByRegion,
    searchByName,
    resetFilters,
    filterByFavorites,
    activeFilters: filters,
  };
}
