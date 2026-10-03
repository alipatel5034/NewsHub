import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Unable to load articles from the server. Please check your internet connection or try again later.",
  onRetry,
}) => {
  return (
    <div className="w-full my-8 p-6 sm:p-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-lg text-center max-w-xl mx-auto shadow-sm">
      <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
      <h3 className="font-serif text-lg font-bold text-red-900 dark:text-red-200 mb-2">
        News Service Temporary Interruption
      </h3>
      <p className="text-xs text-red-700 dark:text-red-300/80 mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-red-900 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
