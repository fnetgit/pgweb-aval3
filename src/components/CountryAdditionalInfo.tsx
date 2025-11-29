interface CountryAdditionalInfoProps {
  internetDomain?: string;
  borders: string;
  labelColor?: string | null;
}

export const CountryAdditionalInfo = ({
  internetDomain,
  borders,
  labelColor,
}: CountryAdditionalInfoProps) => {
  return (
    <>
      <div className="text-center mb-8 bg-transparent hover:bg-gray-200/10 rounded-lg p-2 transition-colors duration-200 ease-in-out">
        <p
          className={`text-sm mb-2 transition-colors duration-200 ease-in-out ${
            !labelColor ? "text-(--color-accent-cyan)" : ""
          }`}
          style={labelColor ? { color: labelColor } : undefined}
        >
          Domínios de internet
        </p>
        <p className="text-white text-xl font-semibold">
          {internetDomain || "N/A"}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-white text-sm font-semibold mb-2">Fronteiras</p>
        <p className="text-white text-base leading-relaxed">{borders}</p>
      </div>
    </>
  );
};
