import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calculateTotalPages, getPageNumbers } from "../utils/pagination.js";

interface PaginationProps {
  currentPage: number;
  totalArticles: number | null;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalArticles,
  pageSize,
  onPageChange,
}) => {
  const totalPages = calculateTotalPages(totalArticles, pageSize);

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 my-8 font-mono text-xs">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 border border-ink/20 dark:border-ink-gold/30 rounded text-ink dark:text-ink-bright hover:bg-ink hover:text-paper-light dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer"
        title="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 border rounded transition-all cursor-pointer font-bold ${
            currentPage === page
              ? "bg-ink text-paper-light border-ink dark:bg-ink-gold dark:text-paper-dark dark:border-ink-gold"
              : "border-ink/20 dark:border-ink-gold/30 text-ink dark:text-ink-bright hover:bg-paper dark:hover:bg-paper-cardDark"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 border border-ink/20 dark:border-ink-gold/30 rounded text-ink dark:text-ink-bright hover:bg-ink hover:text-paper-light dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer"
        title="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
