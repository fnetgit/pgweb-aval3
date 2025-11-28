interface InfoCardProps {
  label: string;
  value: string | number;
}

export const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <div className="text-center">
      <p className="text-cyan-400 text-xs mb-2">{label}</p>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  );
};
