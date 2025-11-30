interface CountryMapProps {
  countryName: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
}

export const CountryMap = ({
  countryName,
  latitude,
  longitude,
  googleMapsUrl,
}: CountryMapProps) => {
  if (!latitude || !longitude) {
    return null;
  }
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(countryName)}&language=pt&region=BR`;

  return (
    <div className="mb-8">
      <h3 className="text-(--color-accent-cyan) text-lg font-semibold mb-3 text-center">
        Localização
      </h3>
      <div className="rounded-lg overflow-hidden shadow-xl border-2 border-(--color-accent-cyan)/30">
        <iframe
          width="100%"
          height="300"
          src={googleMapsEmbedUrl}
          title={`Mapa de ${countryName}`}
          className="w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {googleMapsUrl && (
        <div className="text-center mt-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-accent-cyan) hover:text-(--color-accent-cyan-dark) text-sm underline transition-colors"
          >
            Ver no Google Maps
          </a>
        </div>
      )}
    </div>
  );
};
