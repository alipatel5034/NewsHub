# NewsHub — Backend README

## Purpose
The backend is a Node.js/Express service. It validates frontend requests, calls GNews with a server-side API key, normalizes the response, and returns consistent JSON.

## Stack
- Node.js + TypeScript
- Express
- Zod for input/environment validation
- Helmet for security headers
- `express-rate-limit`
- Native `fetch` or another maintained HTTP client
- Vitest + Supertest

## Responsibilities
1. Validate environment variables and user input.
2. Provide health, news, search, category, and trending routes.
3. Keep the GNews API key server-side.
4. Call GNews and normalize article data.
5. Handle timeouts, malformed responses, network errors, and provider limits.
6. Return consistent JSON.
7. Configure CORS, security headers, and rate limiting.
8. Optionally cache eligible responses when permitted by provider terms.

## Suggested Structure
```text
server/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts
    ├── server.ts
    ├── config/
    │   ├── env.ts
    │   └── trending-topics.ts
    ├── routes/
    │   ├── health.routes.ts
    │   ├── news.routes.ts
    │   └── trending.routes.ts
    ├── controllers/
    ├── services/
    │   └── gnews.service.ts
    ├── schemas/
    ├── mappers/
    ├── middleware/
    └── types/
```

## Environment
Create `server/.env`:
```dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GNEWS_API_KEY=replace_with_your_real_key
GNEWS_BASE_URL=https://gnews.io/api/v4
REQUEST_TIMEOUT_MS=10000
```
Keep `.env` out of Git. Commit only placeholder values in `.env.example`. Fail startup clearly if the key is missing, but never print the key.

## Proposed NewsHub Routes
These are application routes, not GNews endpoints.

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/news` | Default/top-headline feed |
| GET | `/api/news/search?q=...` | Search |
| GET | `/api/news/category/:category` | Category feed |
| GET | `/api/news/trending` | Configured topic shortcuts |

Validate `q`, category, `page`, `pageSize`, and `sort`. Use a sensible maximum page size, such as 24. Only pass country/language/category/sort parameters supported by the selected GNews endpoint and subscription.

## Normalized Article Type
```ts
export type NewsArticle = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  articleUrl: string;
  publishedAt: string | null;
  sourceName: string;
  sourceUrl: string | null;
};
```
Treat optional fields as nullable. Use a canonical article URL as a preferred deduplication key where appropriate.

## Response Contract
Success:
```json
{
  "success": true,
  "data": {
    "articles": [],
    "totalArticles": null,
    "page": 1,
    "pageSize": 12
  }
}
```
Error:
```json
{
  "success": false,
  "error": {
    "code": "NEWS_PROVIDER_UNAVAILABLE",
    "message": "News is temporarily unavailable. Please try again."
  }
}
```
Keep response shapes consistent.

## GNews Service
The service should read the key from validated environment configuration, construct the correct endpoint, set supported parameters, use a timeout, check response status, validate JSON, map article fields, and convert provider failures to safe internal errors.

Typical endpoint patterns include `/api/v4/top-headlines` and `/api/v4/search`; verify current details at:
- https://gnews.io/
- https://docs.gnews.io/

Never log a full request URL if it contains the API key.

## Pagination and Sorting
Use provider pagination only when supported by the endpoint/plan. Otherwise paginate the fetched batch locally. Never claim local pagination reveals unfetched articles. Sort by valid `publishedAt` timestamps and place invalid/missing dates last. Reset to page one after a new search or category.

## Trending Route
A configurable topic list may return:
```json
{
  "success": true,
  "data": {
    "topics": ["Artificial Intelligence", "Cricket", "Business", "Space", "Technology", "Climate"]
  }
}
```
These are curated search shortcuts, not measured real-time trends.

## Security and Error Handling
- Validate inputs and limit query length.
- Use Helmet, rate limiting, HTTPS, and restricted CORS.
- Never expose secrets, stack traces, or raw provider error details to clients.
- Use safe external URLs and avoid rendering untrusted provider content as HTML.
- Respect provider terms and quotas.

Suggested status mapping:
- `400`: invalid input
- `404`: unknown route
- `429`: backend rate limit or suitable provider-limit mapping
- `502`: upstream provider failure
- `504`: upstream timeout
- `500`: unexpected server failure

Suggested error codes: `INVALID_QUERY`, `NEWS_PROVIDER_RATE_LIMITED`, `NEWS_PROVIDER_UNAVAILABLE`, `NEWS_PROVIDER_TIMEOUT`, `INTERNAL_SERVER_ERROR`.

## Development and Tests
Suggested local backend: `http://localhost:5000`
Health route: `http://localhost:5000/api/health`

Scripts to define in `package.json`:
```bash
npm run dev
npm run build
npm start
npm run test
```

Test health, valid/invalid queries, categories, provider mapping, missing fields, rate limits, timeouts, consistent errors, unknown routes, and secret redaction.

## Completion Checklist
- [ ] Environment validation works
- [ ] API key stays on server
- [ ] Health/news/search/category routes work
- [ ] Inputs are validated
- [ ] Provider response is normalized
- [ ] Missing fields are safe
- [ ] Provider failures/timeouts are handled
- [ ] CORS and rate limits are configured
- [ ] Error responses are consistent
- [ ] Tests cover key paths
