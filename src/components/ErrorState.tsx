interface ErrorStateProps {
  message: string;
  onBack: () => void;
}

export const ErrorState = ({ message, onBack }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-[#1a2c42] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-red-400 text-xl mb-4">{message}</div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-[#2a4470] text-white rounded-lg hover:bg-[#213559]"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};
