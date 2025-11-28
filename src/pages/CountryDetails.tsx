import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCountryDetails, type Country } from "../services/api";
import { Footer } from "../components/Footer";

export const CountryDetails = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) {
        setError("Código do país não fornecido");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getCountryDetails(code);
        setCountry(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao carregar país");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  const getLanguages = () => {
    if (!country?.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const getCurrencies = () => {
    if (!country?.currencies) return "N/A";
    return Object.entries(country.currencies)
      .map(([code, curr]) => `${curr.name} (${curr.symbol || code})`)
      .join(", ");
  };

  const getBorders = () => {
    if (!country?.borders || country.borders.length === 0) return "N/A";
    return country.borders.join(", ");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a2c42] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-[#1a2c42] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            {error || "País não encontrado"}
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#2a4470] text-white rounded-lg hover:bg-[#213559]"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a2c42] text-white">
      <div className="bg-[#213559] p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
        </button>
      </div>

      <div className="px-4 py-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-full max-w-md mx-auto aspect-[3/2] rounded-lg overflow-hidden shadow-2xl border-4 border-green-600">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold mb-1">{country.name.common}</h1>
          <p className="text-gray-400 text-lg mb-1">{country.name.common}</p>
          <p className="text-gray-400 text-base">{country.region}</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-cyan-400 text-sm mb-1">Capital</p>
          <p className="text-white text-xl font-semibold">
            {country.capital?.[0] || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <p className="text-cyan-400 text-xs mb-2">Área</p>
            <p className="text-white text-lg font-semibold">
              {country.latlng ? "N/A" : "N/A"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-cyan-400 text-xs mb-2">População</p>
            <p className="text-white text-lg font-semibold">
              {formatPopulation(country.population)}
            </p>
          </div>

          <div className="text-center">
            <p className="text-cyan-400 text-xs mb-2">Idiomas</p>
            <p className="text-white text-lg font-semibold">{getLanguages()}</p>
          </div>

          <div className="text-center">
            <p className="text-cyan-400 text-xs mb-2">Moedas</p>
            <p className="text-white text-lg font-semibold">
              {getCurrencies()}
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-cyan-400 text-sm mb-2">Domínios de internet</p>
          <p className="text-white text-xl font-semibold">
            {country.tld?.[0] || "N/A"}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-white text-sm font-semibold mb-2">Fronteiras</p>
          <p className="text-white text-base leading-relaxed">{getBorders()}</p>
        </div>

        <Footer />
      </div>
    </div>
  );
};
