import React from "react";
import { RotateCw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated?: string | null;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isLoading, lastUpdated }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider border border-ink/30 dark:border-ink-gold/40 rounded hover:bg-ink hover:text-paper-light dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all disabled:opacity-50 cursor-pointer"
        title="Refresh current news feed"
      >
        <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
        <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
      </button>
      {lastUpdated && (
        <span className="text-[10px] text-ink-muted dark:text-ink-soft hidden sm:inline">
          Updated: {lastUpdated}
        </span>
      )}
    </div>
  );
};
