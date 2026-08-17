// ─────────────────────────────────────────────────────────────────────────────
// AudienceResonanceAnalyzer.tsx — Text-Only Predictive Virality (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

interface MetricItem {
  name: string;
  score: number; // 0 to 100
  detail: string;
}

interface ResonanceData {
  viralityScore: number;
  voiceMatchPct: number;
  retentionQuotes: { timestamp: string; text: string; angle: string }[];
  platformFit: {
    twitter: { score: number; scoreLabel?: string; reason: string };
    linkedin: { score: number; scoreLabel?: string; reason: string };
    youtube_shorts: { score: number; scoreLabel?: string; reason: string };
  };
  hookMetrics: MetricItem[];
}

interface AudienceResonanceAnalyzerProps {
  transcriptPreview?: string;
  niche?: string;
}

export const AudienceResonanceAnalyzer: React.FC<AudienceResonanceAnalyzerProps> = ({
  transcriptPreview: _transcriptPreview = "In this video we analyze why traditional content repurposing fails...",
  niche = "Tech & Creator Economy",
}) => {
  const [selectedTab, setSelectedTab] = useState<'resonance' | 'quotes' | 'platformFit'>('resonance');

  const mockResonance: ResonanceData = {
    viralityScore: 92,
    voiceMatchPct: 88,
    hookMetrics: [
      { name: 'Curiosity Gap', score: 94, detail: 'Strong opening tension that forces readers to pause scrolling' },
      { name: 'Contrarian Boldness', score: 89, detail: 'Challenges conventional wisdom in your niche directly' },
      { name: 'Skimmability & Whitespace', score: 95, detail: 'Short line lengths optimized for mobile readers' },
      { name: 'Call-to-Action Resonance', score: 86, detail: 'Spurs active comment discussions rather than passive likes' },
    ],
    retentionQuotes: [
      { timestamp: '01:14', text: 'Creators waste 4 hours converting 1 video into posts because they do it manually without memory.', angle: 'X Thread Hook' },
      { timestamp: '03:42', text: 'The secret is not generating more content—it is teaching your AI agent what your voice sounds like.', angle: 'LinkedIn Post' },
      { timestamp: '06:05', text: 'Stop copy-pasting transcripts. Extract the 1 frame that makes people question their strategy.', angle: 'YT Shorts 3s Interrupt' },
    ],
    platformFit: {
      twitter: { score: 96, scoreLabel: 'Highest Fit', reason: 'High density of punchy insights; ideal for rapid retweets and quote tweets.' },
      linkedin: { score: 88, scoreLabel: 'Strong Fit', reason: 'Storytelling framing resonates with B2B founders and industry peers.' },
      youtube_shorts: { score: 91, scoreLabel: 'Viral Potential', reason: 'Strong visual visual cues and 3-second hook pattern interrupt.' },
    },
  };

  return (
    <div className="clay-card p-6 md:p-8 space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-brand-periwinkle mb-1">
            Prismo Audience Resonance Engine
          </div>
          <h3 className="text-xl font-bold font-display text-[#F5F4F1]">
            Predictive Virality & Voice Alignment Analysis
          </h3>
          <p className="text-xs text-[#8C8782] mt-1">
            Real-time simulation based on your niche: <span className="text-[#F5F4F1] font-semibold">{niche}</span>
          </p>
        </div>

        {/* Big Virality Score Badge */}
        <div className="flex items-center gap-4 bg-[#1B1918] border border-white/5 px-5 py-3 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8782] block">Predicted Virality</span>
            <span className="text-2xl font-black font-display text-emerald-400">{mockResonance.viralityScore}/100</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setSelectedTab('resonance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'resonance'
              ? 'bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/30'
              : 'text-[#8C8782] hover:text-[#F5F4F1]'
          }`}
        >
          Hook Impact Score
        </button>

        <button
          onClick={() => setSelectedTab('quotes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'quotes'
              ? 'bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/30'
              : 'text-[#8C8782] hover:text-[#F5F4F1]'
          }`}
        >
          High-Retention Nuggets ({mockResonance.retentionQuotes.length})
        </button>

        <button
          onClick={() => setSelectedTab('platformFit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'platformFit'
              ? 'bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/30'
              : 'text-[#8C8782] hover:text-[#F5F4F1]'
          }`}
        >
          Platform Suitability
        </button>
      </div>

      {/* TAB 1: Resonance Metrics */}
      {selectedTab === 'resonance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up">
          {mockResonance.hookMetrics.map((m, idx) => (
            <div key={idx} className="clay-input p-4 border border-white/5 bg-[#1B1918]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#F5F4F1]">{m.name}</span>
                <span className="text-xs font-mono font-extrabold text-brand-periwinkle">{m.score}%</span>
              </div>
              <div className="w-full h-2 bg-[#252220] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-brand-indigo to-brand-periwinkle rounded-full transition-all duration-500"
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <p className="text-[11px] text-[#8C8782] leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Extracted Golden Nuggets */}
      {selectedTab === 'quotes' && (
        <div className="space-y-3 animate-fade-up">
          {mockResonance.retentionQuotes.map((q, idx) => (
            <div key={idx} className="clay-input p-4 border border-white/5 bg-[#1B1918] flex items-start gap-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/20 shrink-0">
                {q.timestamp}
              </span>
              <div className="space-y-1 flex-1">
                <p className="text-xs font-medium text-[#F5F4F1] italic">"{q.text}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8C8782] uppercase tracking-wider">Repurposed As:</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{q.angle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Platform Fit Matrix */}
      {selectedTab === 'platformFit' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up">
          <div className="clay-input p-4 bg-[#1B1918] space-y-2 border border-sky-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-sky-400">X (Twitter)</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{mockResonance.platformFit.twitter.score}/100</span>
            </div>
            <p className="text-xs text-[#8C8782] leading-relaxed">{mockResonance.platformFit.twitter.reason}</p>
          </div>

          <div className="clay-input p-4 bg-[#1B1918] space-y-2 border border-indigo-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-400">LinkedIn</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{mockResonance.platformFit.linkedin.score}/100</span>
            </div>
            <p className="text-xs text-[#8C8782] leading-relaxed">{mockResonance.platformFit.linkedin.reason}</p>
          </div>

          <div className="clay-input p-4 bg-[#1B1918] space-y-2 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-purple-400">YouTube Shorts</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{mockResonance.platformFit.youtube_shorts.score}/100</span>
            </div>
            <p className="text-xs text-[#8C8782] leading-relaxed">{mockResonance.platformFit.youtube_shorts.reason}</p>
          </div>
        </div>
      )}

    </div>
  );
};
