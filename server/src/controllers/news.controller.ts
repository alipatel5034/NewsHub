import { Request, Response, NextFunction } from "express";
import { categoryParamSchema, newsQuerySchema, searchQuerySchema } from "../schemas/news.schema";
import { fetchTopHeadlines, searchNewsArticles } from "../services/gnews.service";
import { TRENDING_TOPICS } from "../config/trending-topics";
import { NewsArticle } from "../types/news";

function sortArticles(articles: NewsArticle[], sort: "newest" | "oldest"): NewsArticle[] {
  return [...articles].sort((a, b) => {
    const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    if (isNaN(timeA)) return 1;
    if (isNaN(timeB)) return -1;
    return sort === "newest" ? timeB - timeA : timeA - timeB;
  });
}

function paginateArticles(articles: NewsArticle[], page: number, pageSize: number): NewsArticle[] {
  const startIndex = (page - 1) * pageSize;
  return articles.slice(startIndex, startIndex + pageSize);
}

export async function getNews(req: Request, res: Response, next: NextFunction) {
  try {
    const query = newsQuerySchema.parse(req.query);
    const result = await fetchTopHeadlines({
      category: "general",
      lang: query.lang,
      country: query.country,
      max: 10,
    });

    const sorted = sortArticles(result.articles, query.sort);
    const paginated = paginateArticles(sorted, query.page, query.pageSize);

    return res.json({
      success: true,
      data: {
        articles: paginated,
        totalArticles: result.totalArticles,
        page: query.page,
        pageSize: query.pageSize,
        hasKey: result.hasKey,
        isMock: result.isMock ?? false,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getCategoryNews(req: Request, res: Response, next: NextFunction) {
  try {
    const params = categoryParamSchema.parse(req.params);
    const query = newsQuerySchema.parse(req.query);

    const result = await fetchTopHeadlines({
      category: params.category,
      lang: query.lang,
      country: query.country,
      max: 10,
    });

    const sorted = sortArticles(result.articles, query.sort);
    const paginated = paginateArticles(sorted, query.page, query.pageSize);

    return res.json({
      success: true,
      data: {
        articles: paginated,
        totalArticles: result.totalArticles,
        page: query.page,
        pageSize: query.pageSize,
        hasKey: result.hasKey,
        isMock: result.isMock ?? false,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function searchNews(req: Request, res: Response, next: NextFunction) {
  try {
    const query = searchQuerySchema.parse(req.query);

    const result = await searchNewsArticles({
      q: query.q,
      lang: query.lang,
      max: 10,
    });

    const sorted = sortArticles(result.articles, query.sort);
    const paginated = paginateArticles(sorted, query.page, query.pageSize);

    return res.json({
      success: true,
      data: {
        articles: paginated,
        totalArticles: result.totalArticles,
        page: query.page,
        pageSize: query.pageSize,
        hasKey: result.hasKey,
        isMock: result.isMock ?? false,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function getTrendingTopics(_req: Request, res: Response) {
  return res.json({
    success: true,
    data: {
      topics: TRENDING_TOPICS,
    },
  });
}
