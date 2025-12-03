import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/sobre", label: "Sobre" },
  ];

  return (
    <nav className="fixed top-6 right-6 z-60">
      <ul className="flex gap-6 sm:gap-8">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <button
              onClick={() => navigate(path)}
              className={`text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                isActive(path)
                  ? "text-(--color-white)"
                  : "text-(--color-text-secondary) hover:text-(--color-text-muted)"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
