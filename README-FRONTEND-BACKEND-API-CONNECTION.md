# NewsHub — Frontend, Backend, and GNews API Connection

## Purpose
This guide explains the end-to-end connection between the React frontend, Express backend, and GNews API.

**Security rule:** The browser calls the NewsHub backend. The backend calls GNews. The secret GNews API key must never be sent to the browser.

## Architecture
```text
User
  |
  v
React frontend
  | GET /api/news?category=technology
  v
NewsHub backend (Express)
  | HTTPS request with server-side GNews key
  v
GNews API
  | JSON response
  v
Backend validates/maps provider data
  | normalized JSON
  v
React renders article cards
```

## Local URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

## Environment Variables

Backend `server/.env`:
```dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GNEWS_API_KEY=replace_with_your_real_key
GNEWS_BASE_URL=https://gnews.io/api/v4
REQUEST_TIMEOUT_MS=10000
```

Frontend `client/.env.local`:
```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

The frontend base URL is public configuration. Never put the GNews key in a `VITE_*` variable or frontend source.

## Request Flow

### Load home news
```http
GET http://localhost:5000/api/news?page=1&pageSize=12&sort=newest
```
Backend validates parameters, requests GNews, checks the response, maps fields, and returns NewsHub JSON.

### Search
```http
GET http://localhost:5000/api/news/search?q=artificial%20intelligence&page=1&pageSize=12
```
Use `URLSearchParams` on the frontend. Validate query length and content on the backend too.

### Category
```http
GET http://localhost:5000/api/news/category/technology?page=1&pageSize=12
```
The backend maps the category to a supported GNews category/query and rejects unsupported values.

### Trending
```http
GET http://localhost:5000/api/news/trending
```
Returns configured topic shortcuts. Selecting a topic starts a normal search; a curated list is not a real-time trend measurement.

### Refresh
The frontend repeats the current feed request and shows a busy state. A new request does not guarantee that the provider has new articles.

## Normalized Article Contract
```json
{
  "id": "stable-article-id",
  "title": "Example headline",
  "description": "Short description, if available",
  "imageUrl": "https://example.com/image.jpg",
  "articleUrl": "https://example.com/article",
  "publishedAt": "2026-10-02T08:00:00Z",
  "sourceName": "Example Publisher",
  "sourceUrl": "https://example.com"
}
```
This is example data only. Optional fields should be nullable.

## Example Frontend API Service
Create `client/src/services/newsApi.ts`:
```ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function fetchNews(params: {
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest";
}) {
  const query = new URLSearchParams();

  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.pageSize !== undefined) query.set("pageSize", String(params.pageSize));
  if (params.sort) query.set("sort", params.sort);

  const response = await fetch(
    `${API_BASE_URL}/api/news?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("News could not be loaded. Please try again.");
  }

  return response.json();
}

export async function searchNews(
  q: string,
  page = 1,
  pageSize = 12
) {
  const query = new URLSearchParams({
    q,
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await fetch(
    `${API_BASE_URL}/api/news/search?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Search failed. Please try again.");
  }

  return response.json();
}
```
This assumes matching backend routes and response contracts. Add runtime response validation if needed.

## Example Backend Route Mounting
This is a starter illustration; add validation, rate limiting, and error middleware before production.

```ts
// server/src/routes/news.routes.ts
import { Router } from "express";
import {
  getNews,
  searchNews,
  getCategoryNews,
} from "../controllers/news.controller";

const router = Router();

router.get("/", getNews);
router.get("/search", searchNews);
router.get("/category/:category", getCategoryNews);

export default router;
```

```ts
// server/src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import newsRoutes from "./routes/news.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/news", newsRoutes);

export default app;
```

## Example GNews Service Logic
The backend should use the current provider docs to choose valid endpoints and parameters. Conceptually:

```ts
const url = new URL(
  `${process.env.GNEWS_BASE_URL}/top-headlines`
);

url.searchParams.set("apikey", process.env.GNEWS_API_KEY!);
url.searchParams.set("category", "technology");

// Add only parameters supported by the current endpoint and plan.
const response = await fetch(url, {
  signal: AbortSignal.timeout(10_000),
});
```
Do not log this URL because it contains the API key. Verify exact endpoint parameters, categories, pagination, rate limits, and plan availability in https://docs.gnews.io/.

## Example Backend Response
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "article-1",
        "title": "Example headline",
        "description": "Example description",
        "imageUrl": null,
        "articleUrl": "https://example.com/article",
        "publishedAt": "2026-10-02T08:00:00Z",
        "sourceName": "Example Publisher",
        "sourceUrl": "https://example.com"
      }
    ],
    "totalArticles": null,
    "page": 1,
    "pageSize": 12
  }
}
```
Example only. Keep `totalArticles` nullable if a true total is unavailable.

## CORS and Development Proxy
When frontend and backend use different ports, configure backend CORS to allow the frontend origin. In production, avoid unrestricted CORS. Alternatively, configure Vite to proxy `/api` to the backend and call `/api/news` from the frontend.

## Error Handling
The backend should translate provider errors into safe NewsHub errors:
```json
{
  "success": false,
  "error": {
    "code": "NEWS_PROVIDER_UNAVAILABLE",
    "message": "News is temporarily unavailable. Please try again."
  }
}
```
The frontend should show a retry option and must not display stack traces or secrets.

## Sorting and Pagination Caveats
- Sorting may apply only to the currently loaded articles unless the provider supports server-side sorting.
- Local pagination can only divide articles already fetched.
- Reset the page after a new search or category.
- Do not invent a total result count when the provider does not supply one.

## End-to-End Checklist
- [ ] Backend starts with valid environment configuration
- [ ] Health route succeeds
- [ ] Frontend can call backend news route
- [ ] Backend can reach GNews
- [ ] Provider fields are normalized
- [ ] Search query is encoded and validated
- [ ] Categories are validated
- [ ] Missing images/descriptions are handled
- [ ] Refresh and error states work
- [ ] Invalid key/rate limits/timeouts are handled
- [ ] GNews key is not visible in frontend code/network requests
- [ ] Production HTTPS and CORS are configured

## References
- GNews: https://gnews.io/
- GNews documentation: https://docs.gnews.io/
- React: https://react.dev/
- Express: https://expressjs.com/
- Vite: https://vite.dev/guide/
