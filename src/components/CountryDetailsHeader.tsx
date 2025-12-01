import { ArrowLeft } from "lucide-react";

interface CountryDetailsHeaderProps {
  onBack: () => void;
}

export const CountryDetailsHeader = ({ onBack }: CountryDetailsHeaderProps) => {
  return (
    <div className="bg-(--color-primary-light) p-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-(--color-white) hover:text-(--color-text-secondary) transition-colors"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </div>
      </button>
    </div>
  );
};
