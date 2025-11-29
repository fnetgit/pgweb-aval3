import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  return (
    <div>
      <footer className="text-white p-4 sm:p-6 mt-6 sm:mt-8">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <p className="text-xs sm:text-sm md:text-base text-center">
            &copy; {currentYear}{" "}
            <a href="https://github.com/alanrcastro100" className="hover:text-[var(--color-accent-cyan)] transition-colors" target="_blank" rel="noopener noreferrer">Alan Rodrigues</a>
            {", "}
            <a href="https://github.com/Fabricio-Fontenele" className="hover:text-[var(--color-accent-cyan)] transition-colors" target="_blank" rel="noopener noreferrer">Fabricio Fontenele</a>
            {", "}
            <a href="https://github.com/fnetgit" className="hover:text-[var(--color-accent-cyan)] transition-colors" target="_blank" rel="noopener noreferrer">Francisco Neto</a>
            {", "}
            <a href="https://github.com/oAnjophb" className="hover:text-[var(--color-accent-cyan)] transition-colors" target="_blank" rel="noopener noreferrer">Ruan Pedro</a>
          </p>
          <button
            onClick={() => navigate("/about")}
            className="sm:absolute sm:right-0 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            SOBRE A EQUIPE
          </button>
        </div>
      </footer>
    </div>
  );
};
