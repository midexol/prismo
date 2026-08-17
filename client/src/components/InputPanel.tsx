// ─────────────────────────────────────────────────────────────────────────────
// InputPanel.tsx — Claymorphism Theme with Content Angle Selector
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Youtube, Sparkles, User, SlidersHorizontal, Flame, BookOpen, Target, BarChart2 } from 'lucide-react';

interface InputPanelProps {
  onSubmit: (url: string, niche: string, angle: string) => void;
  isLoading: boolean;
}

const ANGLES = [
  { id: 'contrarian', label: 'Contrarian & Bold', icon: Flame, desc: 'Challenges common myths' },
  { id: 'tactical', label: 'Tactical & How-To', icon: Target, desc: 'Step-by-step framework' },
  { id: 'story', label: 'Story & Narrative', icon: BookOpen, desc: 'Personal experience open' },
  { id: 'data', label: 'Data & Metric Heavy', icon: BarChart2, desc: 'Proof & number led' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* YouTube URL input */}
          <div className="space-y-2">
            <label htmlFor="youtube-url" className="block text-[11px] font-bold text-clay-muted uppercase tracking-wider">
              YouTube Video URL
            </label>
            <div className="relative">
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
                className="w-full clay-input pl-12 pr-4 py-3.5 text-xs placeholder:text-clay-muted/60 disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Creator niche input */}
          <div className="space-y-2">
            <label htmlFor="creator-niche" className="block text-[11px] font-bold text-clay-muted uppercase tracking-wider">
              Your Audience / Niche
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-brand-periwinkle" />
              </div>
              <input
                id="creator-niche"
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. 'SaaS founders & tech creators'"
                disabled={isLoading}
                className="w-full clay-input pl-12 pr-4 py-3.5 text-xs placeholder:text-clay-muted/60 disabled:opacity-50"
                required
              />
            </div>
          </div>

        </div>

        {/* Angle Selector (Unique Prismo Feature) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-clay-muted uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-periwinkle" />
              Choose Content Angle
            </label>
            <span className="text-[10px] text-brand-periwinkle font-semibold">Prismo Smart Targeting</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ANGLES.map((angle) => {
              const Icon = angle.icon;
              const isSelected = selectedAngle === angle.id;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => setSelectedAngle(angle.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-periwinkle/15 border-brand-periwinkle text-clay-fg shadow-sm'
                      : 'bg-clay-input border-clay-border text-clay-muted hover:border-clay-border/80 hover:text-clay-fg'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-periwinkle' : 'text-clay-muted'}`} />
                    {isSelected && <span className="w-2 h-2 rounded-full bg-brand-periwinkle animate-live" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{angle.label}</div>
                    <div className="text-[10px] opacity-70 leading-tight mt-0.5">{angle.desc}</div>
                  </div>
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
          className="w-full clay-button py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-extrabold
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Prismo Mind Analyzing Transcript...' : 'Split & Simulate Virality'}
        </button>

      </form>

      <p className="text-center text-xs text-clay-muted">
        Works with any public YouTube URL with captions or auto-generated subtitles.
      </p>
    </div>
  );
};
