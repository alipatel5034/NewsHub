import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Newspaper, Bookmark, Info } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.js";
import { SearchBar } from "./SearchBar.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

export const Header: React.FC = () => {
  const location = useLocation();
  const { bookmarks } = useBookmarks();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="w-full bg-paper dark:bg-paper-dark border-b border-ink/20 dark:border-ink-gold/30 transition-colors">
      {/* Top Bar with Date & Utility Controls */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between border-b border-ink/10 dark:border-ink-gold/15 text-xs text-ink-muted dark:text-ink-soft">
        <div className="font-mono uppercase tracking-widest text-[11px] hidden sm:block">
          {currentDate} • Vol. I, No. 1
        </div>
        <div className="font-mono uppercase tracking-widest text-[11px] sm:hidden">
          NewsHub Dispatch
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="flex items-center gap-1 hover:text-ink dark:hover:text-ink-gold transition-colors font-semibold"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">About & API Docs</span>
          </Link>

          <Link
            to="/bookmarks"
            className="relative flex items-center gap-1 hover:text-ink dark:hover:text-ink-gold transition-colors font-semibold"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved Articles</span>
            {bookmarks.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark text-[10px] font-bold rounded-full">
                {bookmarks.length}
              </span>
            )}
          </Link>

          <ThemeToggle />
        </div>
      </div>

      {/* Main Vintage Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <Link to="/" className="inline-block group">
          <div className="flex items-center justify-center gap-3">
            <Newspaper className="w-8 h-8 sm:w-10 sm:h-10 text-ink dark:text-ink-gold group-hover:scale-105 transition-transform" />
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink dark:text-ink-bright engraved-title">
              NEWSHUB
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-ink-soft dark:text-ink-gold mt-1 tracking-wide">
            "The Authentic Daily Engraved News Aggregator"
          </p>
        </Link>
      </div>

      {/* Desktop Search Row */}
      <div className="max-w-xl mx-auto px-4 pb-4">
        <SearchBar />
      </div>
    </header>
  );
};
