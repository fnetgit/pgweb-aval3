import { InfoCard } from "../InfoCard";

interface CountryStatsProps {
  population: number;
  languages: string;
  currencies: string;
  area?: number;
  labelColor?: string | null;
}

export const CountryStats = ({
  population,
  languages,
  currencies,
  area,
  labelColor,
}: CountryStatsProps) => {
  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  const formatArea = (area?: number) => {
    if (!area) return "Área Indisponível";
    return new Intl.NumberFormat("pt-BR").format(area) + " km²";
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <InfoCard label="Área" value={formatArea(area)} labelColor={labelColor} />
      <InfoCard
        label="População"
        value={formatPopulation(population)}
        labelColor={labelColor}
      />
      <InfoCard label="Idiomas" value={languages} labelColor={labelColor} />
      <InfoCard label="Moedas" value={currencies} labelColor={labelColor} />
    </div>
  );
};
