import React from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrendingTopicsProps {
  topics: string[];
}

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  const navigate = useNavigate();

  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full bg-white/60 dark:bg-paper-cardDark/60 border border-ink/10 dark:border-ink-gold/20 rounded-lg p-3 sm:p-4 my-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-ink dark:text-ink-gold">
        <TrendingUp className="w-4 h-4 text-amber-600 dark:text-ink-gold" />
        <span>Curated Trending Topics</span>
        <Sparkles className="w-3.5 h-3.5 opacity-60 ml-auto" />
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}`)}
            className="px-2.5 py-1 text-xs font-medium bg-paper dark:bg-paper-dark border border-ink/20 dark:border-ink-gold/30 hover:border-ink dark:hover:border-ink-gold text-ink dark:text-ink-bright rounded-full hover:bg-ink hover:text-paper-light dark:hover:bg-ink-gold dark:hover:text-paper-dark transition-all cursor-pointer shadow-xs"
          >
            #{topic}
          </button>
        ))}
      </div>
    </div>
  );
};
