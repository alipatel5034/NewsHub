import React from "react";
import { Category } from "../types/news.js";
import { Link, useLocation } from "react-router-dom";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "general", label: "General" },
  { id: "world", label: "World" },
  { id: "nation", label: "Nation" },
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "entertainment", label: "Entertainment" },
  { id: "sports", label: "Sports" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
];

export const CategoryNav: React.FC = () => {
  const location = useLocation();
  const currentCategory = location.pathname.startsWith("/category/")
    ? location.pathname.split("/category/")[1]
    : location.pathname === "/" ? "general" : "";

  return (
    <nav className="w-full border-y border-ink/20 dark:border-ink-gold/30 bg-paper dark:bg-paper-dark py-2.5 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center gap-6 text-xs uppercase tracking-widest font-semibold whitespace-nowrap min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <Link
              key={cat.id}
              to={cat.id === "general" ? "/" : `/category/${cat.id}`}
              className={`nav-print-link py-1 transition-colors ${
                isActive
                  ? "text-ink dark:text-ink-gold font-bold active"
                  : "text-ink-soft dark:text-ink-bright/70 hover:text-ink dark:hover:text-ink-gold"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
