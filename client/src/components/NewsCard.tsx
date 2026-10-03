import React, { useState } from "react";
import { NewsArticle } from "../types/news.js";
import { Bookmark, ExternalLink, Newspaper, Clock, Eye } from "lucide-react";
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
    <article className="group flex flex-col bg-white dark:bg-paper-cardDark border border-ink/15 dark:border-ink-gold/20 rounded-lg overflow-hidden shadow-engraved hover:shadow-engraved-hover dark:hover:shadow-dark-card transition-all duration-300 h-full">
      {/* Article Image Container */}
      <div 
        onClick={() => onSelect && onSelect(article)}
        className="relative w-full h-48 overflow-hidden bg-paper dark:bg-paper-dark border-b border-ink/10 dark:border-ink-gold/15 cursor-pointer"
      >
        {article.imageUrl && !imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-paper dark:bg-paper-dark text-ink-muted dark:text-ink-soft">
            <Newspaper className="w-8 h-8 mb-2 opacity-50 text-ink dark:text-ink-gold" />
            <span className="text-[11px] font-mono uppercase tracking-widest">
              {article.sourceName || "NewsHub Wire"}
            </span>
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-3 left-3 bg-paper/90 dark:bg-paper-dark/90 backdrop-blur-xs text-ink dark:text-ink-gold text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-ink/20 dark:border-ink-gold/30">
          {article.sourceName}
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(article);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs border transition-transform active:scale-95 cursor-pointer ${
            bookmarked
              ? "bg-amber-700 text-white border-amber-700 dark:bg-ink-gold dark:text-paper-dark dark:border-ink-gold"
              : "bg-paper/80 text-ink border-ink/20 dark:bg-paper-dark/80 dark:text-ink-bright dark:border-ink-gold/30 hover:bg-white dark:hover:bg-paper-cardDark"
          }`}
          title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Article Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-muted dark:text-ink-soft mb-2">
          <Clock className="w-3 h-3 text-ink-gold" />
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        <h3
          onClick={() => onSelect && onSelect(article)}
          className="font-serif text-lg font-bold leading-snug text-ink dark:text-ink-bright group-hover:text-amber-800 dark:group-hover:text-ink-gold transition-colors cursor-pointer mb-2 line-clamp-2"
        >
          {article.title}
        </h3>

        <p className="text-xs text-ink-soft dark:text-ink-bright/70 line-clamp-3 mb-4 flex-grow leading-relaxed">
          {article.description || "Click to read full press dispatch details from publisher."}
        </p>

        {/* Footer Links */}
        <div className="flex items-center justify-between pt-3 border-t border-ink/10 dark:border-ink-gold/15 text-xs font-semibold">
          <button
            onClick={() => onSelect && onSelect(article)}
            className="flex items-center gap-1 text-ink dark:text-ink-gold hover:underline cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <a
            href={article.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-ink-muted dark:text-ink-soft hover:text-ink dark:hover:text-ink-gold transition-colors"
            title="Open original article"
          >
            <span>Original Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
