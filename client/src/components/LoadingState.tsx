// ─────────────────────────────────────────────────────────────────────────────
// LoadingState.tsx
// Shows a beautiful animated loading screen while the Minds Agent processes.
// Has 3 distinct phases so users know what's happening at each step.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { FileText, Brain, Wand2 } from 'lucide-react';

// The 3 steps shown during loading — each takes roughly the same time
const STEPS = [
  {
    icon: FileText,
    label: 'Fetching transcript',
    detail: 'Reading the video captions from YouTube...',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  {
    icon: Brain,
    label: 'Checking Minds memory',
    detail: 'Agent is reviewing your past approvals...',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  {
    icon: Wand2,
    label: 'Generating 3 drafts',
    detail: 'Creating native content for X, LinkedIn & Shorts...',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
];

export const LoadingState: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through the 3 steps with a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 6000); // advance every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const current = STEPS[activeStep]!;
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-10">

      {/* Animated icon */}
      <div className={`relative flex items-center justify-center w-20 h-20 rounded-3xl ${current.bg} border ${current.border}`}>
        <Icon className={`w-9 h-9 ${current.color} animate-pulse`} />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent border-t-current animate-spin opacity-30"
             style={{ borderTopColor: 'currentColor' }} />
      </div>

      {/* Current step text */}
      <div className="text-center space-y-2">
        <p className={`text-lg font-bold font-display ${current.color}`}>{current.label}</p>
        <p className="text-sm text-slate-400">{current.detail}</p>
      </div>

      {/* Step progress dots */}
      <div className="flex items-center gap-3">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone    = idx < activeStep;
          const isActive  = idx === activeStep;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500
                ${isActive  ? `${step.bg} ${step.color} border ${step.border}` : ''}
                ${isDone    ? 'text-slate-400 line-through' : ''}
                ${!isActive && !isDone ? 'text-slate-600' : ''}`}
              >
                <StepIcon className="w-3.5 h-3.5" />
                {step.label}
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-6 h-px ${isDone ? 'bg-slate-500' : 'bg-slate-800'}`} />
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-600">This usually takes 15–30 seconds</p>
    </div>
  );
};
