import { getRegionLabel } from "../constants/regions";

interface FilterInfoProps {
  totalResults: number;
  activeFilters: {
    region?: string;
    searchTerm?: string;
    showOnlyFavorites?: boolean;
  };
}

export const FilterInfo = ({
  totalResults,
  activeFilters,
}: FilterInfoProps) => {
  const hasActiveFilters =
    activeFilters.region || activeFilters.showOnlyFavorites;

  return (
    <div className="flex items-center gap-3 text-(--color-white) text-sm">
      <div>
        <span className="font-semibold text-(--color-accent-cyan)">
          {totalResults}
        </span>{" "}
        {totalResults === 1 ? "resultado" : "resultados"}
      </div>

      {hasActiveFilters && (
        <>
          <span className="text-(--color-text-muted)">•</span>
          <div className="flex flex-wrap gap-2">
            {activeFilters.region && (
              <div className="flex items-center gap-1.5 bg-(--color-primary-light) px-2.5 py-1 rounded-full">
                <span className="text-(--color-text-secondary)">Região:</span>
                <span className="font-medium">
                  {getRegionLabel(activeFilters.region)}
                </span>
              </div>
            )}

            {activeFilters.showOnlyFavorites && (
              <div className="flex items-center gap-1.5 bg-(--color-primary-light) px-2.5 py-1 rounded-full">
                <span className="text-(--color-accent-yellow)">★</span>
                <span className="font-medium">Favoritos</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
