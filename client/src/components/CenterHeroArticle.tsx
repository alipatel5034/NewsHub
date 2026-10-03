import React from "react";
import { NewsArticle } from "../types/news.js";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "../utils/date.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

interface CenterHeroArticleProps {
  article: NewsArticle | null;
  onSelectArticle: (article: NewsArticle) => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
  storyIndex?: number;
  totalStories?: number;
}

export const CenterHeroArticle: React.FC<CenterHeroArticleProps> = ({
  article,
  onSelectArticle,
  onNextStory,
  onPrevStory,
  storyIndex = 0,
  totalStories = 1,
}) => {
  const { isSaved, toggle } = useBookmarks();

  if (!article) return null;

  const bookmarked = isSaved(article.id);

  return (
    <div className="flex flex-col border-x border-gray-200 dark:border-ink-gold/20 px-0 md:px-6">
      {/* Hero Image */}
      <div 
        onClick={() => onSelectArticle(article)}
        className="relative w-full h-64 sm:h-80 md:h-[380px] overflow-hidden rounded bg-gray-100 dark:bg-paper-cardDark cursor-pointer group mb-2"
      >
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center text-gray-500 font-serif">
            Headline Image Dispatch
          </div>
        )}

        {/* Yellow Ribbon Bookmark Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(article);
          }}
          className={`absolute top-0 right-4 p-2.5 rounded-b-md shadow-md transition-transform active:scale-95 cursor-pointer ${
            bookmarked ? "bg-amber-400 text-black" : "bg-yellow-300 text-gray-800 hover:bg-yellow-400"
          }`}
          title={bookmarked ? "Bookmarked" : "Bookmark Story"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Caption under Image */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-ink-soft font-sans mb-4 px-1">
        <span>{article.sourceName || "International Press"}</span>
        <span>By {article.sourceName} Reporter</span>
      </div>

      {/* Headline */}
      <h2
        onClick={() => onSelectArticle(article)}
        className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-ink-bright hover:text-red-700 dark:hover:text-ink-gold cursor-pointer transition-colors leading-tight mb-3"
      >
        {article.title}
      </h2>

      {/* Published Date */}
      <p className="text-xs text-gray-500 dark:text-ink-gold font-sans mb-4 border-b border-gray-200 dark:border-ink-gold/20 pb-3">
        Published {formatDate(article.publishedAt)}
      </p>

      {/* Article Body Snippets */}
      <div 
        onClick={() => onSelectArticle(article)}
        className="text-sm text-gray-800 dark:text-ink-bright/90 font-serif leading-relaxed space-y-4 cursor-pointer"
      >
        <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none text-justify">
          {article.description || "In an impactful briefing released today, international correspondents detail major developments surrounding this ongoing event."}
        </p>

        <p className="text-gray-600 dark:text-ink-soft text-xs font-sans italic border-l-2 border-red-600 pl-3 my-2">
          "Our coverage brings direct updates from accredited news providers worldwide."
        </p>

        <p className="text-xs text-gray-700 dark:text-ink-bright/80 font-sans leading-normal">
          Click to read the comprehensive article on the official publisher website.
        </p>
      </div>

      {/* Hero Carousel Navigation Controls */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-ink-gold/20 font-sans text-xs">
        <button
          onClick={onPrevStory}
          disabled={!onPrevStory}
          className="flex items-center gap-1 text-gray-700 dark:text-ink-bright hover:text-black dark:hover:text-ink-gold disabled:opacity-30 cursor-pointer font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous Story</span>
        </button>

        <span className="text-[11px] font-mono text-gray-400">
          Story {storyIndex + 1} of {totalStories}
        </span>

        <button
          onClick={onNextStory}
          disabled={!onNextStory}
          className="flex items-center gap-1 text-gray-700 dark:text-ink-bright hover:text-black dark:hover:text-ink-gold disabled:opacity-30 cursor-pointer font-bold"
        >
          <span>Next Story</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
