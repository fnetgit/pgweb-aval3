export const ProjectDescription = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-(--color-accent-cyan)">
          Sobre o Projeto GeoPedia
        </h2>
        <p className="text-(--color-text-secondary) leading-relaxed mb-4">
          O GeoPedia é uma aplicação web desenvolvida como projeto acadêmico
          para a disciplina de Programação Web. O objetivo é fornecer uma
          plataforma interativa e intuitiva para explorar informações sobre
          países ao redor do mundo.
        </p>
        <p className="text-(--color-text-secondary) leading-relaxed">
          Utilizando a API REST Countries, implementamos funcionalidades de
          busca, filtros por região, paginação e visualização detalhada de
          dados geográficos, demográficos e culturais de cada país.
        </p>
      </div>
    </div>
  );
};
