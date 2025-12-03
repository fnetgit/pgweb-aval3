export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="text-(--color-white) p-4 sm:p-6 mt-8 sm:mt-12">
        <div className="container mx-auto flex items-center justify-center">
          <p className="text-xs sm:text-sm md:text-base text-center">
            &copy; {currentYear}{" "}
            <a
              href="https://github.com/alanrcastro100"
              className="hover:text-(--color-accent-cyan) transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alan Rodrigues
            </a>
            {", "}
            <a
              href="https://github.com/Fabricio-Fontenele"
              className="hover:text-(--color-accent-cyan) transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fabricio Fontenele
            </a>
            {", "}
            <a
              href="https://github.com/fnetgit"
              className="hover:text-(--color-accent-cyan) transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Francisco Neto
            </a>
            {", "}
            <a
              href="https://github.com/oAnjophb"
              className="hover:text-(--color-accent-cyan) transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ruan Pedro
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
