import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme.js";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-ink/20 dark:border-ink-gold/30 text-ink dark:text-ink-gold hover:bg-paper dark:hover:bg-paper-cardDark transition-colors flex items-center justify-center"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-ink-gold" />}
    </button>
  );
};
