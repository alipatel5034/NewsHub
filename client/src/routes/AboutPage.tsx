import React, { useState } from "react";
import { CategoryNav } from "../components/CategoryNav.js";
import { Key, ShieldCheck, Server, Globe, Cpu, Check, Copy } from "lucide-react";

export const AboutPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const snippet = `GNEWS_API_KEY=your_actual_gnews_api_key_here`;

  const copySnippet = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <CategoryNav />

      <main className="max-w-4xl mx-auto px-4 py-8 text-ink dark:text-ink-bright">
        {/* Masthead Header */}
        <div className="text-center pb-6 border-b border-ink/20 dark:border-ink-gold/30 mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
            About NewsHub & Architecture Guide
          </h2>
          <p className="text-sm text-ink-muted dark:text-ink-gold font-serif italic">
            Full-stack news aggregation powered by Express, React, TypeScript, and GNews API.
          </p>
        </div>

        {/* API Key Insertion Guide */}
        <section className="bg-amber-50/60 dark:bg-paper-cardDark border-2 border-amber-500/40 dark:border-ink-gold/40 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Key className="w-6 h-6 text-amber-700 dark:text-ink-gold" />
            <h3 className="font-serif text-xl font-bold text-ink dark:text-ink-gold">
              How to Insert Your GNews API Key
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-ink-soft dark:text-ink-bright/80 leading-relaxed mb-4">
            NewsHub keeps your GNews API key securely on the backend server (`server/.env`) to prevent exposing your private key in client-side JavaScript or network requests.
          </p>

          <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm font-sans mb-5">
            <li className="p-2.5 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <strong className="text-ink dark:text-ink-gold">Step 1 — Obtain a GNews API Key:</strong> Sign up for a free key at{" "}
              <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 dark:text-blue-400 font-semibold">
                gnews.io
              </a>{" "}
              (100 requests/day, no credit card required).
            </li>
            <li className="p-2.5 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <strong className="text-ink dark:text-ink-gold">Step 2 — Open the Environment File:</strong> Locate the file{" "}
              <code className="bg-paper px-1.5 py-0.5 rounded text-ink font-mono text-xs">server/.env</code> in your project repository.
            </li>
            <li className="p-2.5 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <strong className="text-ink dark:text-ink-gold">Step 3 — Replace the Placeholder:</strong> Change <code className="bg-paper px-1.5 py-0.5 rounded text-ink font-mono text-xs">GNEWS_API_KEY=YOUR_GNEWS_API_KEY_HERE</code> to your real key.
            </li>
            <li className="p-2.5 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <strong className="text-ink dark:text-ink-gold">Step 4 — Save & Restart:</strong> Save the file. The Node Express server will automatically reload with live headlines.
            </li>
          </ol>

          <div className="flex items-center justify-between bg-white dark:bg-paper-dark p-3 border border-ink/20 dark:border-ink-gold/30 rounded font-mono text-xs">
            <span className="text-ink dark:text-ink-gold font-bold">{snippet}</span>
            <button
              onClick={copySnippet}
              className="flex items-center gap-1 text-xs px-3 py-1.5 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark font-sans font-bold rounded hover:opacity-90 transition-opacity cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Key Variable"}</span>
            </button>
          </div>
        </section>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-white dark:bg-paper-cardDark border border-ink/15 dark:border-ink-gold/20 rounded-lg">
            <div className="flex items-center gap-2 font-serif text-lg font-bold mb-3 text-ink dark:text-ink-gold">
              <Globe className="w-5 h-5 text-amber-700 dark:text-ink-gold" />
              <span>Frontend Layer</span>
            </div>
            <ul className="text-xs space-y-2 text-ink-soft dark:text-ink-bright/80 list-disc list-inside">
              <li>Built with <strong>React 18</strong> &amp; <strong>TypeScript</strong> for type safety.</li>
              <li>Bundled with <strong>Vite</strong> for rapid hot reloading.</li>
              <li>Vintage Engraved design system with <strong>Tailwind CSS</strong>.</li>
              <li>LocalStorage persistence for saved bookmarks and light/dark theme.</li>
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-paper-cardDark border border-ink/15 dark:border-ink-gold/20 rounded-lg">
            <div className="flex items-center gap-2 font-serif text-lg font-bold mb-3 text-ink dark:text-ink-gold">
              <Server className="w-5 h-5 text-amber-700 dark:text-ink-gold" />
              <span>Backend Layer</span>
            </div>
            <ul className="text-xs space-y-2 text-ink-soft dark:text-ink-bright/80 list-disc list-inside">
              <li><strong>Node.js</strong> + <strong>Express</strong> REST API server.</li>
              <li>Input parameter validation with <strong>Zod</strong> schemas.</li>
              <li>Security headers with <strong>Helmet</strong> &amp; rate limiting with <strong>express-rate-limit</strong>.</li>
              <li>Secret key shielding, upstream error mapping &amp; timeout management.</li>
            </ul>
          </div>
        </div>

        {/* Security Statement */}
        <div className="p-5 bg-white dark:bg-paper-cardDark border border-ink/15 dark:border-ink-gold/20 rounded-lg flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-serif font-bold text-sm text-ink dark:text-ink-bright mb-1">
              Data Privacy & Publisher Link Protocol
            </h4>
            <p className="text-xs text-ink-soft dark:text-ink-bright/70 leading-relaxed">
              NewsHub respects publisher rights by linking directly to original article sources. Full copyrighted text is never stored or redistributed. All article cards display original publisher metadata.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
