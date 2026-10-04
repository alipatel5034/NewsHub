import { env, isApiKeyConfigured } from "../config/env";
import { mapGNewsItemToArticle, SAMPLE_FALLBACK_ARTICLES } from "../mappers/gnews.mapper";
import { GNewsResponse, NewsArticle } from "../types/news";

export async function fetchTopHeadlines(options: {
  category?: string;
  lang?: string;
  country?: string;
  max?: number;
  page?: number;
}): Promise<{ articles: NewsArticle[]; totalArticles: number; hasKey: boolean; isMock?: boolean }> {
  const hasKey = isApiKeyConfigured();

  if (!hasKey) {
    let filtered = [...SAMPLE_FALLBACK_ARTICLES];
    if (options.category && options.category !== "general") {
      filtered = filtered.filter((a) => a.category === options.category);
      if (filtered.length === 0) filtered = SAMPLE_FALLBACK_ARTICLES;
    }
    return {
      articles: filtered,
      totalArticles: Math.max(filtered.length * 3, 36),
      hasKey: false,
      isMock: true,
    };
  }

  const url = new URL(`${env.GNEWS_BASE_URL}/top-headlines`);
  url.searchParams.set("apikey", env.GNEWS_API_KEY);
  url.searchParams.set("lang", options.lang || "en");
  if (options.category && options.category !== "general") {
    url.searchParams.set("category", options.category);
  }
  if (options.country) {
    url.searchParams.set("country", options.country);
  }
  url.searchParams.set("max", String(options.max || 10));
  if (options.page) {
    url.searchParams.set("page", String(options.page));
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), env.REQUEST_TIMEOUT_MS);

    const response = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("INVALID_API_KEY: The provided GNews API key is invalid or unauthorized.");
      }
      if (response.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED: GNews API request quota reached. Try again later.");
      }
      throw new Error(`PROVIDER_ERROR_${response.status}: Failed to fetch articles from GNews.`);
    }

    const data = (await response.json()) as GNewsResponse;

    if (!data.articles) {
      return { articles: [], totalArticles: 0, hasKey: true };
    }

    const mapped = data.articles.map((item) => mapGNewsItemToArticle(item, options.category));
    return {
      articles: mapped,
      totalArticles: data.totalArticles ?? Math.max(mapped.length * 3, 36),
      hasKey: true,
      isMock: false,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("REQUEST_TIMEOUT: GNews API server took too long to respond.");
    }
    throw err;
  }
}

export async function searchNewsArticles(options: {
  q: string;
  lang?: string;
  max?: number;
  in?: string;
  page?: number;
}): Promise<{ articles: NewsArticle[]; totalArticles: number; hasKey: boolean; isMock?: boolean }> {
  const hasKey = isApiKeyConfigured();

  if (!hasKey) {
    const query = options.q.toLowerCase();
    const filtered = SAMPLE_FALLBACK_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query))
    );
    const pool = filtered.length > 0 ? filtered : SAMPLE_FALLBACK_ARTICLES;
    return {
      articles: pool,
      totalArticles: Math.max(pool.length * 3, 36),
      hasKey: false,
      isMock: true,
    };
  }

  const url = new URL(`${env.GNEWS_BASE_URL}/search`);
  url.searchParams.set("apikey", env.GNEWS_API_KEY);
  url.searchParams.set("q", options.q);
  url.searchParams.set("lang", options.lang || "en");
  url.searchParams.set("max", String(options.max || 10));
  if (options.page) {
    url.searchParams.set("page", String(options.page));
  }
  if (options.in) {
    url.searchParams.set("in", options.in);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), env.REQUEST_TIMEOUT_MS);

    const response = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("INVALID_API_KEY: The provided GNews API key is invalid or unauthorized.");
      }
      if (response.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED: GNews API request quota reached. Try again later.");
      }
      throw new Error(`PROVIDER_ERROR_${response.status}: Failed to search articles on GNews.`);
    }

    const data = (await response.json()) as GNewsResponse;

    if (!data.articles) {
      return { articles: [], totalArticles: 0, hasKey: true };
    }

    const mapped = data.articles.map((item) => mapGNewsItemToArticle(item));
    return {
      articles: mapped,
      totalArticles: data.totalArticles ?? Math.max(mapped.length * 3, 36),
      hasKey: true,
      isMock: false,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("REQUEST_TIMEOUT: GNews API server took too long to respond.");
    }
    throw err;
  }
}
