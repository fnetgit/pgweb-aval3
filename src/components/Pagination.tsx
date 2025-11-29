interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 py-6 sm:py-8 text-white px-4">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-sm sm:text-base ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "hover:bg-[var(--color-primary-lighter))] active:bg-[var(--color-primary))]"
        }`}
        aria-label="Primeira página"
      >
        &lt;&lt;
      </button>

      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-sm sm:text-base ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "hover:bg-[var(--color-primary-lighter))] active:bg-[var(--color-primary))]"
        }`}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      <span className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-sm sm:text-base ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "hover:bg-[var(--color-primary-lighter))] active:bg-[var(--color-primary))]"
        }`}
        aria-label="Próxima página"
      >
        &gt;
      </button>

      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-sm sm:text-base ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "hover:bg-[var(--color-primary-lighter))] active:bg-[var(--color-primary))]"
        }`}
        aria-label="Última página"
      >
        &gt;&gt;
      </button>
    </div>
  );
};
