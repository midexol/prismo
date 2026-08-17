// ─────────────────────────────────────────────────────────────────────────────
// App.tsx — Main Application
//
// This is the root of the React app. It holds all state and coordinates
// between the InputPanel, DraftCards, MemoryPanel, and LoadingState.
//
// DATA FLOW:
//   User submits URL + niche
//     → calls POST /api/repurpose (server fetches transcript + sends to Minds)
//     → Minds returns JSON with 3 drafts
//     → Show DraftCard for each platform
//   User approves a draft
//     → calls POST /api/approve (server sends feedback to Minds conversation)
//     → Minds memory updated (agent learns this preference)
//   User or component calls GET /api/memory
//     → shows real Minds conversation history in MemoryPanel
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { Brain, Cpu, ArrowLeft, AlertCircle } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { DraftCard } from './components/DraftCard';
import { MemoryPanel } from './components/MemoryPanel';
import { LoadingState } from './components/LoadingState';

// Type definitions matching what the server returns from the Minds Agent
interface Drafts {
  twitter: { hook: string; thread: string[]; cta: string };
  linkedin: { hook: string; body: string; cta: string };
  youtube_shorts: { hook: string; script: string; cta: string };
}

interface RepurposeResult {
  adapted_from_memory: boolean;
  memory_insight: string;
  drafts: Drafts;
  transcript_preview: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export default function App() {
  // ─── State ────────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [result, setResult]                   = useState<RepurposeResult | null>(null);
  const [approvedPlatforms, setApprovedPlatforms] = useState<Set<string>>(new Set());
  const [memoryMessages, setMemoryMessages]   = useState<ConversationMessage[]>([]);
  const [memoryLoading, setMemoryLoading]     = useState(false);

  // ─── Fetch Minds memory history ───────────────────────────────────────────
  const fetchMemory = useCallback(async () => {
    setMemoryLoading(true);
    try {
      const res = await fetch('/api/memory');
      const data = await res.json() as { messages?: ConversationMessage[]; error?: string };
      if (data.messages) setMemoryMessages(data.messages);
    } catch {
      // Silently fail — memory panel just shows empty state
    } finally {
      setMemoryLoading(false);
    }
  }, []);

  // Load memory on first render
  useEffect(() => { fetchMemory(); }, [fetchMemory]);

  // ─── Main repurpose action ────────────────────────────────────────────────
  const handleRepurpose = async (url: string, niche: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setApprovedPlatforms(new Set());

    try {
      const res = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, niche }),
      });

      const data = await res.json() as RepurposeResult & { error?: string };

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setResult(data);
      // Refresh memory after generation so the panel shows updated history
      await fetchMemory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Approve a draft ─────────────────────────────────────────────────────
  const handleApprove = async (platform: string, hook: string) => {
    try {
      await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, hookStyle: 'Memory-guided', hook }),
      });
      setApprovedPlatforms((prev) => new Set(prev).add(platform));
      // Refresh memory to show the approval message in the panel
      setTimeout(fetchMemory, 1500);
    } catch {
      // If approval fails, just mark it locally anyway
      setApprovedPlatforms((prev) => new Set(prev).add(platform));
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070B13] text-slate-100 flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#070B13]/90 backdrop-blur-md border-b border-slate-800/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl
                            bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
              <Brain className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400
                              rounded-full border-2 border-[#070B13] animate-live" />
            </div>
            <div>
              <h1 className="text-base font-bold font-display gradient-text">RepurposeAI</h1>
              <p className="text-[10px] text-slate-500">Powered by Minds · Creative Minds Jam #1</p>
            </div>
          </div>

          {/* Minds badge */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400
                          bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Minds Agent Active
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 py-10 space-y-10">

        {/* Hero section — shown before first result */}
        {!result && !isLoading && (
          <div className="text-center space-y-6 py-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                            bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-live" />
              Your Minds Agent is ready
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight">
              One video.<br />
              <span className="gradient-text">Three platforms. Done.</span>
            </h2>

            <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
              Paste a YouTube URL. Your Minds Agent reads the transcript,
              remembers your style, and generates native content for X, LinkedIn,
              and YouTube Shorts — instantly.
            </p>
          </div>
        )}

        {/* Back button — shown after result */}
        {result && !isLoading && (
          <button
            onClick={() => { setResult(null); setError(null); }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Repurpose another video
          </button>
        )}

        {/* Input form */}
        {!result && !isLoading && (
          <InputPanel onSubmit={handleRepurpose} isLoading={isLoading} />
        )}

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30
                          text-red-300 rounded-2xl p-5 text-sm max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Something went wrong</p>
              <p className="text-red-400/80">{error}</p>
            </div>
          </div>
        )}

        {/* ── Draft Cards + Memory Panel ─────────────────────────────────── */}
        {result && !isLoading && (
          <div className="space-y-8">

            {/* Memory insight banner */}
            {result.adapted_from_memory && (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30
                              text-emerald-300 rounded-2xl px-5 py-3 text-sm max-w-2xl mx-auto">
                <Brain className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Memory active:</strong> {result.memory_insight}
                </span>
              </div>
            )}

            {/* 3-column draft grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <DraftCard
                platform="twitter"
                draft={result.drafts.twitter}
                onApprove={handleApprove}
                isApproved={approvedPlatforms.has('twitter')}
                animDelay="0ms"
              />
              <DraftCard
                platform="linkedin"
                draft={result.drafts.linkedin}
                onApprove={handleApprove}
                isApproved={approvedPlatforms.has('linkedin')}
                animDelay="100ms"
              />
              <DraftCard
                platform="youtube_shorts"
                draft={result.drafts.youtube_shorts}
                onApprove={handleApprove}
                isApproved={approvedPlatforms.has('youtube_shorts')}
                animDelay="200ms"
              />
            </div>

            {/* Memory Panel */}
            <MemoryPanel
              messages={memoryMessages}
              memoryInsight={result.memory_insight}
              adaptedFromMemory={result.adapted_from_memory}
              onRefresh={fetchMemory}
              isLoading={memoryLoading}
            />
          </div>
        )}

        {/* Memory panel shown before first result too */}
        {!result && !isLoading && (
          <div className="max-w-2xl mx-auto">
            <MemoryPanel
              messages={memoryMessages}
              memoryInsight=""
              adaptedFromMemory={false}
              onRefresh={fetchMemory}
              isLoading={memoryLoading}
            />
          </div>
        )}

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-600">
        Built for{' '}
        <a href="https://creativemindsjam.com" target="_blank" rel="noreferrer"
           className="text-blue-500 hover:underline">Creative Minds Jam #1</a>
        {' '}· Powered by{' '}
        <a href="https://hellominds.ai" target="_blank" rel="noreferrer"
           className="text-purple-400 hover:underline">Minds by Animoca Brands</a>
      </footer>

    </div>
  );
}
