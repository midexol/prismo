// ─────────────────────────────────────────────────────────────────────────────
// InputPanel.tsx — Text-Only Modern Form (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

interface InputPanelProps {
  onSubmit: (url: string, niche: string, angle: string) => void;
  isLoading: boolean;
}

const ANGLES = [
  { id: 'contrarian', label: 'Contrarian & Bold', desc: 'Challenges common myths' },
  { id: 'tactical', label: 'Tactical & How-To', desc: 'Step-by-step framework' },
  { id: 'story', label: 'Story & Narrative', desc: 'Personal experience open' },
  { id: 'data', label: 'Data & Metric Heavy', desc: 'Proof & number led' },
];

export const InputPanel: React.FC<InputPanelProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl]         = useState('');
  const [niche, setNiche]     = useState('');
  const [selectedAngle, setSelectedAngle] = useState('contrarian');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !niche.trim() || isLoading) return;
    onSubmit(url.trim(), niche.trim(), selectedAngle);
  };

  return (
    <div className="w-full max-w-3xl mx-auto clay-card p-6 md:p-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Input grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* YouTube URL input */}
          <div className="space-y-2">
            <label htmlFor="youtube-url" className="block text-[11px] font-bold text-[#8C8782] uppercase tracking-wider">
              YouTube Video URL
            </label>
            <input
              id="youtube-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
              className="w-full clay-input px-4 py-3.5 text-xs placeholder:text-[#8C8782]/60 disabled:opacity-50"
              required
            />
          </div>

          {/* Creator niche input */}
          <div className="space-y-2">
            <label htmlFor="creator-niche" className="block text-[11px] font-bold text-[#8C8782] uppercase tracking-wider">
              Your Audience / Niche
            </label>
            <input
              id="creator-niche"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. 'SaaS founders & tech creators'"
              disabled={isLoading}
              className="w-full clay-input px-4 py-3.5 text-xs placeholder:text-[#8C8782]/60 disabled:opacity-50"
              required
            />
          </div>

        </div>

        {/* Angle Selector */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#8C8782] uppercase tracking-wider">
              Content Angle Strategy
            </label>
            <span className="text-[10px] text-brand-periwinkle font-semibold">Prismo Smart Targeting</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ANGLES.map((angle) => {
              const isSelected = selectedAngle === angle.id;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => setSelectedAngle(angle.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-periwinkle/15 border-brand-periwinkle text-[#F5F4F1] shadow-sm'
                      : 'bg-clay-input border-clay-border text-[#8C8782] hover:border-clay-border/80 hover:text-[#F5F4F1]'
                  }`}
                >
                  <div className="text-xs font-bold">{angle.label}</div>
                  <div className="text-[10px] opacity-70 leading-tight mt-1">{angle.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="repurpose-button"
          disabled={isLoading || !url.trim() || !niche.trim()}
          className="w-full clay-button py-4 text-xs uppercase tracking-wider font-extrabold
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Prismo AI Analyzing Transcript...' : 'Split Video Into 3 Platforms'}
        </button>

      </form>

      <p className="text-center text-xs text-[#8C8782]">
        Supports any public YouTube video with subtitles or captions enabled.
      </p>
    </div>
  );
};
