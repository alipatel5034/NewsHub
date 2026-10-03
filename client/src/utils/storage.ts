import { NewsArticle } from "../types/news.js";

const BOOKMARKS_KEY = "newshub:bookmarks:v1";
const THEME_KEY = "newshub:theme:v1";

export function getStoredBookmarks(): NewsArticle[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load bookmarks from LocalStorage:", e);
    return [];
  }
}

export function saveBookmark(article: NewsArticle): NewsArticle[] {
  try {
    const current = getStoredBookmarks();
    if (current.some((b) => b.id === article.id || b.articleUrl === article.articleUrl)) {
      return current;
    }
    const updated = [article, ...current];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save bookmark:", e);
    return getStoredBookmarks();
  }
}

export function removeBookmark(id: string): NewsArticle[] {
  try {
    const current = getStoredBookmarks();
    const updated = current.filter((b) => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to remove bookmark:", e);
    return getStoredBookmarks();
  }
}

export function isBookmarked(id: string): boolean {
  const current = getStoredBookmarks();
  return current.some((b) => b.id === id);
}

export function getStoredTheme(): "light" | "dark" {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark") return raw;
  } catch (e) {
    console.error("Failed to load theme:", e);
  }
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function saveTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("Failed to save theme:", e);
  }
}
