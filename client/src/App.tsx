// ─────────────────────────────────────────────────────────────────────────────
// App.tsx — Prismo Claymorphism Theme
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { Brain, Cpu, ArrowLeft, AlertCircle } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { DraftCard } from './components/DraftCard';
import { MemoryPanel } from './components/MemoryPanel';
import { LoadingState } from './components/LoadingState';

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
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [result, setResult]                   = useState<RepurposeResult | null>(null);
  const [approvedPlatforms, setApprovedPlatforms] = useState<Set<string>>(new Set());
  const [memoryMessages, setMemoryMessages]   = useState<ConversationMessage[]>([]);
  const [memoryLoading, setMemoryLoading]     = useState(false);

  const fetchMemory = useCallback(async () => {
    setMemoryLoading(true);
    try {
      const res = await fetch('/api/memory');
      const data = await res.json() as { messages?: ConversationMessage[]; error?: string };
      if (data.messages) setMemoryMessages(data.messages);
    } catch {
      // Silently fail
    } finally {
      setMemoryLoading(false);
    }
  }, []);

  useEffect(() => { fetchMemory(); }, [fetchMemory]);

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
      await fetchMemory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (platform: string, hook: string) => {
    try {
      await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, hookStyle: 'Memory-guided', hook }),
      });
      setApprovedPlatforms((prev) => new Set(prev).add(platform));
      setTimeout(fetchMemory, 1500);
    } catch {
      setApprovedPlatforms((prev) => new Set(prev).add(platform));
    }
  };

  return (
    <div className="min-h-screen bg-clay-bg text-clay-fg flex flex-col antialiased">

      {/* ── Claymorphism Navbar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#1F1C1B]/90 backdrop-blur-md border-b border-clay-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl
                            bg-brand-indigo border border-white/20 shadow-clay-button">
              <Brain className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400
                              rounded-full border-2 border-clay-bg animate-live" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display gradient-text tracking-wide">Prismo</h1>
              <p className="text-[10px] font-semibold text-clay-muted">Powered by Minds AI · Creative Minds Jam #1</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-clay-muted
                          bg-clay-input border border-clay-border px-3.5 py-1.5 rounded-full shadow-inner">
            <Cpu className="w-3.5 h-3.5 text-brand-periwinkle" />
            Minds Agent Ready
          </div>
        </div>
      </header>

      {/* ── Main Workspace ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">

        {!result && !isLoading && (
          <div className="text-center space-y-4 py-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                            bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/30">
              <span className="w-2 h-2 rounded-full bg-brand-periwinkle animate-live" />
              Claymorphism UI Active · Minds Agent Online
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight">
              One video.<br />
              <span className="gradient-text">Three platforms. Prismo.</span>
            </h2>

            <p className="text-clay-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Paste a YouTube video URL. Prismo's Minds Agent analyzes the transcript,
              recalls your past style approvals, and splits it into native posts for X, LinkedIn, and Shorts.
            </p>
          </div>
        )}

        {result && !isLoading && (
          <button
            onClick={() => { setResult(null); setError(null); }}
            className="flex items-center gap-2 text-sm text-clay-muted hover:text-clay-fg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Split another video
          </button>
        )}

        {!result && !isLoading && (
          <InputPanel onSubmit={handleRepurpose} isLoading={isLoading} />
        )}

        {isLoading && <LoadingState />}

        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30
                          text-red-300 rounded-2xl p-5 text-sm max-w-2xl mx-auto clay-card">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="font-bold mb-1">Error</p>
              <p className="text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-8">

            {result.adapted_from_memory && (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30
                              text-emerald-300 rounded-2xl px-5 py-3.5 text-sm max-w-2xl mx-auto shadow-sm">
                <Brain className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Minds Memory Active:</strong> {result.memory_insight}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <MemoryPanel
              messages={memoryMessages}
              memoryInsight={result.memory_insight}
              adaptedFromMemory={result.adapted_from_memory}
              onRefresh={fetchMemory}
              isLoading={memoryLoading}
            />
          </div>
        )}

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

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-clay-border py-6 text-center text-xs text-clay-muted bg-[#1F1C1B]">
        Built for{' '}
        <a href="https://creativemindsjam.com" target="_blank" rel="noreferrer"
           className="text-brand-periwinkle hover:underline font-semibold">Creative Minds Jam #1</a>
        {' '}· Prismo is powered by{' '}
        <a href="https://hellominds.ai" target="_blank" rel="noreferrer"
           className="text-brand-periwinkle hover:underline font-semibold">Minds by Animoca Brands</a>
      </footer>

    </div>
  );
}
