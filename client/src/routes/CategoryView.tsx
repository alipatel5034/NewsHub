import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryNews } from "../services/newsApi.js";
import { NewsArticle, SortOption } from "../types/news.js";
import { CategoryNav } from "../components/CategoryNav.js";
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
  };

  return (
    <div className="w-full">
      <ApiKeyBanner hasKey={hasKey} />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-ink/20 dark:border-ink-gold/30 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold capitalize text-ink dark:text-ink-bright">
              {category} Section
            </h2>
            <p className="text-xs text-ink-muted dark:text-ink-soft">
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

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
