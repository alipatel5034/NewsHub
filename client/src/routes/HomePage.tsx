import React, { useState, useEffect } from "react";
import { fetchNewsFeed } from "../services/newsApi.js";
import { NewsArticle, SortOption } from "../types/news.js";
import { TrendingTicker } from "../components/TrendingTicker.js";
import { InteractiveCardDeck } from "../components/InteractiveCardDeck.js";
import { LeftEditorialColumn } from "../components/LeftEditorialColumn.js";
import { CenterHeroArticle } from "../components/CenterHeroArticle.js";
import { RightRelatedArticles } from "../components/RightRelatedArticles.js";
import { NewsGrid } from "../components/NewsGrid.js";
import { SortControl } from "../components/SortControl.js";
import { Pagination } from "../components/Pagination.js";
import { RefreshButton } from "../components/RefreshButton.js";
import { LoadingState } from "../components/LoadingState.js";
import { ErrorState } from "../components/ErrorState.js";
import { EmptyState } from "../components/EmptyState.js";
import { ApiKeyBanner } from "../components/ApiKeyBanner.js";
import { ArticleModal } from "../components/ArticleModal.js";

export const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [sort, setSort] = useState<SortOption>("newest");
  const [pageSize] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedModalArticle, setSelectedModalArticle] = useState<NewsArticle | null>(null);

  const loadData = async (page: number, sortOption: SortOption) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchNewsFeed({ page, pageSize, sort: sortOption });
      if (res.success && res.data) {
        setArticles(res.data.articles);
        setTotalArticles(res.data.totalArticles);
        setHasKey(res.data.hasKey);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      setError(err.message || "Failed to load headlines.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage, sort);
  }, [currentPage, sort]);

  const handleRefresh = () => {
    loadData(currentPage, sort);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1);
    setHeroIndex(0);
  };

  // Divide articles for 3-column newspaper grid layout
  const heroArticle = articles.length > 0 ? articles[heroIndex % articles.length] : null;
  const leftColumnArticles = articles.filter((_, idx) => idx !== heroIndex).slice(0, 2);
  const rightColumnArticles = articles.filter((_, idx) => idx !== heroIndex).slice(2, 6);
  const remainingArticles = articles.filter((_, idx) => idx !== heroIndex).slice(6);

  const handleNextHero = () => {
    if (articles.length > 0) {
      setHeroIndex((prev) => (prev + 1) % articles.length);
    }
  };

  const handlePrevHero = () => {
    if (articles.length > 0) {
      setHeroIndex((prev) => (prev - 1 + articles.length) % articles.length);
    }
  };

  return (
    <div className="w-full bg-[#f8f8f6] dark:bg-paper-dark min-h-screen">
      <ApiKeyBanner hasKey={hasKey} />
      
      {/* Red Trending Today Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <TrendingTicker articles={articles} onSelectArticle={setSelectedModalArticle} />
      </div>

      {/* Interactive 3D Card Deck (Swipe touchscreen / Scroll desktop) */}
      {!isLoading && articles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4">
          <InteractiveCardDeck
            articles={articles}
            onSelectArticle={setSelectedModalArticle}
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-4">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRefresh} />
        ) : articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* 3-Column Classic Newspaper Editorial Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 pb-8 border-b border-gray-300 dark:border-ink-gold/30">
              
              {/* Left Column (3 cols) */}
              <div className="md:col-span-3">
                <LeftEditorialColumn
                  articles={leftColumnArticles}
                  onSelectArticle={setSelectedModalArticle}
                />
              </div>

              {/* Center Hero Article (6 cols) */}
              <div className="md:col-span-6">
                <CenterHeroArticle
                  article={heroArticle}
                  onSelectArticle={setSelectedModalArticle}
                  onNextStory={handleNextHero}
                  onPrevStory={handlePrevHero}
                  storyIndex={heroIndex}
                  totalStories={articles.length}
                />
              </div>

              {/* Right Column (3 cols) */}
              <div className="md:col-span-3">
                <RightRelatedArticles
                  articles={rightColumnArticles}
                  onSelectArticle={setSelectedModalArticle}
                  onSeeMore={() => {
                    const el = document.getElementById("more-dispatches");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>

            </div>

            {/* Sub-section: Additional Newspaper Dispatches */}
            {remainingArticles.length > 0 && (
              <div id="more-dispatches" className="my-8">
                <div className="flex items-center justify-between pb-3 border-b border-gray-300 dark:border-ink-gold/30 mb-6">
                  <h3 className="font-serif text-2xl font-bold text-black dark:text-ink-bright">
                    Additional Daily Dispatches
                  </h3>

                  <div className="flex items-center gap-4">
                    <SortControl currentSort={sort} onSortChange={handleSortChange} />
                    <RefreshButton onRefresh={handleRefresh} isLoading={isLoading} lastUpdated={lastUpdated} />
                  </div>
                </div>

                <NewsGrid articles={remainingArticles} onSelectArticle={setSelectedModalArticle} />
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalArticles={totalArticles}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <ArticleModal article={selectedModalArticle} onClose={() => setSelectedModalArticle(null)} />
    </div>
  );
};
