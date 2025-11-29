interface InfoCardProps {
  label: string;
  value: string | number;
  labelColor?: string | null;
}

export const InfoCard = ({ label, value, labelColor }: InfoCardProps) => {
  return (
    <div className="text-center bg-transparent hover:bg-gray-200/10 rounded-lg p-2 transition-colors duration-200 ease-in-out">
      <p
        className={`text-xs mb-2 transition-colors duration-200 ease-in-out ${
          !labelColor ? "text-cyan-400" : ""
        }`}
        style={labelColor ? { color: labelColor } : undefined}
      >
        {label}
      </p>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  );
};
