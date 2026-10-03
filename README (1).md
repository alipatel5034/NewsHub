# NewsHub --- API-Based News Website

> A responsive news aggregation web application that fetches articles
> from the **GNews API** and presents them through searchable,
> category-based feeds, with bookmarks, light/dark mode, date sorting,
> pagination, trending topics, and manual refresh.

------------------------------------------------------------------------

## Table of Contents

1.  [Project Overview](#1-project-overview)
2.  [Objectives](#2-objectives)
3.  [Features and Scope](#3-features-and-scope)
4.  [Recommended Technology Stack](#4-recommended-technology-stack)
5.  [System Architecture](#5-system-architecture)
6.  [How the Application Works](#6-how-the-application-works)
7.  [GNews API Integration](#7-gnews-api-integration)
8.  [Frontend Design and Screens](#8-frontend-design-and-screens)
9.  [Backend Design](#9-backend-design)
10. [API Routes](#10-api-routes)
11. [Pagination, Sorting, and Trending
    Logic](#11-pagination-sorting-and-trending-logic)
12. [Bookmarks and Theme
    Preferences](#12-bookmarks-and-theme-preferences)
13. [Suggested Project Structure](#13-suggested-project-structure)
14. [Environment Variables](#14-environment-variables)
15. [Installation and Local Setup](#15-installation-and-local-setup)
16. [Development Commands](#16-development-commands)
17. [Error Handling and Reliability](#17-error-handling-and-reliability)
18. [Security and Privacy](#18-security-and-privacy)
19. [Responsive Design Requirements](#19-responsive-design-requirements)
20. [Testing Plan](#20-testing-plan)
21. [Deployment Plan](#21-deployment-plan)
22. [Team Responsibilities](#22-team-responsibilities)
23. [Three-Week Implementation
    Roadmap](#23-three-week-implementation-roadmap)
24. [Acceptance Criteria](#24-acceptance-criteria)
25. [Known Limitations](#25-known-limitations)
26. [Future Enhancements](#26-future-enhancements)
27. [Useful Resources](#27-useful-resources)

------------------------------------------------------------------------

## 1. Project Overview

**Project name:** NewsHub\
**Project type:** Full-stack, API-based news website\
**Primary news provider:** GNews API\
**Frontend:** React, TypeScript, Vite, and Tailwind CSS\
**Backend:** Node.js, TypeScript, and Express\
**Initial storage:** Browser LocalStorage for bookmarks and theme
preference\
**Database:** Not required for the first version

NewsHub retrieves news articles from the GNews API and displays them in
a clean, responsive interface. Users can browse categories, search for
topics, sort articles by publication date, move between pages, save
bookmarks, switch between light and dark themes, view a trending-topics
section, and manually refresh the news feed.

The application will link to the original publisher's article. It will
not attempt to copy or host full copyrighted news articles.

### Problem statement

Readers often need to visit multiple websites to find news about
different topics. NewsHub provides a single interface for discovering
and organizing news returned by a news API.

### Proposed solution

Build a full-stack web application that: - Retrieves article metadata
from GNews. - Keeps the GNews API key on the server. - Provides search
and category filters. - Presents article cards with available images,
headlines, descriptions, sources, and publication dates. - Offers date
sorting, pagination, refresh, bookmarks, theme switching, and
trending-topic shortcuts. - Handles API errors, empty results, missing
fields, and loading states clearly.

------------------------------------------------------------------------

## 2. Objectives

1.  Learn how to integrate a third-party REST API into a web
    application.
2.  Understand the frontend/backend request-response flow.
3.  Build a responsive user interface using reusable components.
4.  Implement search, filtering, sorting, and pagination.
5.  Store user preferences and bookmarks locally.
6.  Protect secret API credentials by using server-side environment
    variables.
7.  Provide graceful loading, empty, and error states.
8.  Create a project that can be demonstrated, documented, tested, and
    deployed.

------------------------------------------------------------------------

## 3. Features and Scope

### Core features

  -----------------------------------------------------------------------
  Feature                 Description             Priority
  ----------------------- ----------------------- -----------------------
  Home feed               Displays news articles  Must have
                          fetched from GNews      

  Category navigation     Lets users browse       Must have
                          available news          
                          categories              

  Search                  Retrieves articles      Must have
                          matching a keyword or   
                          phrase                  

  Article cards           Displays headline,      Must have
                          source, date, image,    
                          and description when    
                          available               

  Read article            Opens the original      Must have
                          publisher's article     

  Light/dark mode         Allows users to switch  Must have
                          themes                  

  Bookmarks               Saves and removes       Must have
                          articles for later      
                          reading                 

  Responsive layout       Adapts to desktop,      Must have
                          tablet, and mobile      
                          screens                 

  Sort by date            Sorts the currently     Must have
                          available result set by 
                          publication date        

  Pagination              Lets users browse       Must have
                          article results in      
                          pages                   

  Trending topics         Shows topic shortcuts   Must have
                          based on a defined,     
                          transparent method      

  Manual refresh          Requests fresh results  Must have
                          when the user clicks    
                          Refresh                 

  Loading state           Shows feedback while    Must have
                          articles are being      
                          retrieved               

  Empty/error states      Explains when no        Must have
                          articles are found or a 
                          request fails           
  -----------------------------------------------------------------------

### Important note about "trending"

The first version will implement a **Trending Topics** panel using a
small configurable list of popular search topics (for example,
Artificial Intelligence, Cricket, Business, Space, and Climate).
Selecting a topic performs a GNews search for it.

This is a topic-discovery feature, not proof that those topics are
objectively trending in real time. If the team later wants data-driven
trends, it can calculate them from anonymized in-app searches or another
suitable data source. Do not label a curated list as real-time trends.

### Non-goals for the first version

-   User registration and login.
-   A custom database.
-   Writing or hosting full news articles.
-   A machine-learning recommendation engine.
-   A custom news publishing or admin system.
-   Guaranteed real-time coverage of every publisher.

These can be considered after the main application is stable.

------------------------------------------------------------------------

## 4. Recommended Technology Stack

The project uses a TypeScript-based React frontend and a
TypeScript-based Express backend. This gives the team one main
programming language across the application while adding type checking
and a clear separation of responsibilities.

  -----------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -----------------------
  Frontend framework      React                   Builds interactive,
                                                  reusable UI components

  Frontend language       TypeScript              Helps detect data and
                                                  component errors during
                                                  development

  Frontend build tool     Vite                    Runs the development
                                                  server and builds
                                                  production assets

  Styling                 Tailwind CSS            Creates responsive
                                                  layouts and consistent
                                                  visual styling

  Icons                   Lucide React            Provides consistent
                                                  interface icons

  Routing                 React Router            Handles pages such as
                                                  Home, Bookmarks, and
                                                  About

  HTTP client             Native `fetch`          Calls the NewsHub
                                                  backend

  Backend runtime         Node.js                 Runs server-side
                                                  JavaScript/TypeScript

  Backend framework       Express                 Defines HTTP routes and
                                                  middleware

  Backend language        TypeScript              Provides typed
                                                  request/response
                                                  handling

  Input validation        Zod                     Validates query
                                                  parameters and
                                                  environment
                                                  configuration

  Security headers        Helmet                  Adds common HTTP
                                                  security headers

  Rate limiting           `express-rate-limit`    Helps reduce excessive
                                                  requests to backend
                                                  routes

  API provider            GNews API               Supplies news article
                                                  data

  Initial persistence     Browser LocalStorage    Saves bookmarks and
                                                  theme preference on the
                                                  same browser

  Testing                 Vitest, React Testing   Tests frontend behavior
                          Library, Supertest      and backend routes

  Version control         Git and GitHub          Supports collaboration
                                                  and change tracking

  Deployment              Any suitable static     Publishes the app
                          frontend host plus      
                          Node-compatible backend 
                          host                    
  -----------------------------------------------------------------------

### Why this stack?

-   **React** is well suited to an interface made from repeated article
    cards, navigation elements, filters, and reusable screens.
-   **TypeScript** helps catch common mistakes and documents the shape
    of article data.
-   **Vite** provides a straightforward development workflow.
-   **Tailwind CSS** makes responsive design and consistent styling
    easier.
-   **Express** creates a small backend that can protect the API key and
    normalize provider responses.
-   **Zod** validates user-supplied search parameters before they reach
    the news provider.
-   **LocalStorage** avoids the need to build a database for a
    student-project version.
-   **Vitest and Supertest** provide a practical way to test UI logic
    and backend routes.

### Database decision

A database is **not required** for the initial version. Articles are
fetched from GNews, while bookmarks and theme preferences are stored in
the user's browser.

If accounts, cross-device bookmarks, or shared preferences are added
later, introduce a database such as PostgreSQL or MongoDB and an
authentication system. Do not add a database merely to store every API
response unless there is a clear requirement.

------------------------------------------------------------------------

## 5. System Architecture

``` text
┌─────────────────────────────────────────────┐
│                 User's Browser              │
│                                             │
│  React + TypeScript + Tailwind CSS          │
│  Home | Search | Categories | Bookmarks     │
│  Theme toggle | Sort | Pagination | Refresh │
└──────────────────────┬──────────────────────┘
                       │ HTTPS / JSON
                       ▼
┌─────────────────────────────────────────────┐
│              NewsHub Backend                │
│              Node.js + Express              │
│                                             │
│  Validate inputs                            │
│  Apply request limits                       │
│  Read API key from environment              │
│  Call GNews                                 │
│  Normalize article response                 │
│  Return safe, consistent JSON               │
└──────────────────────┬──────────────────────┘
                       │ HTTPS
                       │ API key kept server-side
                       ▼
┌─────────────────────────────────────────────┐
│                  GNews API                  │
│                                             │
│  Search and headline endpoints              │
│  Article metadata and publisher links       │
└─────────────────────────────────────────────┘
```

### Key design principle

The browser should call the NewsHub backend, not include the secret
GNews API key in frontend source code. The backend is responsible for
contacting GNews.

This architecture also gives the team one place to validate requests,
handle provider errors, standardize data, and potentially add caching
later.

------------------------------------------------------------------------

## 6. How the Application Works

### Standard page load

1.  A user opens NewsHub.
2.  React displays the page shell and a loading state.
3.  The frontend calls `GET /api/news`.
4.  Express validates the request and contacts GNews using the
    server-side API key.
5.  GNews returns a JSON response.
6.  The backend maps the provider's response into the application's
    standard article format.
7.  The backend sends JSON to the frontend.
8.  React renders article cards.
9.  The user can search, select a category, sort, paginate, bookmark,
    change theme, or refresh.

### Search flow

1.  The user enters a search term.
2.  The frontend validates that the term is not empty.
3.  The frontend requests `GET /api/news/search?q=...`.
4.  The backend validates and encodes the search query.
5.  The backend requests matching articles from GNews.
6.  The frontend displays the results and resets pagination to the first
    page.

### Category flow

1.  The user selects a category.
2.  The frontend requests the category-specific endpoint or search route
    supported by the provider.
3.  The backend maps the selected category to a supported GNews category
    or query.
4.  The frontend displays the returned articles.

### Refresh flow

1.  The user clicks **Refresh**.
2.  The frontend requests the same feed again.
3.  The UI shows a small refreshing indicator.
4.  The backend calls GNews again, subject to provider limits and any
    configured cache policy.
5.  The new response replaces the current feed.
6.  The frontend displays the update time and any error message if
    refreshing fails.

Refresh does not guarantee that the provider has new articles. It simply
requests the latest available response.

------------------------------------------------------------------------

## 7. GNews API Integration

### Provider

-   Provider: GNews
-   Documentation: <https://docs.gnews.io/>
-   Website and account/API key: <https://gnews.io/>

Create an account and obtain an API key. Check the provider's current
pricing, request limits, endpoint rules, country/language options, and
article availability before development and again before deployment.
Free-plan limits and data freshness can change.

### Expected article fields

GNews responses commonly contain article information such as: -
`title` - `description` - `content` (availability and completeness
depend on the plan and provider response) - `url` - `image` -
`publishedAt` - `source.name` - `source.url`

Treat optional fields as nullable. Do not assume every article includes
an image, description, or full content.

### Provider endpoints

The backend will use the endpoints and parameters supported by the
current GNews documentation. Typical endpoint patterns include:

-   Top headlines: `/api/v4/top-headlines`
-   Search: `/api/v4/search`

The exact query parameters must be confirmed in the current GNews
documentation. The backend should not assume that every country,
category, language, sort option, or pagination option is available on
every plan.

### Example provider request (conceptual)

``` text
GET https://gnews.io/api/v4/top-headlines?category=technology&apikey=SERVER_SIDE_KEY
```

This is an illustrative request shape. Add only parameters supported by
the current provider documentation and your subscription.

### Standard internal article model

The backend should return a stable article shape even if the provider
changes optional fields:

``` json
{
  "id": "stable-article-id",
  "title": "Example headline",
  "description": "Short article description, if available.",
  "imageUrl": "https://example.com/image.jpg",
  "articleUrl": "https://example.com/article",
  "publishedAt": "2026-10-02T08:00:00Z",
  "sourceName": "Example Publisher",
  "sourceUrl": "https://example.com"
}
```

This is example data only. The backend should map the actual GNews
response into this shape.

### Stable article IDs

Use the canonical article URL as the preferred deduplication key where
appropriate. A URL-derived ID can be generated on the backend. Do not
rely on the article title alone because multiple articles can have
similar titles.

### API quota management

-   Avoid calling GNews on every keystroke.
-   Debounce search input or submit only when the user presses
    Enter/clicks Search.
-   Do not refresh automatically at very short intervals.
-   Use a short server-side cache if suitable for the provider's terms
    and project requirements.
-   Show a friendly message when the upstream API returns a rate-limit
    response.
-   Do not expose the API key in error messages or logs.
-   Review GNews terms before caching or redistributing article data.

------------------------------------------------------------------------

## 8. Frontend Design and Screens

### 8.1 Shared application shell

The main layout should include: - NewsHub logo/name. - Main
navigation. - Search input and search button. - Theme toggle. - Refresh
button. - Responsive mobile navigation. - Main content region. - Footer
with project details and relevant links.

### 8.2 Home page

Suggested sections: 1. Header and search. 2. Category navigation. 3.
Trending topics. 4. Featured/top headlines. 5. Latest news grid. 6.
Sorting control. 7. Pagination controls. 8. Footer.

### 8.3 Category view

Reuses the same article grid and controls but filters the feed to a
selected category. Show the selected category in the page heading.

### 8.4 Search results

Show the search query and a result count when known. Include: - Loading
state. - No-results state. - Error state. - Article cards. - Date
sorting. - Pagination when applicable.

### 8.5 Bookmarks page

Display saved articles in the same card style as the main feed. Provide
a remove-bookmark action and a clear empty state when no articles are
saved.

### 8.6 About page

Explain the project, technologies, API provider, and team. Do not imply
that NewsHub creates or independently verifies the articles.

### 8.7 Article card

Each card should display: - Image or fallback placeholder. - Headline. -
Short description if available. - Publisher name. - Publication date. -
Bookmark control. - "Read article" link to the original publisher.

External links should use safe link attributes when opened in a new tab,
such as `rel="noopener noreferrer"` with `target="_blank"`.

### 8.8 UI states

Every data-driven screen should handle: - Initial loading. - Refresh in
progress. - Successful results. - Empty results. - Request failure. -
Missing image. - Missing description. - Invalid search input.

------------------------------------------------------------------------

## 9. Backend Design

### Responsibilities

The backend will: 1. Load configuration from environment variables. 2.
Validate request parameters. 3. Apply rate limiting. 4. Call GNews from
the server. 5. Normalize provider article data. 6. Handle provider
errors and timeouts. 7. Return consistent JSON. 8. Avoid leaking
credentials or internal error details. 9. Optionally cache recent
responses to reduce repeated provider requests.

### Recommended backend modules

-   **Routes:** Define API paths and connect them to handlers.
-   **Controllers:** Parse validated requests and return HTTP responses.
-   **Services:** Contain the GNews request logic.
-   **Schemas:** Validate query parameters and configuration.
-   **Mappers:** Convert provider data into the NewsHub article model.
-   **Middleware:** Handle errors, request limits, and not-found routes.
-   **Configuration:** Load and validate environment variables.

Keep the provider API key in the backend environment only.

### Response format

Successful response:

``` json
{
  "success": true,
  "data": {
    "articles": [],
    "totalArticles": 0,
    "page": 1,
    "pageSize": 12
  }
}
```

Error response:

``` json
{
  "success": false,
  "error": {
    "code": "NEWS_PROVIDER_UNAVAILABLE",
    "message": "News is temporarily unavailable. Please try again."
  }
}
```

Examples show the application's proposed response contract, not actual
API results.

### Error mapping

-   Invalid input: `400 Bad Request`
-   Missing or invalid server configuration: fail server startup or
    return a safe `500` response
-   Provider rate limit: map to a safe `429` or appropriate gateway
    response
-   Provider unavailable/timeout: `502` or `504`
-   Unknown route: `404`
-   Unexpected server error: `500`

The client should receive a helpful message, not raw stack traces or
secret values.

------------------------------------------------------------------------

## 10. API Routes

These are the proposed **NewsHub backend routes**. They are not GNews
endpoints.

  --------------------------------------------------------------------------------
  Method                  Route                            Purpose
  ----------------------- -------------------------------- -----------------------
  `GET`                   `/api/health`                    Confirms that the
                                                           backend is running

  `GET`                   `/api/news`                      Retrieves the
                                                           default/top-headlines
                                                           feed

  `GET`                   `/api/news/search?q=...`         Searches news by
                                                           keyword

  `GET`                   `/api/news/category/:category`   Retrieves news for a
                                                           supported category

  `GET`                   `/api/news/trending`             Returns the configured
                                                           trending-topic list

  `GET`                   `/api/config`                    Returns only safe
                                                           public frontend
                                                           configuration, if
                                                           needed
  --------------------------------------------------------------------------------

### Common query parameters

  ---------------------------------------------------------------------------
  Parameter               Example                     Purpose
  ----------------------- --------------------------- -----------------------
  `q`                     `artificial intelligence`   Search term

  `category`              `technology`                Category filter

  `page`                  `1`                         Requested UI page

  `pageSize`              `12`                        Number of displayed
                                                      articles per page

  `sort`                  `newest`                    Sort direction for the
                                                      available article set

  `country`               `in`                        Optional country
                                                      filter, only if
                                                      supported/configured

  `lang`                  `en`                        Optional language
                                                      filter, only if
                                                      supported/configured
  ---------------------------------------------------------------------------

The backend must validate values and only pass supported parameters to
GNews. It should cap `pageSize` at a sensible maximum such as 24.

### Example calls

``` text
GET /api/news?page=1&pageSize=12&sort=newest
GET /api/news/search?q=artificial%20intelligence&page=1&pageSize=12
GET /api/news/category/technology?page=1&pageSize=12
GET /api/news/trending
GET /api/health
```

------------------------------------------------------------------------

## 11. Pagination, Sorting, and Trending Logic

### Pagination

The frontend should show a manageable number of article cards per page,
for example 12.

There are two possible approaches:

**A. Provider pagination:** If the current GNews endpoint and plan
support the required pagination parameters, request the desired page
from GNews through the backend.

**B. Frontend pagination:** If only a limited result set is available,
fetch a supported batch and divide that batch into pages in the
frontend.

The implementation must not pretend that local pagination provides
access to articles that were never fetched. The UI should show the
number of pages that can actually be browsed. Reset the page to 1 when
the search term or category changes.

### Sorting by date

Sort articles by `publishedAt` in descending order for **Newest first**,
or ascending order for **Oldest first**.

-   Parse dates safely.
-   Put articles with missing/invalid dates after articles with valid
    dates.
-   Keep the sort label visible.
-   Clarify that local sorting applies to the articles currently loaded
    unless the provider supports server-side sorting.

### Trending topics

Initial implementation: return a configurable list of topics, such as: -
Artificial Intelligence - Cricket - Technology - Business - Space -
Climate

Clicking a topic starts a search for that term. Store the topic list in
one configuration file so it can be changed easily.

Optional later implementation: count in-app topic searches over a
defined time window, with privacy-conscious aggregation. This would
indicate what users of NewsHub search for, not what the whole world is
searching for.

### Manual refresh

-   Disable the button while a refresh is already in progress.
-   Show a spinner or "Refreshing..." label.
-   Re-request the current category/search feed.
-   Preserve the current search and category.
-   Reset or preserve the page consistently (recommended: return to page
    1 if the result set may have changed).
-   Display the last successful refresh time.
-   Show a retry message if the request fails.

------------------------------------------------------------------------

## 12. Bookmarks and Theme Preferences

### Bookmarks

For the first version, store bookmarks in LocalStorage.

Suggested key:

``` text
newshub:bookmarks:v1
```

Save only the fields needed to display a bookmark, such as article ID,
title, description, image URL, article URL, publication date, and source
name.

Requirements: - Add a bookmark. - Remove a bookmark. - Prevent
duplicates. - Persist after a page refresh. - Show saved items on the
Bookmarks page. - Handle invalid or outdated LocalStorage data without
crashing.

**Limitation:** LocalStorage is specific to the browser and device.
Bookmarks will not automatically synchronize between devices and may be
removed when browser storage is cleared.

### Light/dark mode

Suggested key:

``` text
newshub:theme:v1
```

Requirements: - Provide a visible theme toggle. - Use consistent design
tokens for both themes. - Keep readable contrast in light and dark
modes. - Persist the selected theme. - Respect the operating-system
preference on first visit if no preference has been saved. - Avoid a
noticeable flash of the wrong theme where practical.

------------------------------------------------------------------------

## 13. Suggested Project Structure

A monorepo with separate `client` and `server` folders is recommended.

``` text
newshub/
├── README.md
├── .gitignore
├── package.json
├── client/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── public/
│   │   └── images/
│   │       └── news-placeholder.svg
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── routes/
│       │   ├── HomePage.tsx
│       │   ├── BookmarksPage.tsx
│       │   ├── SearchPage.tsx
│       │   └── AboutPage.tsx
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── MobileNav.tsx
│       │   ├── SearchBar.tsx
│       │   ├── CategoryNav.tsx
│       │   ├── TrendingTopics.tsx
│       │   ├── NewsCard.tsx
│       │   ├── NewsGrid.tsx
│       │   ├── SortControl.tsx
│       │   ├── Pagination.tsx
│       │   ├── ThemeToggle.tsx
│       │   ├── RefreshButton.tsx
│       │   ├── LoadingState.tsx
│       │   ├── EmptyState.tsx
│       │   └── ErrorState.tsx
│       ├── hooks/
│       │   ├── useNews.ts
│       │   ├── useBookmarks.ts
│       │   └── useTheme.ts
│       ├── services/
│       │   └── newsApi.ts
│       ├── types/
│       │   └── news.ts
│       ├── utils/
│       │   ├── date.ts
│       │   ├── pagination.ts
│       │   └── storage.ts
│       └── styles/
│           └── index.css
└── server/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── app.ts
        ├── server.ts
        ├── config/
        │   └── env.ts
        ├── routes/
        │   ├── health.routes.ts
        │   ├── news.routes.ts
        │   └── trending.routes.ts
        ├── controllers/
        │   └── news.controller.ts
        ├── services/
        │   └── gnews.service.ts
        ├── schemas/
        │   └── news.schema.ts
        ├── mappers/
        │   └── article.mapper.ts
        ├── middleware/
        │   ├── error-handler.ts
        │   └── not-found.ts
        ├── config/
        │   └── trending-topics.ts
        └── types/
            └── news.ts
```

This is a proposed structure. The team may adjust it as implementation
evolves. Avoid creating empty abstractions that do not yet serve a
purpose.

------------------------------------------------------------------------

## 14. Environment Variables

Create `server/.env` locally. Never commit it to Git.

Example `server/.env.example`:

``` dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GNEWS_API_KEY=replace_with_your_gnews_api_key
GNEWS_BASE_URL=https://gnews.io/api/v4
REQUEST_TIMEOUT_MS=10000
```

### Variable meanings

-   `NODE_ENV`: Current environment.
-   `PORT`: Backend port.
-   `CLIENT_ORIGIN`: Allowed frontend origin for local CORS
    configuration.
-   `GNEWS_API_KEY`: Secret key obtained from GNews.
-   `GNEWS_BASE_URL`: Base URL for GNews API endpoints.
-   `REQUEST_TIMEOUT_MS`: Maximum time the backend waits for the
    upstream request.

The exact environment loader and validation should be implemented in the
backend. The server should fail early with a clear developer-facing
message if the API key is missing, but must never print the key itself.

For deployment, configure environment variables through the hosting
provider's secret/configuration settings.

### Git ignore

The root `.gitignore` should include at least:

``` gitignore
node_modules/
dist/
build/
.env
.env.*
!.env.example
coverage/
.DS_Store
```

If the project uses environment files with a different layout, ensure
every file containing a real key is excluded from version control.

------------------------------------------------------------------------

## 15. Installation and Local Setup

### Prerequisites

Install: - Node.js LTS and npm. - Git. - A code editor such as Visual
Studio Code. - A GNews account/API key.

Verify installation:

``` bash
node --version
npm --version
git --version
```

### Setup overview

The exact commands depend on the package scripts created during
implementation. The following is the intended workflow.

1.  Clone or download the repository.
2.  Install root/client/server dependencies.
3.  Copy `server/.env.example` to `server/.env`.
4.  Add your own GNews API key to `server/.env`.
5.  Start the backend.
6.  Start the frontend.
7.  Open the local Vite URL shown in the terminal.
8.  Test the health route and news feed.

Example:

``` bash
git clone <your-repository-url>
cd newshub
```

Create environment configuration:

``` bash
# macOS/Linux
cp server/.env.example server/.env
```

On Windows PowerShell:

``` powershell
Copy-Item server/.env.example server/.env
```

Edit `server/.env` and add the real key locally.

### Local addresses (suggested)

-   Frontend: `http://localhost:5173`
-   Backend: `http://localhost:5000`
-   Health check: `http://localhost:5000/api/health`

These ports are proposed defaults and may change with the
implementation.

------------------------------------------------------------------------

## 16. Development Commands

The repository should define predictable scripts. Suggested script
names:

### Root scripts

``` bash
npm run dev
npm run build
npm run test
npm run lint
```

The root `dev` script should start the frontend and backend together,
for example through a development-process utility. The exact
implementation must be added to `package.json`.

### Client scripts

``` bash
npm run dev
npm run build
npm run preview
npm run test
```

### Server scripts

``` bash
npm run dev
npm run build
npm start
npm run test
```

Do not document a command as working until its matching script has been
added to the relevant `package.json`.

------------------------------------------------------------------------

## 17. Error Handling and Reliability

### Frontend requirements

-   Show skeleton cards or a loading indicator while fetching.
-   Prevent duplicate submissions where appropriate.
-   Abort or ignore stale search requests when a newer search starts.
-   Show a clear empty state when the API returns no articles.
-   Show a retry action for recoverable failures.
-   Use a placeholder for broken or missing images.
-   Keep existing content visible during refresh when that improves the
    experience.
-   Do not show raw backend stack traces.

### Backend requirements

-   Validate user input.
-   Set an upstream request timeout.
-   Handle network errors and malformed provider responses.
-   Map provider errors to safe application messages.
-   Apply rate limiting.
-   Avoid logging secret values or full URLs containing API keys.
-   Return consistent JSON error shapes.
-   Keep CORS restricted to the configured frontend origin in
    production.
-   Optionally cache eligible requests to reduce quota use.

### Suggested error codes

  Code                           Meaning
  ------------------------------ ------------------------------------
  `INVALID_QUERY`                Search input is missing or invalid
  `NEWS_PROVIDER_RATE_LIMITED`   Provider request limit reached
  `NEWS_PROVIDER_UNAVAILABLE`    Provider could not be reached
  `NEWS_PROVIDER_TIMEOUT`        Provider request timed out
  `NO_ARTICLES_FOUND`            Search returned no articles
  `INTERNAL_SERVER_ERROR`        Unexpected server error

------------------------------------------------------------------------

## 18. Security and Privacy

1.  **Keep the GNews key on the backend.** Never put it in React code or
    a `VITE_*` variable.
2.  **Validate query parameters.** Set reasonable length limits and
    reject invalid page values.
3.  **Use HTTPS in production.**
4.  **Restrict CORS** to the deployed frontend origin.
5.  **Use Helmet and rate limiting** on the Express server.
6.  **Avoid leaking secrets** in logs, error responses, screenshots, or
    the README.
7.  **Do not commit `.env` files.**
8.  **Render article text as text**, not as untrusted HTML.
9.  **Use safe external links** when opening publisher pages in a new
    tab.
10. **Respect provider terms, rate limits, attribution requirements, and
    content-use restrictions.**
11. **Explain LocalStorage limitations.** Bookmarks and preferences are
    stored locally on the user's device.
12. If analytics are added later, minimize data collection and explain
    what is collected.

------------------------------------------------------------------------

## 19. Responsive Design Requirements

The layout should be tested at narrow mobile, tablet, laptop, and large
desktop widths.

Suggested behavior: - **Mobile:** Single-column article cards, compact
navigation, full-width search. - **Tablet:** Two-column news grid where
space permits. - **Desktop:** Three-column grid or a wider editorial
layout. - **Large desktop:** Constrain content width for readability
rather than stretching text across the full screen.

Other requirements: - Images use consistent aspect ratios and
`object-fit: cover`. - Buttons have comfortable touch targets. - Text
remains readable at browser zoom. - Keyboard focus is visible. - Form
fields have accessible labels. - Theme contrast remains readable in both
modes. - Navigation works without relying exclusively on hover. -
Respect reduced-motion preferences for decorative animations.

------------------------------------------------------------------------

## 20. Testing Plan

### Frontend tests

-   Home page displays loading, success, empty, and error states.
-   Search submits the expected query.
-   Changing categories resets pagination.
-   Sort controls order valid publication dates correctly.
-   Bookmarks can be added, removed, and restored after reload.
-   Theme choice persists after reload.
-   Missing images show a fallback.
-   Pagination does not display nonexistent pages.
-   Mobile navigation works with keyboard and touch.

### Backend tests

-   `/api/health` returns a success response.
-   Invalid search queries are rejected.
-   Category values are validated.
-   Provider article fields are mapped correctly.
-   Missing optional fields do not crash the mapper.
-   Provider rate-limit responses are handled safely.
-   Timeouts and network errors return consistent responses.
-   API keys do not appear in response bodies or logs.
-   Unknown routes return `404`.

### Manual test checklist

-   [ ] Start the app with a valid API key.
-   [ ] Confirm news appears on the home page.
-   [ ] Search for a known topic.
-   [ ] Select several categories.
-   [ ] Sort by newest and oldest.
-   [ ] Navigate forward and backward through pages.
-   [ ] Add and remove bookmarks.
-   [ ] Refresh the page and confirm bookmarks remain.
-   [ ] Switch themes and refresh the page.
-   [ ] Click Refresh and verify the loading state.
-   [ ] Test an empty search result.
-   [ ] Temporarily use an invalid API key and confirm a friendly error.
-   [ ] Test missing/broken images.
-   [ ] Test mobile and desktop layouts.
-   [ ] Confirm no API key is visible in frontend source or browser
    network requests to the GNews host.

------------------------------------------------------------------------

## 21. Deployment Plan

Deploy the frontend and backend separately or use a hosting platform
that supports both.

### Frontend

Build the React app:

``` bash
npm run build
```

Deploy the generated static assets from the client build directory to a
static hosting service. Configure the frontend's backend base URL for
the deployed environment.

### Backend

Deploy the Express application to a Node-compatible hosting service.
Configure: - `NODE_ENV=production` - `PORT` according to the host's
requirements - `CLIENT_ORIGIN` to the deployed frontend origin -
`GNEWS_API_KEY` as a secret environment variable - Other required
configuration values

### Before publishing

-   Test the production API URL.
-   Configure HTTPS.
-   Confirm CORS settings.
-   Confirm the GNews key is not bundled into frontend files.
-   Check provider terms for public deployment and the selected
    subscription.
-   Verify rate limits and usage expectations.
-   Add a README section for deployment details actually used by the
    team.

Do not commit production credentials to the repository.

------------------------------------------------------------------------

## 22. Team Responsibilities

For a four-person team, the work can be divided as follows:

  -----------------------------------------------------------------------
  Team role                           Responsibilities
  ----------------------------------- -----------------------------------
  Member 1 --- Frontend               React pages, article cards,
                                      navigation, responsive styling

  Member 2 --- Backend/API            Express routes, GNews integration,
                                      validation, error handling

  Member 3 --- Features               Search, category filters,
                                      bookmarks, theme, sorting,
                                      pagination, refresh

  Member 4 --- Integration/QA         Testing, accessibility checks,
                                      documentation, screenshots, report,
                                      presentation
  -----------------------------------------------------------------------

All members should understand the end-to-end request flow. Agree on the
article data model and backend response format before developing
frontend and backend modules independently.

------------------------------------------------------------------------

## 23. Three-Week Implementation Roadmap

### Week 1 --- Foundation and API

-   Confirm project requirements and API plan.
-   Create the repository and folder structure.
-   Set up React, Vite, TypeScript, and Tailwind CSS.
-   Set up Express and environment configuration.
-   Implement health and news routes.
-   Fetch GNews articles through the backend.
-   Render the first set of article cards.

**Milestone:** The homepage displays live API-backed article data.

### Week 2 --- Main Features

-   Add search and category navigation.
-   Add date sorting and pagination.
-   Add bookmarks using LocalStorage.
-   Add light/dark mode.
-   Add the trending-topics list.
-   Add manual refresh.
-   Implement loading, empty, and error states.

**Milestone:** All requested features work in the local application.

### Week 3 --- Quality and Submission

-   Test edge cases and API failure scenarios.
-   Improve responsive design and accessibility.
-   Add tests for core functions and routes.
-   Review secret handling and request limits.
-   Prepare project screenshots and documentation.
-   Deploy if required.
-   Prepare the demonstration and presentation.

**Milestone:** A tested, documented, presentation-ready project.

------------------------------------------------------------------------

## 24. Acceptance Criteria

The project can be considered complete when:

-   [ ] The app uses GNews through a server-side backend.
-   [ ] The API key is not exposed in frontend code.
-   [ ] The home page displays available news articles dynamically.
-   [ ] Search retrieves articles for a submitted query.
-   [ ] Category navigation loads the appropriate feed.
-   [ ] Cards show available title, image, description, source, and
    date.
-   [ ] Read links open the original article.
-   [ ] Light/dark mode works and persists.
-   [ ] Bookmarks can be added, removed, and restored after reload.
-   [ ] The layout adapts to mobile, tablet, and desktop.
-   [ ] Users can sort the loaded results by date.
-   [ ] Pagination works without implying unavailable results exist.
-   [ ] Trending-topic buttons run searches for their topics.
-   [ ] Manual refresh re-requests the current feed.
-   [ ] Loading, empty, missing-image, and error states are handled.
-   [ ] Invalid requests are rejected by the backend.
-   [ ] The README explains setup and configuration.
-   [ ] The app can be started using documented commands.

------------------------------------------------------------------------

## 25. Known Limitations

-   Available articles, freshness, categories, language filters, and
    request quotas depend on the selected GNews plan and current API
    behavior.
-   The provider may not supply an image, description, or full article
    content for every result.
-   A refresh requests data again but cannot guarantee that new stories
    exist.
-   Frontend pagination can only paginate articles that have been
    fetched.
-   Date sorting is only global if the application has access to the
    full result set or the provider supports server-side sorting.
-   Curated trending topics are shortcuts, not measured real-time
    trends.
-   LocalStorage bookmarks are limited to one browser/device and can be
    cleared by the user.
-   External publishers control the availability and content of linked
    articles.

------------------------------------------------------------------------

## 26. Future Enhancements

Potential improvements after the first version: - User accounts and
cloud-synced bookmarks. - A database for user preferences or carefully
managed cached metadata. - More advanced filters for supported countries
and languages. - A richer trending system based on a defined data
source. - Optional AI summaries, with clear labels and safeguards
against presenting summaries as the original article. - Saved
searches. - Keyboard shortcuts. - Progressive Web App (PWA) support. -
Accessibility audits and automated end-to-end tests. - A deployment
health dashboard and structured monitoring.

Add these only after the core features and reliability requirements are
complete.

------------------------------------------------------------------------

## 27. Useful Resources

-   **GNews website:** <https://gnews.io/>
-   **GNews documentation:** <https://docs.gnews.io/>
-   **React documentation:** <https://react.dev/>
-   **TypeScript documentation:** <https://www.typescriptlang.org/docs/>
-   **Vite documentation:** <https://vite.dev/guide/>
-   **Tailwind CSS documentation:** <https://tailwindcss.com/docs>
-   **Node.js documentation:** <https://nodejs.org/docs/latest/api/>
-   **Express documentation:** <https://expressjs.com/>
-   **Zod documentation:** <https://zod.dev/>
-   **Vitest documentation:** <https://vitest.dev/>
-   **React Testing Library:**
    <https://testing-library.com/docs/react-testing-library/intro/>
-   **Supertest:** <https://github.com/ladjs/supertest>

------------------------------------------------------------------------

## Project Summary

NewsHub is a full-stack news aggregation website built with **React,
TypeScript, Vite, Tailwind CSS, Node.js, Express, and the GNews API**.
It provides a responsive news feed with search, category browsing, date
sorting, pagination, trending-topic shortcuts, bookmarks, light/dark
mode, and manual refresh.

The initial version intentionally avoids a database: GNews supplies the
article data, while LocalStorage saves bookmarks and theme preferences
in the user's browser. The backend protects the API key, validates
requests, normalizes news data, and handles provider errors.

**Important implementation rule:** Verify all provider-specific
endpoints, parameters, plan limits, and content-use requirements against
the current GNews documentation before implementing or deploying the
application.
