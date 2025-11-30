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
      <h3 className="text-cyan-400 text-lg font-semibold mb-3 text-center">
        Localização
      </h3>
      <div className="rounded-lg overflow-hidden shadow-xl border-2 border-cyan-500/30">
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
            className="text-cyan-400 hover:text-cyan-300 text-sm underline transition-colors"
          >
            Ver no Google Maps
          </a>
        </div>
      )}
    </div>
  );
};
