interface CountryFlagProps {
  flagUrl: string;
  alt: string;
}

export const CountryFlag = ({
  flagUrl,
  alt,
}: CountryFlagProps) => {
  return (
    <div className="mb-8">
      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-green-600">
        <img
          src={flagUrl}
          alt={alt}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
