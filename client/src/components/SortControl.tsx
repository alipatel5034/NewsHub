import React from "react";
import { SortOption } from "../types/news.js";
import { ArrowUpDown } from "lucide-react";

interface SortControlProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortControl: React.FC<SortControlProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <ArrowUpDown className="w-3.5 h-3.5 text-ink-muted dark:text-ink-gold" />
      <span className="font-semibold uppercase tracking-wider text-ink-muted dark:text-ink-soft hidden sm:inline">
        Sort:
      </span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-white dark:bg-paper-cardDark border border-ink/20 dark:border-ink-gold/30 text-ink dark:text-ink-bright text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ink dark:focus:ring-ink-gold cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};
