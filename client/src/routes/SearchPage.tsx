import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchNewsApi } from "../services/newsApi.js";
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
import { SearchBar } from "../components/SearchBar.js";

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<SortOption>("newest");
  const [pageSize] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const performSearch = async (q: string, page: number, sortOption: SortOption) => {
    if (!q.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await searchNewsApi(q, { page, pageSize, sort: sortOption });
      if (res.success && res.data) {
        setArticles(res.data.articles);
        setTotalArticles(res.data.totalArticles);
        setHasKey(res.data.hasKey);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      setError(err.message || "Search request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
      performSearch(query, 1, sort);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      performSearch(query, currentPage, sort);
    }
  }, [currentPage, sort]);

  const handleSearchSubmit = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const handleRefresh = () => {
    if (query) performSearch(query, currentPage, sort);
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
        <div className="max-w-xl mx-auto mb-6">
          <SearchBar initialQuery={query} onSearch={handleSearchSubmit} />
        </div>

        {query ? (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-ink/20 dark:border-ink-gold/30 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-ink-bright">
                  Search Results for "{query}"
                </h2>
                <p className="text-xs text-ink-muted dark:text-ink-soft">
                  {totalArticles !== null ? `${totalArticles} articles found` : "Matching news dispatches"}
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
              <EmptyState title={`No results found for "${query}"`} message="Try searching with different keywords or topics." />
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
          </>
        ) : (
          <EmptyState title="Search NewsHub" message="Enter a topic, headline keyword, or location in the search bar above to query GNews." />
        )}
      </main>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
