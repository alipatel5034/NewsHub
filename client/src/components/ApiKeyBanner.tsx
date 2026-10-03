import React, { useState } from "react";
import { Key, ChevronDown, ChevronUp, CheckCircle, Copy, HelpCircle } from "lucide-react";

interface ApiKeyBannerProps {
  hasKey?: boolean;
}

export const ApiKeyBanner: React.FC<ApiKeyBannerProps> = ({ hasKey = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const envSnippet = `GNEWS_API_KEY=your_actual_gnews_api_key_here`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-paper dark:bg-paper-cardDark border-b border-ink/15 dark:border-ink-gold/20 text-xs text-ink dark:text-ink-bright py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Key className={`w-4 h-4 ${hasKey ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`} />
          <span className="font-semibold">
            {hasKey ? "GNews Live API Active" : "Sample News Mode Active (No GNews Key Detected)"}
          </span>
          <span className="hidden sm:inline text-ink-muted dark:text-ink-soft">
            — {hasKey ? "Fetching live headlines from GNews.io" : "Insert your free GNews API key in server/.env to get live news."}
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 font-medium underline text-ink dark:text-ink-gold hover:opacity-80 transition-opacity cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isOpen ? "Hide Key Instructions" : "How to insert API key?"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-ink/10 dark:border-ink-gold/15 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-ink-soft dark:text-ink-bright">
            <div className="p-3 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <span className="font-bold text-ink dark:text-ink-gold block mb-1">Step 1: Get a Free Key</span>
              Visit <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">gnews.io</a> and register for a free API key (takes ~30 seconds, 100 requests/day).
            </div>
            <div className="p-3 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <span className="font-bold text-ink dark:text-ink-gold block mb-1">Step 2: Open server/.env</span>
              Open the file <code className="bg-paper px-1 py-0.5 rounded text-ink font-mono text-[11px]">server/.env</code> in your NewsHub project directory.
            </div>
            <div className="p-3 bg-white dark:bg-paper-dark border border-ink/10 dark:border-ink-gold/20 rounded">
              <span className="font-bold text-ink dark:text-ink-gold block mb-1">Step 3: Paste Your Key</span>
              Replace <code className="bg-paper px-1 py-0.5 rounded text-ink font-mono text-[11px]">YOUR_GNEWS_API_KEY_HERE</code> with your actual key and save the file.
            </div>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-paper-dark p-2.5 border border-ink/15 dark:border-ink-gold/25 rounded font-mono text-[11px]">
            <span className="text-ink dark:text-ink-gold font-semibold">{envSnippet}</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs px-2 py-1 bg-ink text-paper-light dark:bg-ink-gold dark:text-paper-dark rounded hover:opacity-90 transition-opacity"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Format"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
