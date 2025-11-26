import { useEffect, useState } from "react";
import { getAllCountries, type Country } from "../services/api";

export function useContries() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [fileteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAllCountries(sortedData);
        setFilteredCountries(sortedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filterByRegion = (region: string) => {
    if (!region) {
      setFilteredCountries(allCountries);
    } else {
      setFilteredCountries(allCountries.filter((c) => c.region === region));
    }

    const searchByName = (term: string) => {
      const lowerTerm = term.toLowerCase();
      setFilteredCountries(
        allCountries.filter((c) =>
          c.name.common.toLowerCase().includes(lowerTerm)
        )
      );
    };
    return {
      countries: fileteredCountries,
      isLoading,
      error,
      filterByRegion,
      searchByName,
    };
  };
}
