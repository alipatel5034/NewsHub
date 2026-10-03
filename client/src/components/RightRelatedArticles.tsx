import React from "react";
import { NewsArticle } from "../types/news.js";

interface RightRelatedArticlesProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onSeeMore?: () => void;
}

export const RightRelatedArticles: React.FC<RightRelatedArticlesProps> = ({
  articles,
  onSelectArticle,
  onSeeMore,
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-serif text-xl font-bold text-black dark:text-ink-bright pb-2 border-b border-gray-300 dark:border-ink-gold/30">
        Related Articles
      </h3>

      <div className="flex flex-col divide-y divide-gray-200 dark:divide-ink-gold/20">
        {articles.map((art, idx) => (
          <div key={art.id} className={`flex flex-col gap-2 ${idx > 0 ? "pt-4" : ""}`}>
            <h4
              onClick={() => onSelectArticle(art)}
              className="font-serif text-sm font-bold leading-snug text-black dark:text-ink-bright hover:text-red-700 dark:hover:text-ink-gold cursor-pointer transition-colors"
            >
              {art.title}
            </h4>

            <div className="flex gap-3 items-start">
              {art.imageUrl && (
                <div 
                  onClick={() => onSelectArticle(art)}
                  className="w-20 h-14 overflow-hidden rounded bg-gray-100 shrink-0 cursor-pointer group"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <p 
                onClick={() => onSelectArticle(art)}
                className="text-[11px] text-gray-600 dark:text-ink-bright/70 line-clamp-2 leading-tight cursor-pointer"
              >
                {art.description || "Click to read full press reporting."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {onSeeMore && (
        <button
          onClick={onSeeMore}
          className="w-full mt-3 py-2 border border-gray-300 dark:border-ink-gold/40 rounded text-xs font-serif font-bold text-black dark:text-ink-gold hover:bg-black hover:text-white dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all cursor-pointer text-center"
        >
          See more
        </button>
      )}
    </div>
  );
};
