import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryNews } from "../services/newsApi.js";
import { NewsArticle, SortOption } from "../types/news.js";
import { TrendingTicker } from "../components/TrendingTicker.js";
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

export const CategoryView: React.FC = () => {
  const { category = "general" } = useParams<{ category: string }>();

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
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const loadCategoryData = async (cat: string, page: number, sortOption: SortOption) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchCategoryNews(cat, { page, pageSize, sort: sortOption });
      if (res.success && res.data) {
        setArticles(res.data.articles);
        setTotalArticles(res.data.totalArticles);
        setHasKey(res.data.hasKey);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      setError(err.message || `Failed to load ${category} news.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setHeroIndex(0);
    loadCategoryData(category, 1, sort);
  }, [category]);

  useEffect(() => {
    loadCategoryData(category, currentPage, sort);
  }, [currentPage, sort]);

  const handleRefresh = () => {
    loadCategoryData(category, currentPage, sort);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1);
    setHeroIndex(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="max-w-7xl mx-auto px-4">
        <TrendingTicker articles={articles} onSelectArticle={setSelectedArticle} />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Category Heading Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-gray-300 dark:border-ink-gold/30 mb-6">
          <div>
            <h2 className="font-serif text-3xl font-extrabold capitalize text-black dark:text-ink-bright">
              {category} Section
            </h2>
            <p className="text-xs text-gray-500 dark:text-ink-soft">
              Specialized reports & coverage for {category}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <SortControl currentSort={sort} onSortChange={handleSortChange} />
            <RefreshButton onRefresh={handleRefresh} isLoading={isLoading} lastUpdated={lastUpdated} />
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRefresh} />
        ) : articles.length === 0 ? (
          <EmptyState title={`No ${category} Articles Found`} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 pb-8 border-b border-gray-300 dark:border-ink-gold/30">
              <div className="md:col-span-3">
                <LeftEditorialColumn
                  articles={leftColumnArticles}
                  onSelectArticle={setSelectedArticle}
                />
              </div>

              <div className="md:col-span-6">
                <CenterHeroArticle
                  article={heroArticle}
                  onSelectArticle={setSelectedArticle}
                  onNextStory={handleNextHero}
                  onPrevStory={handlePrevHero}
                  storyIndex={heroIndex}
                  totalStories={articles.length}
                />
              </div>

              <div className="md:col-span-3">
                <RightRelatedArticles
                  articles={rightColumnArticles}
                  onSelectArticle={setSelectedArticle}
                />
              </div>
            </div>

            {remainingArticles.length > 0 && (
              <div className="my-8">
                <NewsGrid articles={remainingArticles} onSelectArticle={setSelectedArticle} />
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalArticles={totalArticles}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
