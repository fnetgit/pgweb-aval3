import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export const ScrollButtons = () => {
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      const nearBottom = scrollTop + clientHeight >= scrollHeight - 300;

      setIsNearTop(!nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isNearTop) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={handleClick}
        className="p-2 sm:p-3 bg-(--color-primary-lighter) text-white rounded-full shadow-lg hover:bg-(--color-primary-light) transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={isNearTop ? "Ir para o final" : "Voltar ao topo"}
      >
        {isNearTop ? (
          <ArrowDown size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <ArrowUp size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
};
