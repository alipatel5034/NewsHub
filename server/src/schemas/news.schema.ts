import { z } from "zod";

export const ALLOWED_CATEGORIES = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health"
] as const;

export const newsQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  pageSize: z.string().optional().transform((val) => (val ? Math.min(24, Math.max(1, parseInt(val, 10))) : 12)),
  sort: z.enum(["newest", "oldest"]).optional().default("newest"),
  country: z.string().length(2).optional(),
  lang: z.string().optional().default("en"),
});

export const searchQuerySchema = newsQuerySchema.extend({
  q: z.string().min(1, "Search query is required").max(100, "Search query is too long"),
});

export const categoryParamSchema = z.object({
  category: z.enum(ALLOWED_CATEGORIES, {
    errorMap: () => ({ message: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}` })
  }),
});
