import React from "react";
import { NewsArticle } from "../types/news.js";

interface TrendingTickerProps {
  articles: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
}

export const TrendingTicker: React.FC<TrendingTickerProps> = ({ articles, onSelectArticle }) => {
  if (!articles || articles.length === 0) return null;

  const tickerItems = articles.slice(0, 6);

  return (
    <div className="w-full bg-white dark:bg-paper-cardDark border-y border-gray-300 dark:border-ink-gold/30 flex items-center overflow-hidden my-3 shadow-xs">
      {/* Red Trending Today Badge */}
      <div className="relative bg-red-600 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 flex items-center shrink-0 z-10 clip-path-badge font-sans">
        <span>Trending Today</span>
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-red-600 transform translate-x-1.5 skew-x-12 hidden sm:block" />
      </div>

      {/* Marquee Ticker */}
      <div className="flex-1 overflow-hidden relative py-2 px-3">
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
          {tickerItems.concat(tickerItems).map((art, idx) => (
            <React.Fragment key={`${art.id}-${idx}`}>
              <button
                onClick={() => onSelectArticle && onSelectArticle(art)}
                className="text-xs text-red-700 dark:text-red-400 font-serif hover:underline cursor-pointer transition-colors text-left"
              >
                {art.title}
              </button>
              <span className="text-gray-400 text-xs font-mono">|</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
