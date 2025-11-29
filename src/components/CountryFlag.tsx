interface CountryFlagProps {
  flagUrl: string;
  alt: string;
  countryName: string;
}

export const CountryFlag = ({
  flagUrl,
  alt,
  countryName,
}: CountryFlagProps) => {
  return (
    <div className="mb-8">
      <div className="w-full max-w-md mx-auto aspect-3/2 rounded-lg overflow-hidden shadow-2xl border-4 border-green-600">
        <img
          src={flagUrl}
          alt={alt || `Flag of ${countryName}`}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
