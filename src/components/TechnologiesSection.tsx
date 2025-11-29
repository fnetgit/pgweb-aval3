const technologies = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "REST Countries API",
  "Lucide Icons",
  "ESLint",
];

export const TechnologiesSection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-(--color-accent-cyan)">
          Tecnologias Utilizadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-white/10 rounded-lg px-4 py-3 text-center font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
