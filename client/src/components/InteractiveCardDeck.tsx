import React, { useState, useRef } from "react";
import { NewsArticle } from "../types/news.js";
import { ArrowUpRight, ChevronLeft, ChevronRight, Bookmark, Clock } from "lucide-react";
import { formatRelativeTime } from "../utils/date.js";
import { useBookmarks } from "../hooks/useBookmarks.js";

interface InteractiveCardDeckProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const InteractiveCardDeck: React.FC<InteractiveCardDeckProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isSaved, toggle } = useBookmarks();

  // Touch & Mouse Drag gesture state & Scroll throttle
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isScrollThrottled = useRef<boolean>(false);

  if (!articles || articles.length === 0) return null;

  const deckArticles = articles.slice(0, 7);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % deckArticles.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + deckArticles.length) % deckArticles.length);
  };

  // Touch Swipe Handlers (High Sensitivity > 15px)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 15; // Highly sensitive swipe

    if (diffX > minSwipeDistance) {
      handleNext(); // Swiped left -> advance 1 card
    } else if (diffX < -minSwipeDistance) {
      handlePrev(); // Swiped right -> advance 1 card
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Wheel Horizontal/Vertical Scroll Handler (Sensitive 1 Card per scroll step)
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollThrottled.current) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (Math.abs(delta) > 5) {
      isScrollThrottled.current = true;

      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      // 250ms throttle cooldown for smooth 1-card scroll control
      setTimeout(() => {
        isScrollThrottled.current = false;
      }, 250);
    }
  };

  return (
    <div className="w-full my-6 py-6 px-2 bg-[#f4f3ef] dark:bg-paper-dark border border-gray-300 dark:border-ink-gold/30 rounded-xl overflow-hidden shadow-xs">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 mb-6">
        <div>
          <h3 className="font-serif text-2xl font-black text-black dark:text-ink-bright tracking-tight">
            Featured Dispatch Deck
          </h3>
          <p className="text-xs text-gray-500 dark:text-ink-gold font-sans">
            Swipe or scroll right/left to browse top headlines
          </p>
        </div>

        {/* Controls (Card count removed as requested) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white dark:bg-paper-cardDark border border-gray-300 dark:border-ink-gold/30 text-black dark:text-ink-gold hover:bg-black hover:text-white dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all shadow-sm cursor-pointer"
            title="Previous Card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white dark:bg-paper-cardDark border border-gray-300 dark:border-ink-gold/30 text-black dark:text-ink-gold hover:bg-black hover:text-white dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all shadow-sm cursor-pointer"
            title="Next Card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Stacked Card Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="relative w-full h-[420px] sm:h-[460px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {deckArticles.map((art, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 2;

          if (!isVisible) return null;

          const bookmarked = isSaved(art.id);

          // 3D positioning math
          const translateX = offset * 180; // horizontal spacing
          const scale = 1 - absOffset * 0.12; // active is 1.0, side cards 0.88, 0.76
          const zIndex = 30 - absOffset * 10;
          const opacity = 1 - absOffset * 0.25;

          return (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className="absolute w-[280px] sm:w-[340px] h-[380px] sm:h-[420px] bg-white dark:bg-paper-cardDark border-2 border-gray-900/10 dark:border-ink-gold/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-out flex flex-col group cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative w-full h-56 sm:h-64 bg-gray-900 overflow-hidden">
                {art.imageUrl ? (
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4 text-center font-serif text-white/60 bg-gray-800">
                    Dispatch Headline
                  </div>
                )}

                {/* Top Source Badge */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20">
                  {art.sourceName}
                </div>

                {/* Bookmark Toggle Badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(art);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
                    bookmarked
                      ? "bg-amber-400 text-black shadow-md"
                      : "bg-black/40 text-white hover:bg-black/70 border border-white/20"
                  }`}
                  title={bookmarked ? "Bookmarked" : "Save Bookmark"}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Card Content Footer */}
              <div className="relative flex-1 p-4 flex flex-col justify-between bg-white dark:bg-paper-cardDark">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 dark:text-ink-gold mb-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatRelativeTime(art.publishedAt)}</span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg font-bold leading-tight text-black dark:text-ink-bright group-hover:text-red-700 dark:group-hover:text-ink-gold transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                </div>

                {/* Bottom Right Small Circle with North-East Arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-ink-gold/15 mt-2">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gray-400">
                    Read Dispatch
                  </span>

                  <div className="w-9 h-9 rounded-full bg-black text-white dark:bg-ink-gold dark:text-paper-dark flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-red-600 transition-all">
                    <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
