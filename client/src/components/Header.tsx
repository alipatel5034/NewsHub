import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Bookmark, Check, Newspaper } from "lucide-react";
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

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

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
        
        {/* Left Column: Subscribe Module */}
        <div className="md:col-span-3 text-left">
          <h3 className="font-serif font-bold text-xs text-black dark:text-ink-bright">
            Subscribe to all the news
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-ink-soft mb-1.5">
            Never miss the latest updates
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center max-w-xs">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-paper-cardDark border border-gray-300 dark:border-ink-gold/30 text-xs px-2.5 py-1 rounded placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-ink-gold"
            />
            <button
              type="submit"
              className="absolute right-1 text-gray-600 dark:text-ink-gold hover:text-black transition-colors cursor-pointer p-0.5"
              title="Subscribe"
            >
              {subscribed ? <Check className="w-3.5 h-3.5 text-green-600" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>

        {/* Center Column: NewsHub Masthead & Date */}
        <div className="md:col-span-6 text-center my-2 md:my-0">
          <Link to="/" className="inline-block group">
            <div className="flex items-center justify-center gap-2">
              <Newspaper className="w-7 h-7 sm:w-9 sm:h-9 text-black dark:text-ink-gold group-hover:scale-105 transition-transform" />
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black dark:text-ink-bright uppercase engraved-title">
                NewsHub
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
