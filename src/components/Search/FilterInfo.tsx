import { getRegionLabel } from "../../constants/regions";

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
    <div className="w-full max-w-md px-4 sm:px-0 min-h-8 flex items-center justify-center">
      <div className="flex items-center justify-center gap-2 text-(--color-white) text-sm flex-wrap">
        <div className="whitespace-nowrap">
          <span className="font-semibold text-(--color-accent-cyan)">
            {totalResults}
          </span>{" "}
          {totalResults === 1 ? "resultado" : "resultados"}
        </div>

        {hasActiveFilters && (
          <>
            <span className="text-(--color-text-muted)">•</span>
            {activeFilters.region && (
              <div className="flex items-center gap-1.5 bg-(--color-primary-light) px-2.5 py-1 rounded-full whitespace-nowrap text-xs sm:text-sm">
                <span className="text-(--color-text-secondary)">Região:</span>
                <span className="font-medium">
                  {getRegionLabel(activeFilters.region)}
                </span>
              </div>
            )}

            {activeFilters.showOnlyFavorites && (
              <div className="flex items-center gap-1.5 bg-(--color-primary-light) px-2.5 py-1 rounded-full whitespace-nowrap text-xs sm:text-sm">
                <span className="text-(--color-accent-yellow)">★</span>
                <span className="font-medium">Favoritos</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
