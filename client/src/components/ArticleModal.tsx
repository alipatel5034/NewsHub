import React from "react";
import { NewsArticle } from "../types/news.js";
import { X, ExternalLink, Bookmark, Share2, Calendar, Newspaper, Check } from "lucide-react";
import { formatDate } from "../utils/date.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const { isSaved, toggle } = useBookmarks();
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const bookmarked = isSaved(article.id);

  const handleShare = () => {
    navigator.clipboard.writeText(article.articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-paper-cardDark border-2 border-ink dark:border-ink-gold rounded-lg shadow-2xl p-6 text-ink dark:text-ink-bright">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-paper dark:hover:bg-paper-dark text-ink dark:text-ink-gold transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Source & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted dark:text-ink-gold mb-3">
          <span className="flex items-center gap-1 font-bold uppercase tracking-wider bg-paper dark:bg-paper-dark px-2.5 py-1 rounded border border-ink/20 dark:border-ink-gold/30">
            <Newspaper className="w-3.5 h-3.5 text-amber-700 dark:text-ink-gold" />
            {article.sourceName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-4 text-ink dark:text-ink-bright">
          {article.title}
        </h2>

        {/* Image */}
        {article.imageUrl ? (
          <div className="w-full h-64 sm:h-80 overflow-hidden rounded border border-ink/20 dark:border-ink-gold/30 mb-5 relative bg-paper dark:bg-paper-dark">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-40 bg-paper dark:bg-paper-dark border border-dashed border-ink/30 dark:border-ink-gold/30 rounded flex items-center justify-center text-ink-muted dark:text-ink-soft mb-5">
            <span className="text-xs uppercase tracking-widest font-mono">Original Press Image Unavailable</span>
          </div>
        )}

        {/* Description */}
        <p className="text-base sm:text-lg leading-relaxed text-ink-soft dark:text-ink-bright/90 mb-6 font-sans">
          {article.description || "Full text preview is provided directly by the publisher. Click below to read the comprehensive story on the official publisher website."}
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/15 dark:border-ink-gold/20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggle(article)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                bookmarked
                  ? "bg-amber-700 text-white border-amber-700 dark:bg-ink-gold dark:text-paper-dark dark:border-ink-gold"
                  : "border-ink/30 dark:border-ink-gold/40 text-ink dark:text-ink-bright hover:bg-paper dark:hover:bg-paper-dark"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
              <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded border border-ink/30 dark:border-ink-gold/40 text-ink dark:text-ink-bright hover:bg-paper dark:hover:bg-paper-dark transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>

          <a
            href={article.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark font-bold text-xs uppercase tracking-wider rounded hover:opacity-90 transition-opacity shadow-md"
          >
            <span>Read Full Article on Publisher Site</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
