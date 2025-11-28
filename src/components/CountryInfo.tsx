interface CountryInfoProps {
  commonName: string;
  region: string;
  capital?: string;
}

export const CountryInfo = ({ commonName, region, capital }: CountryInfoProps) => {
  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold mb-1">{commonName}</h1>
        <p className="text-gray-400 text-lg mb-1">{commonName}</p>
        <p className="text-gray-400 text-base">{region}</p>
      </div>

      <div className="text-center mb-8">
        <p className="text-cyan-400 text-sm mb-1">Capital</p>
        <p className="text-white text-xl font-semibold">
          {capital || "N/A"}
        </p>
      </div>
    </>
  );
};
