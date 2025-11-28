export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div>
      <footer className="text-white text-center p-4 sm:p-6 mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm md:text-base">
          &copy; {currentYear}{" "}
          <a href="https://github.com/alanrcastro100" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">Alan Rodrigues</a>
          {", "}
          <a href="https://github.com/Fabricio-Fontenele" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">Fabricio Fontenele</a>
          {", "}
          <a href="https://github.com/fnetgit" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">Francisco Neto</a>
          {", "}
          <a href="https://github.com/oAnjophb" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">Ruan Pedro</a>
        </p>
      </footer>
    </div>
  );
};
