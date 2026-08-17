// ─────────────────────────────────────────────────────────────────────────────
// DraftCard.tsx
// Shows a single platform draft (X Thread, LinkedIn, or YouTube Shorts).
// Creator can approve it (which teaches the Minds Agent) or copy the content.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { CheckCircle, Copy, Check, ExternalLink } from 'lucide-react';

// Platform configuration — colors, labels, icons per platform
const PLATFORM_CONFIG = {
  twitter: {
    label: 'X (Twitter) Thread',
    shortLabel: 'X Thread',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    accent: 'border-sky-500/40',
    glow: 'hover:shadow-sky-500/10',
    hookLabel: 'Opening Tweet (Hook)',
  },
  linkedin: {
    label: 'LinkedIn Post',
    shortLabel: 'LinkedIn',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    accent: 'border-blue-500/40',
    glow: 'hover:shadow-blue-500/10',
    hookLabel: 'Opening Line (Hook)',
  },
  youtube_shorts: {
    label: 'YouTube Shorts Script',
    shortLabel: 'YT Shorts',
    badge: 'bg-red-500/15 text-red-300 border-red-500/30',
    accent: 'border-red-500/40',
    glow: 'hover:shadow-red-500/10',
    hookLabel: 'First 3 Seconds (Hook)',
  },
} as const;

type Platform = keyof typeof PLATFORM_CONFIG;

interface DraftData {
  hook: string;
  thread?: string[];    // only Twitter
  body?: string;        // only LinkedIn
  script?: string;      // only YT Shorts
  cta: string;
}

interface DraftCardProps {
  platform: Platform;
  draft: DraftData;
  onApprove: (platform: Platform, hook: string) => void;
  isApproved: boolean;
  animDelay?: string;
}

export const DraftCard: React.FC<DraftCardProps> = ({
  platform,
  draft,
  onApprove,
  isApproved,
  animDelay = '0ms',
}) => {
  const [copied, setCopied] = useState(false);
  const config = PLATFORM_CONFIG[platform];

  // Combine all text for copying to clipboard
  const getFullText = () => {
    const parts = [`${draft.hook}\n`];
    if (draft.thread) parts.push(draft.thread.join('\n\n'));
    if (draft.body) parts.push(draft.body);
    if (draft.script) parts.push(draft.script);
    parts.push(`\n${draft.cta}`);
    return parts.join('\n');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getFullText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`glow-card animate-fade-up flex flex-col bg-slate-900/60 border border-slate-800
                  ${config.accent} rounded-2xl overflow-hidden hover:shadow-xl ${config.glow}
                  transition-all duration-300 backdrop-blur-sm`}
      style={{ animationDelay: animDelay }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${config.badge}`}>
          {config.label}
        </span>
        <div className="flex items-center gap-2">
          <button
            id={`copy-${platform}`}
            onClick={handleCopy}
            title="Copy to clipboard"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Draft Content */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-80">

        {/* Hook — highlighted as the most important part */}
        <div className="bg-slate-950/80 border border-slate-700/50 rounded-xl p-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
            {config.hookLabel}
          </div>
          <p className="text-sm font-semibold text-amber-300 leading-relaxed">{draft.hook}</p>
        </div>

        {/* Twitter thread */}
        {draft.thread && (
          <div className="space-y-2">
            {draft.thread.map((tweet, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-[10px] text-slate-600 font-mono mt-0.5 shrink-0">
                  {idx + 2}/
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{tweet}</p>
              </div>
            ))}
          </div>
        )}

        {/* LinkedIn body */}
        {draft.body && (
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{draft.body}</p>
        )}

        {/* YT Shorts script */}
        {draft.script && (
          <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono bg-slate-950/50 p-3 rounded-xl border border-slate-800">
            {draft.script}
          </pre>
        )}

        {/* CTA */}
        <div className="border-t border-slate-800/80 pt-3">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">CTA</div>
          <p className="text-xs text-purple-300 italic">{draft.cta}</p>
        </div>
      </div>

      {/* Approve Button */}
      <div className="p-4 border-t border-slate-800/80">
        {isApproved ? (
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl
                          bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle className="w-4 h-4" />
            Approved — Agent Updated!
          </div>
        ) : (
          <button
            id={`approve-${platform}`}
            onClick={() => onApprove(platform, draft.hook)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-slate-800 hover:bg-slate-700 border border-slate-700
                       hover:border-emerald-500/50 text-slate-200 hover:text-emerald-300
                       text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Approve This Draft
          </button>
        )}
      </div>
    </div>
  );
};
