import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bookmark, Info, Search } from "lucide-react";

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/search", label: "Search", icon: Search },
    { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-paper-cardDark/95 backdrop-blur-md border-t border-ink/15 dark:border-ink-gold/20 md:hidden px-4 py-2">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? "text-ink dark:text-ink-gold font-bold"
                  : "text-ink-muted dark:text-ink-soft hover:text-ink dark:hover:text-ink-gold"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
