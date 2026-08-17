// ─────────────────────────────────────────────────────────────────────────────
// App.tsx — Prismo 2.0 (Claymorphism + Resonance Analysis + Auth + Custom Angles)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { Brain, Cpu, ArrowLeft, AlertCircle, LogIn, User, Sparkles, BarChart3, Layers, Database, ShieldCheck } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { DraftCard } from './components/DraftCard';
import { MemoryPanel } from './components/MemoryPanel';
import { LoadingState } from './components/LoadingState';
import { AuthModal } from './components/AuthModal';
import { AudienceResonanceAnalyzer } from './components/AudienceResonanceAnalyzer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

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

type TabType = 'studio' | 'resonance' | 'analytics' | 'memory';

export default function App() {
  // ─── State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]             = useState<TabType>('studio');
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [result, setResult]                   = useState<RepurposeResult | null>(null);
  const [approvedPlatforms, setApprovedPlatforms] = useState<Set<string>>(new Set());
  const [memoryMessages, setMemoryMessages]   = useState<ConversationMessage[]>([]);
  const [memoryLoading, setMemoryLoading]     = useState(false);

  // Auth State
  const [isAuthOpen, setIsAuthOpen]           = useState(false);
  const [user, setUser]                       = useState<{ name: string; email: string; niche: string } | null>(null);

  // ─── Fetch Minds Memory ───────────────────────────────────────────────────
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

  // ─── Repurpose Submission ─────────────────────────────────────────────────
  const handleRepurpose = async (url: string, niche: string, angle: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setApprovedPlatforms(new Set());

    try {
      const res = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, niche, angle }),
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

  // ─── Approve Draft ────────────────────────────────────────────────────────
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(userInfo) => setUser(userInfo)}
      />

      {/* ── Claymorphism Navbar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#1F1C1B]/95 backdrop-blur-md border-b border-clay-border px-4 md:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Left Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-indigo border border-white/20 shadow-clay-button">
              <Brain className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-clay-bg animate-live" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display gradient-text tracking-wide">Prismo</h1>
              <p className="text-[10px] font-semibold text-clay-muted">Minds Intelligence Engine · Creative Minds Jam #1</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-clay-input border border-clay-border">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'studio'
                  ? 'bg-[#23201F] text-clay-fg border border-clay-border shadow-sm'
                  : 'text-clay-muted hover:text-clay-fg'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Repurpose Studio
            </button>

            <button
              onClick={() => setActiveTab('resonance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'resonance'
                  ? 'bg-[#23201F] text-brand-periwinkle border border-brand-periwinkle/30 shadow-sm'
                  : 'text-clay-muted hover:text-clay-fg'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-brand-periwinkle" />
              Virality Simulator
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#23201F] text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-clay-muted hover:text-clay-fg'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Analysis
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'memory'
                  ? 'bg-[#23201F] text-purple-400 border border-purple-500/30 shadow-sm'
                  : 'text-clay-muted hover:text-clay-fg'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              Minds Memory ({memoryMessages.length})
            </button>
          </nav>

          {/* Right User Auth Action */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-clay-input border border-clay-border">
                <div className="w-6 h-6 rounded-full bg-brand-periwinkle/20 border border-brand-periwinkle/40 flex items-center justify-center text-brand-periwinkle text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-clay-fg">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl clay-button text-xs uppercase tracking-wider font-extrabold"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center justify-around border-b border-clay-border bg-[#1F1C1B] px-2 py-2 text-xs">
        <button onClick={() => setActiveTab('studio')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'studio' ? 'bg-clay-input font-bold text-clay-fg' : 'text-clay-muted'}`}>Studio</button>
        <button onClick={() => setActiveTab('resonance')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'resonance' ? 'bg-clay-input font-bold text-brand-periwinkle' : 'text-clay-muted'}`}>Virality</button>
        <button onClick={() => setActiveTab('analytics')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'analytics' ? 'bg-clay-input font-bold text-emerald-400' : 'text-clay-muted'}`}>Analysis</button>
        <button onClick={() => setActiveTab('memory')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'memory' ? 'bg-clay-input font-bold text-purple-400' : 'text-clay-muted'}`}>Memory</button>
      </div>

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 space-y-10">

        {/* ── TAB 1: STUDIO ──────────────────────────────────────────────── */}
        {activeTab === 'studio' && (
          <div className="space-y-10">

            {!result && !isLoading && (
              <div className="text-center space-y-4 py-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                                bg-brand-periwinkle/10 text-brand-periwinkle border border-brand-periwinkle/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-periwinkle animate-live" />
                  Prismo 2.0 · Autonomous Virality & Memory Engine
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight">
                  The AI Engine That Learns<br />
                  <span className="gradient-text">How You Speak.</span>
                </h2>

                <p className="text-clay-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  Prismo extracts high-retention quotes, simulates virality across X, LinkedIn, & Shorts,
                  and evolves with your personal creator voice using Minds persistent memory.
                </p>
              </div>
            )}

            {result && !isLoading && (
              <button
                onClick={() => { setResult(null); setError(null); }}
                className="flex items-center gap-2 text-sm text-clay-muted hover:text-clay-fg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Repurpose another video
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
                {/* Memory banner */}
                {result.adapted_from_memory && (
                  <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30
                                  text-emerald-300 rounded-2xl px-5 py-3.5 text-sm max-w-2xl mx-auto shadow-sm">
                    <Brain className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong>Minds Memory Active:</strong> {result.memory_insight}
                    </span>
                  </div>
                )}

                {/* Virality Simulator Component */}
                <AudienceResonanceAnalyzer transcriptPreview={result.transcript_preview} niche={user?.niche || 'Tech & Creator Economy'} />

                {/* 3 Platform Cards */}
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
              </div>
            )}

          </div>
        )}

        {/* ── TAB 2: VIRALITY SIMULATOR ───────────────────────────────────── */}
        {activeTab === 'resonance' && (
          <div className="space-y-6">
            <AudienceResonanceAnalyzer niche={user?.niche || 'Tech & AI Creator'} />
          </div>
        )}

        {/* ── TAB 3: DEDICATED ANALYSIS DASHBOARD ─────────────────────────── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-clay-border pb-4">
              <div>
                <h2 className="text-2xl font-bold font-display text-clay-fg">Prismo Intelligence & Analytics</h2>
                <p className="text-xs text-clay-muted">Performance tracking, hours saved, and voice memory retention</p>
              </div>
              <button onClick={() => setActiveTab('studio')} className="clay-button px-4 py-2 text-xs uppercase tracking-wider">
                + Repurpose New Video
              </button>
            </div>
            <AnalyticsDashboard messageCount={memoryMessages.length} niche={user?.niche || 'Tech Creator'} />
          </div>
        )}

        {/* ── TAB 4: MINDS MEMORY ────────────────────────────────────────── */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            <MemoryPanel
              messages={memoryMessages}
              memoryInsight="Prismo Agent reads conversation history to adapt hook styles automatically."
              adaptedFromMemory={true}
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
