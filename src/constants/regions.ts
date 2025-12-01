export const REGIONS = [
  { value: "Africa", label: "África" },
  { value: "Americas", label: "Américas" },
  { value: "Asia", label: "Ásia" },
  { value: "Europe", label: "Europa" },
  { value: "Oceania", label: "Oceania" },
] as const;

export const getRegionLabel = (value: string): string => {
  const region = REGIONS.find((r) => r.value === value);
  return region?.label || value;
};
