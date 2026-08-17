// ─────────────────────────────────────────────────────────────────────────────
// AnalyticsDashboard.tsx — Text-Only Dedicated Intelligence View (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

interface AnalyticsDashboardProps {
  messageCount?: number;
  niche?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  messageCount = 14,
  niche: _niche = 'Tech & AI Creator',
}) => {
  return (
    <div className="space-y-6 animate-fade-up">

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="clay-card p-5 space-y-2 border border-white/5 bg-[#161514]">
          <div className="flex items-center justify-between text-[#8C8782] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Hours Saved</span>
          </div>
          <div className="text-3xl font-black font-display text-[#F5F4F1]">24.5 hrs</div>
          <p className="text-[11px] text-emerald-400 font-medium">
            +6.2 hrs this week
          </p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-white/5 bg-[#161514]">
          <div className="flex items-center justify-between text-[#8C8782] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Minds Memory Items</span>
          </div>
          <div className="text-3xl font-black font-display text-[#F5F4F1]">{messageCount} logged</div>
          <p className="text-[11px] text-purple-300 font-medium">
            Active persistent conversation
          </p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-white/5 bg-[#161514]">
          <div className="flex items-center justify-between text-[#8C8782] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Voice Alignment</span>
          </div>
          <div className="text-3xl font-black font-display text-emerald-400">94.2%</div>
          <p className="text-[11px] text-[#8C8782]">Matches your approved tone</p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-white/5 bg-[#161514]">
          <div className="flex items-center justify-between text-[#8C8782] text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Videos Repurposed</span>
          </div>
          <div className="text-3xl font-black font-display text-[#F5F4F1]">18 videos</div>
          <p className="text-[11px] text-amber-400 font-medium">54 platform drafts total</p>
        </div>

      </div>

      {/* Main Analysis Chart & Hook Memory Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left 2 Cols: Performance Breakdown */}
        <div className="md:col-span-2 clay-card p-6 space-y-5 border border-white/5 bg-[#161514]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#F5F4F1]">
                Cross-Platform Engagement Velocity
              </h3>
              <p className="text-xs text-[#8C8782]">Predicted performance across X vs LinkedIn vs YouTube Shorts</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/20">
              Live AI Metrics
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-sky-300">X (Twitter) Thread Reach Index</span>
                <span className="text-sky-300 font-mono">92/100</span>
              </div>
              <div className="w-full h-3 bg-[#1D1B1A] rounded-full overflow-hidden p-0.5 border border-white/5">
                <div className="h-full bg-sky-400 rounded-full w-[92%] transition-all duration-700" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-indigo-300">LinkedIn Longform Engagement</span>
                <span className="text-indigo-300 font-mono">86/100</span>
              </div>
              <div className="w-full h-3 bg-[#1D1B1A] rounded-full overflow-hidden p-0.5 border border-white/5">
                <div className="h-full bg-indigo-500 rounded-full w-[86%] transition-all duration-700" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-300">YouTube Shorts 30s Retention</span>
                <span className="text-purple-300 font-mono">95/100</span>
              </div>
              <div className="w-full h-3 bg-[#1D1B1A] rounded-full overflow-hidden p-0.5 border border-white/5">
                <div className="h-full bg-purple-500 rounded-full w-[95%] transition-all duration-700" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1D1B1A] border border-white/5 text-xs text-[#8C8782] leading-relaxed">
            <strong className="text-[#F5F4F1]">Minds Insight:</strong> Your audience responds 34% better to <span className="text-brand-periwinkle font-semibold">Contrarian statements</span> than question-style hooks. Prismo automatically prioritizes bold openings in future drafts.
          </div>
        </div>

        {/* Right 1 Col: Memory Pattern Matrix */}
        <div className="clay-card p-6 space-y-4 border border-white/5 bg-[#161514]">
          <div className="border-b border-white/5 pb-3">
            <h4 className="text-sm font-bold text-[#F5F4F1]">
              Learned Voice Memory
            </h4>
            <p className="text-[11px] text-[#8C8782]">Rules extracted from past approvals</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1B1918] border border-white/5">
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Hook Style</span>
              <p className="text-[#F5F4F1] font-medium">Contrarian bold claims over simple questions.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1B1918] border border-white/5">
              <span className="text-[10px] uppercase font-bold text-brand-periwinkle block mb-1">LinkedIn Format</span>
              <p className="text-[#F5F4F1] font-medium">1 sentence per line, heavy whitespace, no hashtags in body.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1B1918] border border-white/5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Shorts Script</span>
              <p className="text-[#F5F4F1] font-medium">First 3 seconds must include a visual pattern interrupt.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
