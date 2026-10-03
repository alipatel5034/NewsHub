import React from "react";
import { NewsArticle } from "../types/news.js";
import { NewsCard } from "./NewsCard.js";

interface NewsGridProps {
  articles: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, onSelectArticle }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} onSelect={onSelectArticle} />
      ))}
    </div>
  );
};
