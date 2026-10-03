# NewsHub — Technology Stack

## Project Overview
NewsHub is a full-stack news website that retrieves articles from GNews and presents them with search, categories, bookmarks, date sorting, pagination, trending-topic shortcuts, light/dark mode, refresh, and responsive layouts.

## Selected Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + TypeScript | Interactive, reusable UI with static typing |
| Build tool | Vite | Development server and production builds |
| Styling | Tailwind CSS | Responsive layouts and consistent styling |
| Icons | Lucide React | Consistent interface icons |
| Routing | React Router | Home, Search, Bookmarks, and About views |
| Frontend HTTP | Native `fetch` | Calls the NewsHub backend |
| Backend runtime | Node.js | Runs server-side code |
| Backend framework | Express | Routes and middleware |
| Backend language | TypeScript | Typed backend logic and data models |
| Validation | Zod | Validates query parameters and environment variables |
| Security headers | Helmet | Adds common HTTP security headers |
| Rate limiting | `express-rate-limit` | Helps limit excessive requests |
| News provider | GNews API | Article metadata and publisher links |
| Persistence | Browser LocalStorage | Bookmarks and theme preference on one browser/device |
| Tests | Vitest, React Testing Library, Supertest | Utility, component, and backend route tests |
| Collaboration | Git + GitHub | Version control and teamwork |

## Why This Stack?
- React is suitable for reusable article cards, search controls, filters, and navigation.
- TypeScript helps catch common data and component errors.
- Vite offers a quick development workflow.
- Tailwind CSS supports responsive, consistent styling.
- Express keeps the GNews key on the server and centralizes validation and error handling.
- Zod validates user input.
- LocalStorage avoids a database for the first version.

## Database Decision
A database is not required initially: GNews supplies article data, while LocalStorage saves bookmarks and theme preferences. Add PostgreSQL or MongoDB later only if you need accounts, cross-device bookmarks, or shared user data.

## Architecture
```text
Browser: React + TypeScript + Tailwind
            | HTTPS / JSON
            v
NewsHub Backend: Node.js + Express + TypeScript
            | HTTPS; secret key stays server-side
            v
GNews API
```

## Suggested Repository Layout
```text
newshub/
├── README.md
├── package.json
├── .gitignore
├── client/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── routes/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── utils/
│       └── styles/
└── server/
    ├── package.json
    ├── .env.example
    └── src/
        ├── config/
        ├── routes/
        ├── controllers/
        ├── services/
        ├── schemas/
        ├── mappers/
        ├── middleware/
        └── types/
```

## Environment and Secrets
Example backend environment:
```dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GNEWS_API_KEY=replace_with_your_real_key
GNEWS_BASE_URL=https://gnews.io/api/v4
REQUEST_TIMEOUT_MS=10000
```
Store real values in `server/.env`, never commit it, and never put the GNews key in frontend code or a `VITE_*` variable. Commit only a placeholder `.env.example`.

Suggested `.gitignore`:
```gitignore
node_modules/
dist/
build/
.env
.env.*
!.env.example
coverage/
.DS_Store
```

## Testing
- Vitest: sorting, pagination, and storage utilities.
- React Testing Library: search, bookmarks, themes, and UI states.
- Supertest: backend routes, validation, and provider errors.
- Manual checks: responsive layouts and end-to-end workflows.

## Deployment
Deploy the frontend to a static host and the backend to a Node-compatible host, or use a platform supporting both. Configure the production backend URL and server-side secrets through the host settings. Use HTTPS and restrict CORS to the frontend origin.

## Important GNews Note
Verify current GNews endpoints, parameters, categories, article freshness, quotas, pagination support, and content-use terms before building or deploying.

## Documentation
- GNews: https://gnews.io/
- GNews docs: https://docs.gnews.io/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Vite: https://vite.dev/guide/
- Tailwind CSS: https://tailwindcss.com/docs
- Node.js: https://nodejs.org/docs/latest/api/
- Express: https://expressjs.com/
- Zod: https://zod.dev/
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Supertest: https://github.com/ladjs/supertest
