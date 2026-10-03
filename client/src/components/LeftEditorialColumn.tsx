import React from "react";
import { NewsArticle } from "../types/news.js";
import { ArrowRight } from "lucide-react";

interface LeftEditorialColumnProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const LeftEditorialColumn: React.FC<LeftEditorialColumnProps> = ({ articles, onSelectArticle }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 divide-y divide-gray-200 dark:divide-ink-gold/20">
      {articles.map((art, idx) => (
        <div key={art.id} className={idx > 0 ? "pt-6" : ""}>
          {art.imageUrl && (
            <div 
              onClick={() => onSelectArticle(art)}
              className="relative w-full h-44 sm:h-48 overflow-hidden rounded mb-3 cursor-pointer group bg-gray-100 dark:bg-paper-cardDark"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <span>Live •</span>
                </div>
              )}
            </div>
          )}

          <h3
            onClick={() => onSelectArticle(art)}
            className="font-serif text-lg font-bold leading-snug text-black dark:text-ink-bright hover:text-red-700 dark:hover:text-ink-gold cursor-pointer transition-colors mb-2"
          >
            {art.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-ink-bright/70 line-clamp-3 mb-3 leading-relaxed">
            {art.description || "Click to read full story coverage."}
          </p>

          <button
            onClick={() => onSelectArticle(art)}
            className="inline-flex items-center gap-1 font-sans font-bold text-xs uppercase tracking-wider text-black dark:text-ink-gold hover:text-red-600 transition-colors cursor-pointer"
          >
            <span>{idx === 0 ? "WATCH NOW" : "READ NOW"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
