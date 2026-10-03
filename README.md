# 📰 NewsHub — Vintage Engraved Full-Stack News Aggregator

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GNews API](https://img.shields.io/badge/GNews_API-v4-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<p align="center">
  <b>A full-stack, editorial news website blending authentic vintage press aesthetics with high-speed API processing.</b>
  <br />
  <i>Search, filter, bookmark, and discover live global news dispatches in a digital press interface.</i>
</p>

</div>

---

## 📌 Executive Summary

**NewsHub** addresses modern digital information overload by reimagining how readers consume online news. Instead of chaotic feed layouts and overwhelming ad popups, NewsHub delivers live news headlines from **GNews API** through an exquisite **Vintage Engraved Press UI** inspired by 19th-century newspaper mastheads.

Behind the editorial design lies a robust **Express + TypeScript backend** that shields secret API credentials, validates user queries with Zod schemas, enforces rate limiting, and normalizes external article metadata into a unified client schema.

---

## ✨ Key Features

- 🏛️ **Vintage Engraved UI/UX**: Custom paper & iron-gall ink design system featuring *Fraunces* serif headlines, *Inter* body typography, double-rule engraved mastheads, and blend-mode paper textures.
- ⚡ **Full-Stack REST Architecture**: Express backend handles external GNews API requests, preventing API key exposure in client-side code.
- 🔍 **Real-Time Search**: Instant keyword search with URL query synchronization (`/search?q=...`).
- 🏷️ **Categorized Feed Dispatches**: Browse 9 distinct news categories (General, World, Nation, Business, Technology, Entertainment, Sports, Science, Health).
- 🔥 **Curated Trending Topics**: One-click shortcuts for popular global subjects (#ArtificialIntelligence, #SpaceExploration, #ClimateAction, etc.).
- 🔖 **LocalStorage Bookmarks Archive**: Save dispatches for offline reading; saved items persist across browser sessions (`newshub:bookmarks:v1`).
- 🌗 **Light & Dark Mode**: Persistent theme switcher featuring Vintage Engraved Paper (Light) and Iron-Gall Dark Slate & Emerald Gold (Dark).
- 🛡️ **Fail-Safe Sample Mode**: Intelligent fallback mechanism that delivers realistic sample headlines if an API key is missing or quota is reached, ensuring 100% uptime.
- 📖 **Quick Preview & Direct Publisher Link**: Article preview modal with custom image fallbacks, bookmark controls, share links, and safe external publisher redirection (`target="_blank"` with `rel="noopener noreferrer"`).

---

## 📐 System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    React 18 Frontend                        │
│                                                             │
│  React Router DOM • Tailwind CSS • Lucide Icons • Hooks     │
│  Home | Categories | Search | Bookmarks Archive | About     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express Backend Server                    │
│                                                             │
│  Zod Validation • Helmet Security • Rate Limiting           │
│  Environment Config • Article Schema Normalizer             │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS (Server-Side Key)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       GNews API v4                          │
│                                                             │
│  /v4/top-headlines  •  /v4/search                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend UI** | React 18 + TypeScript | Component-driven, typed user interface |
| **Build System** | Vite | Lightning-fast HMR and bundle optimization |
| **Styling** | Tailwind CSS + PostCSS | Custom design tokens, typography, and responsive layouts |
| **Icons** | Lucide React | Minimalist UI vector icons |
| **Routing** | React Router DOM v6 | Seamless multi-view SPA navigation |
| **Backend Runtime** | Node.js + Express | RESTful API server |
| **Backend Language**| TypeScript | Strict typings and modular server architecture |
| **Validation** | Zod | Request query parameter & environment validation |
| **Security** | Helmet + CORS + Rate Limit| HTTP header shielding and DDoS/Quota protection |
| **News Provider** | GNews API v4 | Up-to-date international news headlines |
| **Persistence** | LocalStorage | Browser storage for bookmarks & theme preferences |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/alipatel5034/NewsHub.git
cd NewsHub
```

### 2️⃣ Install Dependencies
```bash
# Install root, backend, and frontend packages
npm run install:all
```
*(Or install manually: `cd server && npm install`, then `cd client && npm install`)*

### 3️⃣ Configure Environment Variables
Navigate to `server/` and create your `.env` file (or use `.env.example`):
```dotenv
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GNEWS_API_KEY=YOUR_GNEWS_API_KEY_HERE
GNEWS_BASE_URL=https://gnews.io/api/v4
REQUEST_TIMEOUT_MS=10000
```
> 💡 **Get a Free GNews API Key:** Register at [gnews.io](https://gnews.io/) (100 requests/day, no credit card required) and replace `YOUR_GNEWS_API_KEY_HERE`.

### 4️⃣ Run the Application

#### Start the Backend Server (Port 5000):
```bash
cd server
npm run dev
```

#### Start the Frontend Web App (Port 5173):
```bash
cd client
npm run dev
```

Open your browser at **`http://localhost:5173`** 🚀

---

## 📡 API Endpoints Reference

The Express backend exposes clean, structured API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & API key configuration state |
| `GET` | `/api/news` | Default top headlines news feed |
| `GET` | `/api/news/category/:category` | Category-filtered news feed (`technology`, `business`, etc.) |
| `GET` | `/api/news/search?q=...` | Keyword search across news articles |
| `GET` | `/api/news/trending` | Returns curated trending topics list |

---

## 🔒 Security & Key Shielding Architecture

NewsHub adheres to production security best practices:
1. **Zero Secret Exposure**: The GNews API key is stored exclusively in `server/.env` and is **never** sent to the client browser or included in frontend bundles.
2. **CORS Restriction**: The backend restricts cross-origin requests to configured client domains (`CLIENT_ORIGIN`).
3. **Helmet Security**: Injects security headers including XSS Protection, No-Sniff, and Frameguard.
4. **Rate Limiting**: Protects backend routes against abuse using `express-rate-limit`.

---

## 🏆 Hackathon Highlights & Innovation

- **Design Originality**: Moves away from generic SaaS templates by delivering a refined **Engraved Digital Press** experience.
- **Resilient Fallback Engineering**: Operates gracefully even without network connectivity or API keys via intelligent sample mapping.
- **Type-Safe Full Stack**: Shared data models between Express controllers and React hooks eliminate runtime contract mismatches.

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<div align="center">
  <b>Built with passion for the Hackathon by Ali Patel</b>
  <br />
  ⭐ If you like NewsHub, give it a star on GitHub!
</div>
