// ─────────────────────────────────────────────────────────────────────────────
// DraftCard.tsx — Text-Only Platform Draft Display (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

const PLATFORM_CONFIG = {
  twitter: {
    label: 'X (Twitter) Thread',
    badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    hookLabel: 'Opening Hook (Tweet 1)',
  },
  linkedin: {
    label: 'LinkedIn Post',
    badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    hookLabel: 'Opening Bold Statement',
  },
  youtube_shorts: {
    label: 'YouTube Shorts Script',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    hookLabel: 'First 3 Seconds (Visual/Audio Interrupt)',
  },
} as const;

type Platform = keyof typeof PLATFORM_CONFIG;

interface DraftData {
  hook: string;
  thread?: string[];
  body?: string;
  script?: string;
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
      className="clay-card flex flex-col animate-fade-up overflow-hidden"
      style={{ animationDelay: animDelay }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#1B1918]">
        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${config.badge}`}>
          {config.label}
        </span>
        <button
          id={`copy-${platform}`}
          onClick={handleCopy}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-clay-input border border-white/5 text-[#8C8782] hover:text-[#F5F4F1] transition-all"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-80 text-sm">

        {/* Hook */}
        <div className="clay-input p-4 border border-brand-periwinkle/30 bg-[#1A1817]">
          <div className="text-[10px] uppercase font-extrabold tracking-widest text-brand-periwinkle mb-1.5">
            {config.hookLabel}
          </div>
          <p className="text-sm font-semibold text-[#F5F4F1] leading-relaxed">{draft.hook}</p>
        </div>

        {/* Twitter thread */}
        {draft.thread && (
          <div className="space-y-2.5">
            {draft.thread.map((tweet, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-[10px] text-[#8C8782] font-mono mt-0.5 shrink-0">
                  {idx + 2}/
                </span>
                <p className="text-xs text-[#F5F4F1]/90 leading-relaxed">{tweet}</p>
              </div>
            ))}
          </div>
        )}

        {/* LinkedIn body */}
        {draft.body && (
          <p className="text-xs text-[#F5F4F1]/90 leading-relaxed whitespace-pre-wrap">{draft.body}</p>
        )}

        {/* YT Shorts script */}
        {draft.script && (
          <pre className="text-xs text-[#F5F4F1]/90 leading-relaxed whitespace-pre-wrap font-mono clay-input p-3">
            {draft.script}
          </pre>
        )}

        {/* CTA */}
        <div className="border-t border-white/5 pt-3">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#8C8782] mb-1">Call to Action</div>
          <p className="text-xs text-brand-periwinkle italic">{draft.cta}</p>
        </div>
      </div>

      {/* Footer Approve Action */}
      <div className="p-4 border-t border-white/5 bg-[#1B1918]">
        {isApproved ? (
          <div className="py-3 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            Approved & Saved to Minds Memory
          </div>
        ) : (
          <button
            id={`approve-${platform}`}
            onClick={() => onApprove(platform, draft.hook)}
            className="w-full py-3 rounded-xl bg-clay-input hover:bg-clay-hover border border-white/5 text-[#F5F4F1] text-xs font-bold transition-all"
          >
            Approve Draft (Train Mind)
          </button>
        )}
      </div>
    </div>
  );
};
