import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bookmark, Newspaper, Sun, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

export const CATEGORY_LINKS = [
  { id: "general", label: "Home", path: "/" },
  { id: "nation", label: "Politics", path: "/category/nation" },
  { id: "business", label: "Business", path: "/category/business" },
  { id: "technology", label: "Tech", path: "/category/technology" },
  { id: "science", label: "Science", path: "/category/science" },
  { id: "health", label: "Health", path: "/category/health" },
  { id: "sports", label: "Sports", path: "/category/sports" },
  { id: "entertainment", label: "Entertainment", path: "/category/entertainment" },
  { id: "world", label: "World", path: "/category/world" },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-[#f8f8f6] dark:bg-paper-dark border-b border-gray-300 dark:border-ink-gold/30 text-ink dark:text-ink-bright transition-colors">
      {/* 3-Column Newspaper Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 dark:border-ink-gold/20">
        
        {/* Left Column: Useful Live Press Briefing & Edition Status Widget (Replacing Subscribe box) */}
        <div className="md:col-span-3 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-ink-bright mb-1 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Global Live Edition</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-ink-soft font-sans">
            <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-ink-gold px-2 py-0.5 rounded font-medium border border-amber-200 dark:border-amber-800/40">
              <Sun className="w-3 h-3 text-amber-600" />
              <span>24°C Clear</span>
            </span>
            <span className="font-mono text-gray-700 dark:text-ink-bright font-bold">
              {currentTime || "Live"}
            </span>
          </div>
        </div>

        {/* Center Column: NewsHub Masthead & Date */}
        <div className="md:col-span-6 text-center my-2 md:my-0">
          <Link to="/" className="inline-block group">
            <div className="flex items-center justify-center gap-2">
              <Newspaper className="w-7 h-7 sm:w-9 sm:h-9 text-black dark:text-ink-gold group-hover:scale-105 transition-transform" />
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black dark:text-ink-bright uppercase engraved-title">
                NEWS<span className="text-red-600 dark:text-red-500">HUB</span>
              </h1>
            </div>
          </Link>
          <p className="font-serif text-xs text-gray-600 dark:text-ink-gold mt-1 tracking-wide">
            {currentDate}
          </p>
        </div>

        {/* Right Column: Search, Trending Hashtags & Utility controls */}
        <div className="md:col-span-3 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2 w-full max-w-xs">
            <form onSubmit={handleSearch} className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-paper-cardDark border border-gray-300 dark:border-ink-gold/30 text-xs px-2.5 py-1 rounded placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-ink-gold"
              />
              <button type="submit" className="absolute right-2 top-1.5 text-gray-500 hover:text-black">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <Link
              to="/bookmarks"
              className="relative p-1.5 text-gray-700 dark:text-ink-gold hover:text-black transition-colors"
              title="Saved Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            <ThemeToggle />
          </div>

          {/* Trending Hashtags */}
          <div className="text-[10px] text-gray-500 dark:text-ink-soft flex items-center gap-1.5 flex-wrap justify-end font-sans">
            <span className="font-bold text-gray-700 dark:text-ink-bright">Trending:</span>
            {["#Tech", "#Business", "#Science", "#Health", "#World"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag.replace('#', ''))}`)}
                className="hover:underline hover:text-black dark:hover:text-ink-gold cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Newspaper Category Bar */}
      <nav className="w-full border-b border-gray-300 dark:border-ink-gold/30 bg-[#f8f8f6] dark:bg-paper-dark py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-xs font-serif font-bold whitespace-nowrap min-w-max">
          {CATEGORY_LINKS.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.id}
                to={link.path}
                className={`nav-print-link transition-colors py-1 ${
                  isActive
                    ? "text-black dark:text-ink-gold font-black border-b-2 border-black dark:border-ink-gold"
                    : "text-gray-800 dark:text-ink-bright/80 hover:text-black dark:hover:text-ink-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
