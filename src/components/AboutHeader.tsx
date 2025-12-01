import { ArrowLeft } from "lucide-react";

interface AboutHeaderProps {
  onBack: () => void;
}

export const AboutHeader = ({ onBack }: AboutHeaderProps) => {
  return (
    <div className="bg-(--color-primary-light) p-4 sm:p-6">
      <div className="container mx-auto flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-(--color-white) hover:text-(--color-text-secondary) transition-colors"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Sobre a Equipe
        </h1>
      </div>
    </div>
  );
};
