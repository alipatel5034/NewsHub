import React, { useState } from "react";
import { useBookmarks } from "../hooks/useBookmarks.js";
import { CategoryNav } from "../components/CategoryNav.js";
import { NewsGrid } from "../components/NewsGrid.js";
import { EmptyState } from "../components/EmptyState.js";
import { ArticleModal } from "../components/ArticleModal.js";
import { NewsArticle } from "../types/news.js";
import { Bookmark, Trash2 } from "lucide-react";

export const BookmarksPage: React.FC = () => {
  const { bookmarks, remove } = useBookmarks();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="w-full">
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between pb-4 border-b border-ink/20 dark:border-ink-gold/30 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold flex items-center gap-2 text-ink dark:text-ink-bright">
              <Bookmark className="w-6 h-6 text-amber-700 dark:text-ink-gold" />
              Saved Bookmarks Archive
            </h2>
            <p className="text-xs text-ink-muted dark:text-ink-soft">
              {bookmarks.length} articles saved locally in your browser
            </p>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all saved bookmarks?")) {
                  bookmarks.forEach((b) => remove(b.id));
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {bookmarks.length === 0 ? (
          <EmptyState
            title="Your Bookmarks Archive is Empty"
            message="Save interesting articles while browsing by clicking the bookmark icon on any headline card."
            actionText="Explore Top Headlines"
            actionHref="/"
          />
        ) : (
          <NewsGrid articles={bookmarks} onSelectArticle={setSelectedArticle} />
        )}
      </main>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
