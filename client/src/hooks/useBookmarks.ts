import { useState, useEffect } from "react";
import { NewsArticle } from "../types/news.js";
import { getStoredBookmarks, removeBookmark, saveBookmark } from "../utils/storage.js";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
  }, []);

  const add = (article: NewsArticle) => {
    const updated = saveBookmark(article);
    setBookmarks(updated);
  };

  const remove = (id: string) => {
    const updated = removeBookmark(id);
    setBookmarks(updated);
  };

  const isSaved = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const toggle = (article: NewsArticle) => {
    if (isSaved(article.id)) {
      remove(article.id);
    } else {
      add(article);
    }
  };

  return { bookmarks, add, remove, isSaved, toggle };
}
