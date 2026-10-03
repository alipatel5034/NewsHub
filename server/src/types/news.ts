export type NewsArticle = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  articleUrl: string;
  publishedAt: string | null;
  sourceName: string;
  sourceUrl: string | null;
  category?: string;
};

export type NewsApiResponse = {
  success: boolean;
  data?: {
    articles: NewsArticle[];
    totalArticles: number | null;
    page: number;
    pageSize: number;
    hasKey: boolean;
    isMock?: boolean;
  };
  error?: {
    code: string;
    message: string;
    details?: string;
  };
};

export type GNewsItem = {
  title: string;
  description?: string;
  content?: string;
  url: string;
  image?: string;
  publishedAt?: string;
  source?: {
    name?: string;
    url?: string;
  };
};

export type GNewsResponse = {
  totalArticles?: number;
  articles?: GNewsItem[];
  errors?: string[] | string;
};
