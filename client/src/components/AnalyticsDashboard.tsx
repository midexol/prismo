// ─────────────────────────────────────────────────────────────────────────────
// AnalyticsDashboard.tsx — Prismo Dedicated Analysis & Intelligence View
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { TrendingUp, Clock, Brain, Layers, BarChart2, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface AnalyticsDashboardProps {
  messageCount?: number;
  niche?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  messageCount = 14,
  niche = 'Tech & AI Creator',
}) => {
  return (
    <div className="space-y-6 animate-fade-up">

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="clay-card p-5 space-y-2 border border-clay-border bg-[#23201F]">
          <div className="flex items-center justify-between text-clay-muted text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Hours Saved</span>
            <Clock className="w-4 h-4 text-brand-periwinkle" />
          </div>
          <div className="text-3xl font-black font-display text-clay-fg">24.5 hrs</div>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +6.2 hrs this week
          </p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-clay-border bg-[#23201F]">
          <div className="flex items-center justify-between text-clay-muted text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Minds Memory Items</span>
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black font-display text-clay-fg">{messageCount} logged</div>
          <p className="text-[11px] text-purple-300 font-medium">
            Active persistent conversation
          </p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-clay-border bg-[#23201F]">
          <div className="flex items-center justify-between text-clay-muted text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Voice Alignment</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-display text-emerald-400">94.2%</div>
          <p className="text-[11px] text-clay-muted">Matches your approved tone</p>
        </div>

        <div className="clay-card p-5 space-y-2 border border-clay-border bg-[#23201F]">
          <div className="flex items-center justify-between text-clay-muted text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Videos Repurposed</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-display text-clay-fg">18 videos</div>
          <p className="text-[11px] text-amber-400 font-medium">54 platform drafts total</p>
        </div>

      </div>

      {/* Main Analysis Chart & Hook Memory Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left 2 Cols: Performance Breakdown */}
        <div className="md:col-span-2 clay-card p-6 space-y-5 border border-clay-border bg-[#23201F]">
          <div className="flex items-center justify-between border-b border-clay-border/60 pb-4">
            <div>
              <h3 className="text-base font-bold text-clay-fg flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-periwinkle" />
                Cross-Platform Engagement Velocity
              </h3>
              <p className="text-xs text-clay-muted">Predicted performance across X vs LinkedIn vs YouTube Shorts</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/20">
              Live AI Metrics
            </span>
          </div>

          {/* Simulated chart bars */}
          <div className="space-y-4 pt-2">

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-sky-300">X (Twitter) Thread Reach Index</span>
                <span className="text-sky-300 font-mono">92/100</span>
              </div>
              <div className="w-full h-3 bg-clay-input rounded-full overflow-hidden p-0.5 border border-clay-border">
                <div className="h-full bg-sky-400 rounded-full w-[92%] transition-all duration-700" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-indigo-300">LinkedIn Longform Engagement</span>
                <span className="text-indigo-300 font-mono">86/100</span>
              </div>
              <div className="w-full h-3 bg-clay-input rounded-full overflow-hidden p-0.5 border border-clay-border">
                <div className="h-full bg-indigo-500 rounded-full w-[86%] transition-all duration-700" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-300">YouTube Shorts 30s Retention</span>
                <span className="text-purple-300 font-mono">95/100</span>
              </div>
              <div className="w-full h-3 bg-clay-input rounded-full overflow-hidden p-0.5 border border-clay-border">
                <div className="h-full bg-purple-500 rounded-full w-[95%] transition-all duration-700" />
              </div>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-clay-input border border-clay-border text-xs text-clay-muted leading-relaxed">
            💡 <strong className="text-clay-fg">Minds Insight:</strong> Your audience responds 34% better to <span className="text-brand-periwinkle font-semibold">Contrarian statements</span> than question-style hooks. Prismo automatically prioritizes bold openings in future drafts.
          </div>
        </div>

        {/* Right 1 Col: Memory Pattern Matrix */}
        <div className="clay-card p-6 space-y-4 border border-clay-border bg-[#23201F]">
          <div className="border-b border-clay-border/60 pb-3">
            <h4 className="text-sm font-bold text-clay-fg flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Learned Voice Memory
            </h4>
            <p className="text-[11px] text-clay-muted">Rules extracted from past approvals</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1C1A19] border border-clay-border">
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Hook Style</span>
              <p className="text-clay-fg font-medium">Contrarian bold claims over simple questions.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1C1A19] border border-clay-border">
              <span className="text-[10px] uppercase font-bold text-brand-periwinkle block mb-1">LinkedIn Format</span>
              <p className="text-clay-fg font-medium">1 sentence per line, heavy whitespace, no hashtags in body.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1C1A19] border border-clay-border">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Shorts Script</span>
              <p className="text-clay-fg font-medium">First 3 seconds must include a visual pattern interrupt.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
