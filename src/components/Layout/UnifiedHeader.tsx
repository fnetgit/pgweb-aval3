import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface UnifiedHeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export const UnifiedHeader = ({
  showBackButton = false,
  title,
}: UnifiedHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/sobre", label: "Sobre" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-(--color-primary-light) p-4 sm:p-6 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-(--color-white) hover:text-(--color-text-secondary) transition-colors"
            >
              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <ArrowLeft size={20} />
              </div>
            </button>
          )}
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--color-white)">
              {title}
            </h1>
          )}
        </div>

        <nav>
          <ul className="flex gap-6 sm:gap-8">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <button
                  onClick={() => handleNavigation(path)}
                  className={`text-lg sm:text-xl font-medium transition-colors ${
                    isActive(path)
                      ? "text-(--color-white)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-muted) cursor-pointer"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
