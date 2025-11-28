interface CountryAdditionalInfoProps {
  internetDomain?: string;
  borders: string;
}

export const CountryAdditionalInfo = ({ internetDomain, borders }: CountryAdditionalInfoProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <p className="text-cyan-400 text-sm mb-2">Domínios de internet</p>
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
