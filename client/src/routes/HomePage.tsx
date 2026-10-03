import React, { useState, useEffect } from "react";
import { fetchNewsFeed, fetchTrendingTopics } from "../services/newsApi.js";
import { NewsArticle, SortOption } from "../types/news.js";
import { CategoryNav } from "../components/CategoryNav.js";
import { TrendingTopics } from "../components/TrendingTopics.js";
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
  const [sort, setSort] = useState<SortOption>("newest");
  const [pageSize] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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

  useEffect(() => {
    fetchTrendingTopics().then(setTrendingTopics);
  }, []);

  const handleRefresh = () => {
    loadData(currentPage, sort);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <ApiKeyBanner hasKey={hasKey} />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <TrendingTopics topics={trendingTopics} />

        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-ink/20 dark:border-ink-gold/30">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-ink-bright">
              Top Headline Dispatches
            </h2>
            <p className="text-xs text-ink-muted dark:text-ink-soft">
              Curated global developments & main daily briefings
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <SortControl currentSort={sort} onSortChange={handleSortChange} />
            <RefreshButton onRefresh={handleRefresh} isLoading={isLoading} lastUpdated={lastUpdated} />
          </div>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRefresh} />
        ) : articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <NewsGrid articles={articles} onSelectArticle={setSelectedArticle} />
            <Pagination
              currentPage={currentPage}
              totalArticles={totalArticles}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {/* Article Detail Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
