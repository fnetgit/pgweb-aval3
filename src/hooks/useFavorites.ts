import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "country-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((countryCode: string) => {
    setFavorites((prev) => {
      if (prev.includes(countryCode)) {
        return prev.filter((code) => code !== countryCode);
      }
      return [...prev, countryCode];
    });
  }, []);

  const isFavorite = useCallback(
    (countryCode: string) => {
      return favorites.includes(countryCode);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
