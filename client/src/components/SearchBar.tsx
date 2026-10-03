import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "", onSearch, compact = false }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (onSearch) {
      onSearch(trimmed);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news, topics, or keywords..."
          className={`w-full bg-white dark:bg-paper-cardDark border border-ink/30 dark:border-ink-gold/40 focus:border-ink dark:focus:border-ink-gold text-ink dark:text-ink-bright placeholder-ink-muted dark:placeholder-ink-soft rounded-full pl-10 pr-10 ${
            compact ? "py-1.5 text-xs" : "py-2.5 text-sm"
          } focus:outline-none focus:ring-1 focus:ring-ink dark:focus:ring-ink-gold transition-all shadow-sm`}
        />
        <Search className={`absolute left-3.5 ${compact ? "w-3.5 h-3.5" : "w-4 h-4"} text-ink-muted dark:text-ink-gold`} />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 p-1 text-ink-muted hover:text-ink dark:hover:text-ink-gold transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim()}
          className={`absolute right-1 p-1.5 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer`}
          title="Submit search"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};
