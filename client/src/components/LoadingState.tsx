import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full my-8">
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-ink dark:text-ink-gold" />
        <span className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-soft">
          Fetching Latest Press Articles...
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-paper-cardDark border border-ink/10 dark:border-ink-gold/15 rounded-lg overflow-hidden h-96 p-4 flex flex-col gap-3 animate-pulse"
          >
            <div className="w-full h-44 bg-paper dark:bg-paper-dark rounded" />
            <div className="w-1/3 h-3 bg-paper dark:bg-paper-dark rounded mt-2" />
            <div className="w-full h-5 bg-paper dark:bg-paper-dark rounded" />
            <div className="w-4/5 h-5 bg-paper dark:bg-paper-dark rounded" />
            <div className="w-full h-12 bg-paper dark:bg-paper-dark rounded mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
