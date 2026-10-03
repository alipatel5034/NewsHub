import React, { useState } from "react";
import { NewsArticle } from "../types/news.js";
import { Bookmark, Newspaper, Clock, ArrowUpRight } from "lucide-react";
import { formatRelativeTime } from "../utils/date.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

interface NewsCardProps {
  article: NewsArticle;
  onSelect?: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onSelect }) => {
  const { isSaved, toggle } = useBookmarks();
  const [imageError, setImageError] = useState(false);

  const bookmarked = isSaved(article.id);

  return (
    <article 
      onClick={() => onSelect && onSelect(article)}
      className="group relative flex flex-col bg-white dark:bg-paper-cardDark border border-gray-200 dark:border-ink-gold/20 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
    >
      {/* Article Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-paper-dark border-b border-gray-100 dark:border-ink-gold/15">
        {article.imageUrl && !imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-paper-dark text-gray-400">
            <Newspaper className="w-8 h-8 mb-2 opacity-40 text-black dark:text-ink-gold" />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              {article.sourceName || "NewsHub Wire"}
            </span>
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/20">
          {article.sourceName}
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(article);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-transform active:scale-95 cursor-pointer ${
            bookmarked
              ? "bg-amber-400 text-black border-amber-400 shadow-sm"
              : "bg-black/40 text-white border-white/20 hover:bg-black/70"
          }`}
          title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Article Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 dark:text-ink-gold mb-2">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold leading-snug text-black dark:text-ink-bright group-hover:text-red-700 dark:group-hover:text-ink-gold transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-ink-bright/70 line-clamp-3 mb-4 leading-relaxed">
            {article.description || "Click to view full press article details."}
          </p>
        </div>

        {/* Card Bottom Footer with Small Circle & North-East Arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-ink-gold/15 mt-auto">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-gray-400 group-hover:text-black dark:group-hover:text-ink-gold transition-colors">
            Read Article
          </span>

          {/* Small Circle Button with North-East Arrow */}
          <div className="w-8 h-8 rounded-full bg-black text-white dark:bg-ink-gold dark:text-paper-dark flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-red-600 transition-all">
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
};
