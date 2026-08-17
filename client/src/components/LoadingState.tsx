// ─────────────────────────────────────────────────────────────────────────────
// LoadingState.tsx — Claymorphism Theme
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { FileText, Brain, Wand2 } from 'lucide-react';

const STEPS = [
  {
    icon: FileText,
    label: 'Fetching transcript',
    detail: 'Extracting video captions from YouTube...',
    color: 'text-red-400',
  },
  {
    icon: Brain,
    label: 'Consulting Minds memory',
    detail: 'Prismo Agent reviewing past approvals & style preferences...',
    color: 'text-brand-periwinkle',
  },
  {
    icon: Wand2,
    label: 'Splitting into 3 platforms',
    detail: 'Generating native posts for X, LinkedIn & Shorts...',
    color: 'text-emerald-400',
  },
];

export const LoadingState: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = STEPS[activeStep]!;
  const Icon = current.icon;

  return (
    <div className="clay-card max-w-xl mx-auto py-16 px-8 flex flex-col items-center justify-center space-y-8">

      {/* Claymorphic animated icon container */}
      <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-clay-input border border-clay-border shadow-clay">
        <Icon className={`w-10 h-10 ${current.color} animate-pulse`} />
        <div className="absolute inset-0 rounded-2xl border-2 border-brand-periwinkle/30 animate-ping opacity-25" />
      </div>

      {/* Current step info */}
      <div className="text-center space-y-1.5">
        <h3 className={`text-lg font-bold ${current.color}`}>{current.label}</h3>
        <p className="text-xs text-clay-muted">{current.detail}</p>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-3 pt-2">
        {STEPS.map((step, idx) => {
          const isDone   = idx < activeStep;
          const isActive = idx === activeStep;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
                ${isActive  ? 'bg-brand-periwinkle/10 text-brand-periwinkle border-brand-periwinkle/40 shadow-sm' : ''}
                ${isDone    ? 'text-clay-muted border-clay-border bg-clay-input line-through' : ''}
                ${!isActive && !isDone ? 'text-clay-muted/40 border-clay-border/40' : ''}`}
              >
                {step.label}
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-6 h-px ${isDone ? 'bg-brand-periwinkle/40' : 'bg-clay-border'}`} />
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-clay-muted/60">Takes ~15–25 seconds for Minds AI generation</p>
    </div>
  );
};
