import { GNewsItem, NewsArticle } from "../types/news";
import crypto from "crypto";

export function generateArticleId(url: string, title: string): string {
  if (url && url.length > 5) {
    return crypto.createHash("sha256").update(url).digest("hex").substring(0, 16);
  }
  return crypto.createHash("sha256").update(title).digest("hex").substring(0, 16);
}

export function mapGNewsItemToArticle(item: GNewsItem, categoryDefault?: string): NewsArticle {
  const articleUrl = item.url || "#";
  const title = item.title || "Untitled Article";
  const id = generateArticleId(articleUrl, title);

  return {
    id,
    title,
    description: item.description || null,
    imageUrl: item.image || null,
    articleUrl,
    publishedAt: item.publishedAt || new Date().toISOString(),
    sourceName: item.source?.name || "News Source",
    sourceUrl: item.source?.url || null,
    category: categoryDefault || "general",
  };
}

export const SAMPLE_FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: "sample-1",
    title: "Next-Generation AI Models Revolutionize Scientific Research and Discovery",
    description: "Researchers announce breakthrough artificial intelligence architectures capable of accelerating protein folding analysis and material science synthesis in real-time.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    sourceName: "Global Tech Insights",
    sourceUrl: "https://gnews.io",
    category: "technology"
  },
  {
    id: "sample-2",
    title: "Space Exploration Mission Prepares for Deep Solar System Probe Launch",
    description: "International space agency teams unveil final trajectory designs for an unprecedented outer planet survey mission scheduled for mid-decade deployment.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    sourceName: "Astronomy & Cosmos Journal",
    sourceUrl: "https://gnews.io",
    category: "science"
  },
  {
    id: "sample-3",
    title: "Global Renewable Energy Generation Reaches Historic High Milestone",
    description: "Clean power initiatives deliver record solar and wind energy output across global grids, accelerating energy transition goals.",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 9).toISOString(),
    sourceName: "Eco World News",
    sourceUrl: "https://gnews.io",
    category: "general"
  },
  {
    id: "sample-4",
    title: "World Markets Adjust to New Central Bank Interest Rate Frameworks",
    description: "Financial markets across Europe, Asia, and North America respond positively as monetary authorities outline clear long-term fiscal strategies.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    sourceName: "Financial Standard",
    sourceUrl: "https://gnews.io",
    category: "business"
  },
  {
    id: "sample-5",
    title: "Medical Researchers Unveil New Targeted Gene Therapy Clinical Trial Results",
    description: "Early clinical data demonstrates unprecedented success rates in treating rare metabolic disorders using precision CRISPR techniques.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    sourceName: "Biomedical Reports",
    sourceUrl: "https://gnews.io",
    category: "health"
  },
  {
    id: "sample-6",
    title: "Championship League Highlights: Dramatic Comeback Leads to Historic Victory",
    description: "Underdog team scores two late goals in stoppage time to secure an unforgettable victory before a packed stadium crowd.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    sourceName: "Sports Weekly",
    sourceUrl: "https://gnews.io",
    category: "sports"
  }
];
