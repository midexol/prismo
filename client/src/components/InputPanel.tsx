// ─────────────────────────────────────────────────────────────────────────────
// InputPanel.tsx — Claymorphism Theme
// The form where the creator pastes their YouTube URL and describes their niche.
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
    <div className="w-full max-w-2xl mx-auto clay-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* YouTube URL input */}
        <div>
          <label htmlFor="youtube-url" className="block text-xs font-semibold text-clay-muted uppercase tracking-wider mb-2">
            YouTube Video URL
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Youtube className="w-5 h-5 text-red-400" />
            </div>
            <input
              id="youtube-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
              className="w-full clay-input pl-12 pr-4 py-3.5 text-sm
                         placeholder:text-clay-muted/60 disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Creator niche input */}
        <div>
          <label htmlFor="creator-niche" className="block text-xs font-semibold text-clay-muted uppercase tracking-wider mb-2">
            Your Target Audience / Niche
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-brand-periwinkle" />
            </div>
            <input
              id="creator-niche"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. 'SaaS founders & indie hackers building in public'"
              disabled={isLoading}
              className="w-full clay-input pl-12 pr-4 py-3.5 text-sm
                         placeholder:text-clay-muted/60 disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="repurpose-button"
          disabled={isLoading || !url.trim() || !niche.trim()}
          className="w-full clay-button py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-wider
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Prismo Mind Processing...' : 'Split Into 3 Platforms'}
        </button>

      </form>

      {/* Helpful hint */}
      <p className="text-center text-xs text-clay-muted mt-4">
        Supports any public YouTube video with subtitles or captions enabled.
      </p>
    </div>
  );
};
