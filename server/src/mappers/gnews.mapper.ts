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
  },
  {
    id: "sample-7",
    title: "Quantum Computing Advances Open New Frontiers in Cryptography and Security",
    description: "Engineers achieve quantum advantage benchmark in complex matrix calculations, paving the way for next-generation data encryption.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    sourceName: "Cybertech Dispatch",
    sourceUrl: "https://gnews.io",
    category: "technology"
  },
  {
    id: "sample-8",
    title: "Global Supply Chain Networks Shift Toward Sustainable Freight Logistics",
    description: "Major maritime and logistics operators adopt electrification and green hydrogen fuels to lower emissions across ocean corridors.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 35).toISOString(),
    sourceName: "Trade & Transit Review",
    sourceUrl: "https://gnews.io",
    category: "business"
  },
  {
    id: "sample-9",
    title: "International Film Festival Celebrates Breakthrough Independent Cinema",
    description: "Directors and producers from 40 nations gather to showcase avant-garde cinema and storytelling innovations.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 40).toISOString(),
    sourceName: "Culture & Arts Gazette",
    sourceUrl: "https://gnews.io",
    category: "entertainment"
  },
  {
    id: "sample-10",
    title: "Urban Infrastructure Summit Outlines Smart Grid Mobility Initiatives",
    description: "City planners unveil autonomous transit networks and green canopy corridors to improve urban mobility and air quality.",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 45).toISOString(),
    sourceName: "Urban Policy Digest",
    sourceUrl: "https://gnews.io",
    category: "general"
  },
  {
    id: "sample-11",
    title: "Breakthrough Battery Architecture Extends EV Driving Range Beyond 800 Miles",
    description: "Solid-state electrolyte chemistry promises rapid charging times under 10 minutes while eliminating thermal degradation risks.",
    imageUrl: "https://images.unsplash.com/photo-1558441719-6779b6914995?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 50).toISOString(),
    sourceName: "Automotive Tech Today",
    sourceUrl: "https://gnews.io",
    category: "technology"
  },
  {
    id: "sample-12",
    title: "Global Agricultural Survey Shows Precision AI Farming Boosts Crop Yields",
    description: "Automated drone sensor arrays and soil analytics reduce water usage while maximizing harvest efficiency in drought regions.",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 55).toISOString(),
    sourceName: "AgriTech World",
    sourceUrl: "https://gnews.io",
    category: "science"
  },
  {
    id: "sample-13",
    title: "International Summit Reaches Accord on Cross-Border Data Privacy Standards",
    description: "Delegates finalize unified encryption protocols protecting citizen consumer data while supporting global digital commerce.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    sourceName: "Global Law & Security",
    sourceUrl: "https://gnews.io",
    category: "nation"
  },
  {
    id: "sample-14",
    title: "Neurology Breakthrough: Non-Invasive Brain-Computer Interfaces Restore Mobility",
    description: "Clinical trials report paralyzed patients navigating digital interfaces using ultra-sensitive scalp sensor arrays.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 65).toISOString(),
    sourceName: "Neuroscience Monthly",
    sourceUrl: "https://gnews.io",
    category: "health"
  },
  {
    id: "sample-15",
    title: "World Championship Marathon Records Shattered in Historic Race",
    description: "Runners benefit from advanced carbon-plate footwear and ideal weather conditions to achieve sub-two-hour pacing.",
    imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    sourceName: "Athletics & Sports",
    sourceUrl: "https://gnews.io",
    category: "sports"
  },
  {
    id: "sample-16",
    title: "Deep Sea Oceanographic Expedition Discovers Uncharted Hydrothermal Ecosystems",
    description: "Submersible vehicles explore 4,000-meter deep trenches, discovering dozens of previously unknown bioluminescent marine species.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 75).toISOString(),
    sourceName: "Ocean Discovery Journal",
    sourceUrl: "https://gnews.io",
    category: "science"
  },
  {
    id: "sample-17",
    title: "Global Aviation Sector Tests Commercial Hydrogen-Powered Regional Flights",
    description: "Zero-emission aircraft complete successful test flights between European capitals, signaling a new era for clean travel.",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 80).toISOString(),
    sourceName: "Aviation & Travel World",
    sourceUrl: "https://gnews.io",
    category: "business"
  },
  {
    id: "sample-18",
    title: "Next-Gen Augmented Reality Headsets Aim for All-Day Lightweight Comfort",
    description: "Optical waveguides and micro-OLED displays enable prescription-grade smart glasses with 18-hour battery longevity.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    articleUrl: "https://gnews.io",
    publishedAt: new Date(Date.now() - 3600000 * 85).toISOString(),
    sourceName: "Personal Tech Review",
    sourceUrl: "https://gnews.io",
    category: "technology"
  }
];
