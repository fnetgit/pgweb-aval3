import { InfoCard } from "./InfoCard";

interface CountryStatsProps {
  population: number;
  languages: string;
  currencies: string;
  labelColor?: string | null;
}

export const CountryStats = ({
  population,
  languages,
  currencies,
  labelColor,
}: CountryStatsProps) => {
  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <InfoCard label="Área" value="N/A" labelColor={labelColor} />
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
