import { useEffect, useState, useCallback, useMemo } from "react";
import { getAllCountries, type Country } from "../services/api";

interface CountryFilter {
  region: string;
  searchTerm: string;
}

class CountryFilterService {
  static filterByRegion(countries: Country[], region: string): Country[] {
    if (!region) return countries;
    return countries.filter((country) => country.region === region);
  }

  static searchByName(countries: Country[], term: string): Country[] {
    if (!term) return countries;
    const lowerTerm = term.toLowerCase();
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(lowerTerm)
    );
  }

  static applyFilters(countries: Country[], filters: CountryFilter): Country[] {
    let filtered = countries;

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

export function useCountries() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<CountryFilter>({
    region: "",
    searchTerm: "",
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
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(
    () => CountryFilterService.applyFilters(allCountries, filters),
    [allCountries, filters]
  );

  const filterByRegion = useCallback((region: string) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const searchByName = useCallback((searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ region: "", searchTerm: "" });
  }, []);

  return {
    countries: filteredCountries,
    isLoading,
    error,
    filterByRegion,
    searchByName,
    resetFilters,
  };
}
