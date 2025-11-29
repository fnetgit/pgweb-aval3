interface CountryInfoProps {
  commonName: string;
  region: string;
  capital?: string;
  labelColor?: string | null;
}

export const CountryInfo = ({
  commonName,
  region,
  capital,
  labelColor,
}: CountryInfoProps) => {
  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold mb-1">{commonName}</h1>
        <p className="text-gray-400 text-lg mb-1">{commonName}</p>
        <p className="text-gray-400 text-base">{region}</p>
      </div>

      <div className="text-center mb-8">
        <p
          className={`text-sm mb-1 transition-colors duration-200 ease-in-out ${
            !labelColor ? "text-cyan-400" : ""
          }`}
          style={labelColor ? { color: labelColor } : undefined}
        >
          Capital
        </p>
        <p className="text-white text-xl font-semibold">{capital || "N/A"}</p>
      </div>
    </>
  );
};
