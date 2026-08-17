// ─────────────────────────────────────────────────────────────────────────────
// InputPanel.tsx
// The form where the creator pastes their YouTube URL and describes their niche.
// This is the first thing the user sees and interacts with.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Youtube, Sparkles, User } from 'lucide-react';

interface InputPanelProps {
  onSubmit: (url: string, niche: string) => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl]     = useState('');
  const [niche, setNiche] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !niche.trim() || isLoading) return;
    onSubmit(url.trim(), niche.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* YouTube URL input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Youtube className="w-5 h-5 text-red-400" />
          </div>
          <input
            id="youtube-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your YouTube URL here..."
            disabled={isLoading}
            className="w-full bg-slate-900/80 border border-slate-700 focus:border-blue-500
                       rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-100
                       placeholder:text-slate-500 focus:outline-none focus:ring-1
                       focus:ring-blue-500/50 transition-all disabled:opacity-50"
            required
          />
        </div>

        {/* Creator niche input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-purple-400" />
          </div>
          <input
            id="creator-niche"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Describe your niche — e.g. 'AI tools for indie hackers'"
            disabled={isLoading}
            className="w-full bg-slate-900/80 border border-slate-700 focus:border-purple-500
                       rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-100
                       placeholder:text-slate-500 focus:outline-none focus:ring-1
                       focus:ring-purple-500/50 transition-all disabled:opacity-50"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="repurpose-button"
          disabled={isLoading || !url.trim() || !niche.trim()}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold
                     text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                     hover:from-blue-500 hover:to-purple-500 text-white
                     shadow-lg shadow-blue-600/20 transition-all
                     hover:scale-[1.01] active:scale-[0.99]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Minds Agent is working...' : 'Repurpose This Video'}
        </button>

      </form>

      {/* Helpful hint */}
      <p className="text-center text-xs text-slate-500 mt-4">
        The video must be public and have captions/subtitles enabled.
      </p>
    </div>
  );
};
