import { env, isApiKeyConfigured } from "../config/env";
import { mapGNewsItemToArticle, SAMPLE_FALLBACK_ARTICLES } from "../mappers/gnews.mapper";
import { GNewsResponse, NewsArticle } from "../types/news";

function getFallbackNews(category?: string): NewsArticle[] {
  let filtered = [...SAMPLE_FALLBACK_ARTICLES];
  if (category && category !== "general") {
    const categoryMatches = filtered.filter((a) => a.category === category);
    if (categoryMatches.length > 0) {
      filtered = categoryMatches;
    }
  }
  return filtered;
}

export async function fetchTopHeadlines(options: {
  category?: string;
  lang?: string;
  country?: string;
  max?: number;
  page?: number;
}): Promise<{ articles: NewsArticle[]; totalArticles: number; hasKey: boolean; isMock?: boolean }> {
  const hasKey = isApiKeyConfigured();

  if (!hasKey) {
    const fallback = getFallbackNews(options.category);
    return {
      articles: fallback,
      totalArticles: Math.max(fallback.length * 3, 36),
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
      console.warn(`⚠️ GNews API returned status ${response.status}. Serving instant fallback news dispatches.`);
      const fallback = getFallbackNews(options.category);
      return {
        articles: fallback,
        totalArticles: Math.max(fallback.length * 3, 36),
        hasKey: true,
        isMock: true,
      };
    }

    const data = (await response.json()) as GNewsResponse;

    if (!data.articles || data.articles.length === 0) {
      const fallback = getFallbackNews(options.category);
      return {
        articles: fallback,
        totalArticles: Math.max(fallback.length * 3, 36),
        hasKey: true,
        isMock: true,
      };
    }

    const mapped = data.articles.map((item) => mapGNewsItemToArticle(item, options.category));
    return {
      articles: mapped,
      totalArticles: data.totalArticles ?? Math.max(mapped.length * 3, 36),
      hasKey: true,
      isMock: false,
    };
  } catch (err: any) {
    console.warn(`⚠️ Upstream GNews API fetch issue (${err.message}). Serving instant fallback news dispatches.`);
    const fallback = getFallbackNews(options.category);
    return {
      articles: fallback,
      totalArticles: Math.max(fallback.length * 3, 36),
      hasKey: true,
      isMock: true,
    };
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
      console.warn(`⚠️ GNews Search API returned status ${response.status}. Serving instant fallback news dispatches.`);
      const query = options.q.toLowerCase();
      const filtered = SAMPLE_FALLBACK_ARTICLES.filter(
        (a) => a.title.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query))
      );
      const pool = filtered.length > 0 ? filtered : SAMPLE_FALLBACK_ARTICLES;
      return {
        articles: pool,
        totalArticles: Math.max(pool.length * 3, 36),
        hasKey: true,
        isMock: true,
      };
    }

    const data = (await response.json()) as GNewsResponse;

    if (!data.articles || data.articles.length === 0) {
      const query = options.q.toLowerCase();
      const filtered = SAMPLE_FALLBACK_ARTICLES.filter(
        (a) => a.title.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query))
      );
      const pool = filtered.length > 0 ? filtered : SAMPLE_FALLBACK_ARTICLES;
      return {
        articles: pool,
        totalArticles: Math.max(pool.length * 3, 36),
        hasKey: true,
        isMock: true,
      };
    }

    const mapped = data.articles.map((item) => mapGNewsItemToArticle(item));
    return {
      articles: mapped,
      totalArticles: data.totalArticles ?? Math.max(mapped.length * 3, 36),
      hasKey: true,
      isMock: false,
    };
  } catch (err: any) {
    console.warn(`⚠️ Upstream GNews Search issue (${err.message}). Serving instant fallback news dispatches.`);
    const query = options.q.toLowerCase();
    const filtered = SAMPLE_FALLBACK_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query))
    );
    const pool = filtered.length > 0 ? filtered : SAMPLE_FALLBACK_ARTICLES;
    return {
      articles: pool,
      totalArticles: Math.max(pool.length * 3, 36),
      hasKey: true,
      isMock: true,
    };
  }
}
