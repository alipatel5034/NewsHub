import { NewsApiResponse } from "../types/news.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function fetchHealthCheck() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) throw new Error("Backend server is unreachable");
  return response.json();
}

export async function fetchNewsFeed(params: {
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest";
}): Promise<NewsApiResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.sort) query.set("sort", params.sort);

  const response = await fetch(`${API_BASE_URL}/api/news?${query.toString()}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch news feed");
  }
  return data;
}

export async function fetchCategoryNews(
  category: string,
  params: { page?: number; pageSize?: number; sort?: "newest" | "oldest" }
): Promise<NewsApiResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.sort) query.set("sort", params.sort);

  const response = await fetch(`${API_BASE_URL}/api/news/category/${category}?${query.toString()}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Failed to fetch news for category: ${category}`);
  }
  return data;
}

export async function searchNewsApi(
  q: string,
  params: { page?: number; pageSize?: number; sort?: "newest" | "oldest" }
): Promise<NewsApiResponse> {
  const query = new URLSearchParams({ q });
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.sort) query.set("sort", params.sort);

  const response = await fetch(`${API_BASE_URL}/api/news/search?${query.toString()}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Search request failed");
  }
  return data;
}

export async function fetchTrendingTopics(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/trending`);
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data?.topics || [];
  } catch {
    return [];
  }
}
