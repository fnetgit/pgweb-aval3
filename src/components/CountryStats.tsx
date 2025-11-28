import { InfoCard } from "./InfoCard";

interface CountryStatsProps {
  population: number;
  languages: string;
  currencies: string;
}

export const CountryStats = ({ population, languages, currencies }: CountryStatsProps) => {
  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <InfoCard label="Área" value="N/A" />
      <InfoCard label="População" value={formatPopulation(population)} />
      <InfoCard label="Idiomas" value={languages} />
      <InfoCard label="Moedas" value={currencies} />
    </div>
  );
};
