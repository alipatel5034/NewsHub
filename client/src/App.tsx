import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header.js";
import { MobileNav } from "./components/MobileNav.js";
import { HomePage } from "./routes/HomePage.js";
import { CategoryView } from "./routes/CategoryView.js";
import { SearchPage } from "./routes/SearchPage.js";
import { BookmarksPage } from "./routes/BookmarksPage.js";
import { AboutPage } from "./routes/AboutPage.js";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-paper-light dark:bg-paper-dark text-ink dark:text-ink-bright transition-colors pb-16 md:pb-0">
        <Header />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryView />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>

        {/* Vintage Footer */}
        <footer className="w-full bg-paper dark:bg-paper-cardDark border-t border-ink/20 dark:border-ink-gold/30 py-8 px-4 text-center mt-12 transition-colors">
          <div className="max-w-7xl mx-auto space-y-3">
            <p className="font-serif text-sm font-bold text-ink dark:text-ink-gold">
              NEWSHUB — THE VINTAGE ENGRAVED DIGITAL PRESS
            </p>
            <p className="text-xs text-ink-muted dark:text-ink-soft max-w-xl mx-auto leading-relaxed">
              Full-stack news aggregation application retrieving live articles from GNews API. All trademarks and publisher metadata belong to their respective owners.
            </p>
            <div className="text-[11px] font-mono text-ink-muted dark:text-ink-soft pt-2 border-t border-ink/10 dark:border-ink-gold/15">
              © {new Date().getFullYear()} NewsHub • Built with React, Express, TypeScript & Tailwind CSS
            </div>
          </div>
        </footer>

        <MobileNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
