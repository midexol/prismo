// ─────────────────────────────────────────────────────────────────────────────
// LoadingState.tsx — Text-Only Animated Loading State (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';

const STEPS = [
  {
    label: 'Fetching transcript',
    detail: 'Extracting video captions from YouTube...',
    color: 'text-red-400',
  },
  {
    label: 'Consulting Minds memory',
    detail: 'Prismo Agent reviewing past approvals & style preferences...',
    color: 'text-brand-periwinkle',
  },
  {
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

  return (
    <div className="clay-card max-w-xl mx-auto py-16 px-8 flex flex-col items-center justify-center space-y-8">

      <div className="text-center space-y-2">
        <h3 className={`text-xl font-bold font-display ${current.color}`}>{current.label}</h3>
        <p className="text-xs text-[#8C8782]">{current.detail}</p>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-3 pt-2">
        {STEPS.map((step, idx) => {
          const isDone   = idx < activeStep;
          const isActive = idx === activeStep;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isActive  ? 'bg-brand-periwinkle/10 text-brand-periwinkle border-brand-periwinkle/40 shadow-sm' : ''}
                ${isDone    ? 'text-[#8C8782] border-white/5 bg-[#1D1B1A] line-through' : ''}
                ${!isActive && !isDone ? 'text-[#8C8782]/40 border-white/5' : ''}`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#8C8782]">Takes ~15–25 seconds for Minds AI generation</p>
    </div>
  );
};
