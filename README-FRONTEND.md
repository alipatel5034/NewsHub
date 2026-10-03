# NewsHub — Frontend README

## Purpose
The frontend is the user-facing part of NewsHub. It displays articles returned by the NewsHub backend and supports search, categories, bookmarks, date sorting, pagination, trending-topic shortcuts, light/dark mode, refresh, and responsive design.

## Stack
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Native `fetch`
- LocalStorage
- Vitest + React Testing Library

## Responsibilities
1. Render reusable pages and components.
2. Fetch news through the NewsHub backend.
3. Display article title, image, description, source, date, and original link when available.
4. Support search and category navigation.
5. Sort the currently loaded articles by date.
6. Paginate only results actually available to the frontend.
7. Save/remove bookmarks in LocalStorage.
8. Persist theme preference.
9. Show trending-topic shortcuts that launch searches.
10. Refresh the current feed.
11. Handle loading, empty, missing-image, and error states.
12. Adapt to mobile, tablet, and desktop.

## Pages
- **Home:** categories, trending topics, news feed, sorting, pagination, refresh.
- **Search Results:** query heading, matching articles, sorting, pagination, empty/error states.
- **Category View:** same news grid filtered to a selected category.
- **Bookmarks:** saved articles with remove action and empty state.
- **About:** project overview, technology stack, and GNews attribution/context.

## Components and Modules
Suggested components: `Header`, `MobileNav`, `SearchBar`, `CategoryNav`, `TrendingTopics`, `NewsCard`, `NewsGrid`, `SortControl`, `Pagination`, `ThemeToggle`, `RefreshButton`, `LoadingState`, `EmptyState`, `ErrorState`.

Suggested hooks: `useNews`, `useBookmarks`, `useTheme`.

Suggested modules:
- `services/newsApi.ts` — calls backend routes.
- `types/news.ts` — article and response types.
- `utils/date.ts` — date formatting/sorting.
- `utils/pagination.ts` — local pagination.
- `utils/storage.ts` — safe LocalStorage helpers.

## Suggested Structure
```text
client/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── routes/
    │   ├── HomePage.tsx
    │   ├── SearchPage.tsx
    │   ├── BookmarksPage.tsx
    │   └── AboutPage.tsx
    ├── components/
    ├── hooks/
    ├── services/
    │   └── newsApi.ts
    ├── types/
    │   └── news.ts
    ├── utils/
    └── styles/
        └── index.css
```

## Article Data Contract
The frontend should consume the backend's normalized model rather than depend on raw GNews fields.

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

Missing images and descriptions are normal; show a fallback image and omit unavailable text.

## Calling the Backend
Create `client/src/services/newsApi.ts`:
```ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function getNews(params: {
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest";
}) {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.pageSize !== undefined) query.set("pageSize", String(params.pageSize));
  if (params.sort) query.set("sort", params.sort);

  const response = await fetch(`${API_BASE_URL}/api/news?${query.toString()}`);
  if (!response.ok) throw new Error("Unable to load news. Please try again.");
  return response.json();
}
```
The backend must implement this route. In production, set `VITE_API_BASE_URL` to the deployed backend URL. This is public configuration, not a secret.

## Search and Categories
- Submit on Enter or Search click; avoid API calls on every keystroke.
- Use `URLSearchParams` to encode queries.
- Reset pagination when the query or category changes.
- Validate categories against the backend's supported list.
- Display a useful no-results state.

## Sorting and Pagination
Sort valid `publishedAt` timestamps newest-first or oldest-first. Place missing/invalid dates after valid dates. Clarify when sorting applies only to the loaded batch. Do not imply local pagination can access articles that were never fetched.

## Bookmarks
Use a versioned LocalStorage key such as `newshub:bookmarks:v1`.
- Add/remove bookmarks and prevent duplicates.
- Restore them after reload.
- Handle malformed stored JSON safely.
- Store only fields needed to render a saved card.
Bookmarks remain on the current browser/device; they do not sync across devices.

## Theme
Use `newshub:theme:v1`.
- Provide a visible light/dark toggle.
- Respect system preference on first visit if no choice is saved.
- Persist explicit user choice.
- Ensure readable contrast and visible keyboard focus in both themes.

## Trending Topics
Start with a configurable list such as Artificial Intelligence, Cricket, Business, Space, Technology, and Climate. Clicking a topic should launch a search. A curated list is not the same as measured real-time trends.

## Refresh and UI States
Refresh the current query/category and show a busy state. Avoid stale requests overwriting newer search results; use `AbortController` or request IDs where appropriate. Support loading, success, empty, error, missing-image, and refresh states.

## Responsive and Accessible Design
- Mobile: one-column cards and compact navigation.
- Tablet: two columns where space permits.
- Desktop: two or three columns based on available width.
- Use consistent image ratios and `object-fit: cover`.
- Provide accessible labels, keyboard focus, and touch-friendly controls.
- Do not rely only on hover; respect reduced-motion settings.

## Frontend Environment
Example `client/.env.local`:
```dotenv
VITE_API_BASE_URL=http://localhost:5000
```
Never create `VITE_GNEWS_API_KEY`; frontend environment variables are bundled into public client assets.

## Tests
Test loading/success/empty/error states, search submission, category/page reset, date sorting, bookmark persistence, theme persistence, fallback images, pagination bounds, and keyboard use.

## Completion Checklist
- [ ] Home feed loads from backend
- [ ] Search and categories work
- [ ] Original article links work
- [ ] Bookmarks persist
- [ ] Theme preference persists
- [ ] Sorting and pagination work within available results
- [ ] Trending topics launch searches
- [ ] Refresh shows loading and handles failure
- [ ] Mobile/tablet/desktop layouts work
- [ ] No GNews secret is exposed in browser code
