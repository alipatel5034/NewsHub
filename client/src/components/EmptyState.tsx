import React from "react";
import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Articles Found",
  message = "We couldn't find any press articles matching your filter or search criteria.",
  actionText = "Return to Top Headlines",
  actionHref = "/",
}) => {
  return (
    <div className="w-full my-12 p-8 sm:p-12 text-center bg-white dark:bg-paper-cardDark border border-dashed border-ink/20 dark:border-ink-gold/30 rounded-lg flex flex-col items-center justify-center max-w-lg mx-auto shadow-sm">
      <FileQuestion className="w-12 h-12 text-ink-muted dark:text-ink-gold mb-3 opacity-60" />
      <h3 className="font-serif text-xl font-bold text-ink dark:text-ink-bright mb-2">
        {title}
      </h3>
      <p className="text-xs text-ink-soft dark:text-ink-bright/70 mb-6 leading-relaxed">
        {message}
      </p>
      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="px-4 py-2 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark font-bold text-xs uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
