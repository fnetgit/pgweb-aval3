interface CountryAdditionalInfoProps {
  internetDomain?: string;
  borderCodes: string[];
  labelColor?: string | null;
  onBorderClick: (code: string) => void;
}

export const CountryAdditionalInfo = ({
  internetDomain,
  borderCodes,
  labelColor,
  onBorderClick,
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
          {internetDomain || "Domínio Indisponível"}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-white text-sm font-semibold mb-2">Fronteiras</p>
        {borderCodes.length === 0 ? (
          <p className="text-gray-400 text-base">Sem fronteiras terrestres</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {borderCodes.map((code) => (
              <button
                key={code}
                onClick={() => onBorderClick(code)}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
