// ─────────────────────────────────────────────────────────────────────────────
// App.tsx — Prismo (Edge-to-Edge Full Bleed Media Hero, Single Floating Nav)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, AlertCircle, LogIn, BarChart3, Layers, Database, ShieldCheck } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { DraftCard } from './components/DraftCard';
import { MemoryPanel } from './components/MemoryPanel';
import { LoadingState } from './components/LoadingState';
import { AuthModal } from './components/AuthModal';
import { AudienceResonanceAnalyzer } from './components/AudienceResonanceAnalyzer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { PrismaHero } from './components/ui/prisma-hero';

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
  const [activeTab, setActiveTab]             = useState<TabType>('studio');
  const [isLoading, setIsLoading]             = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [result, setResult]                   = useState<RepurposeResult | null>(null);
  const [approvedPlatforms, setApprovedPlatforms] = useState<Set<string>>(new Set());
  const [memoryMessages, setMemoryMessages]   = useState<ConversationMessage[]>([]);
  const [_memoryLoading, setMemoryLoading]     = useState(false);

  // Auth State
  const [isAuthOpen, setIsAuthOpen]           = useState(false);
  const [user, setUser]                       = useState<{ name: string; email: string; niche: string } | null>(null);

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
    <div className="min-h-screen bg-[#0D0C0C] text-[#F5F4F1] flex flex-col font-sans antialiased selection:bg-brand-periwinkle selection:text-black">

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(userInfo) => setUser(userInfo)}
      />

      {/* ── Single Floating Navbar (Overlaying Hero & Content) ────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0C0C]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Clean Typography Brand Logo */}
          <button
            onClick={() => setActiveTab('studio')}
            className="text-2xl font-display font-extrabold tracking-tight text-[#F5F4F1] hover:text-brand-periwinkle transition-colors"
          >
            Prismo
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#181615]/80 backdrop-blur-md p-1.5 rounded-full border border-white/5">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'studio'
                  ? 'bg-[#252220] text-[#F5F4F1] shadow-sm'
                  : 'text-[#8C8782] hover:text-[#F5F4F1]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Studio
            </button>

            <button
              onClick={() => setActiveTab('resonance')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'resonance'
                  ? 'bg-[#252220] text-brand-periwinkle shadow-sm'
                  : 'text-[#8C8782] hover:text-[#F5F4F1]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-brand-periwinkle" />
              Virality Simulator
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#252220] text-emerald-400 shadow-sm'
                  : 'text-[#8C8782] hover:text-[#F5F4F1]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Analysis
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'memory'
                  ? 'bg-[#252220] text-purple-400 shadow-sm'
                  : 'text-[#8C8782] hover:text-[#F5F4F1]'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              Memory Log ({memoryMessages.length})
            </button>
          </nav>

          {/* User Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <span className="text-xs font-bold text-[#F5F4F1] px-4 py-2 rounded-full bg-[#181615] border border-white/5">{user.name}</span>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-periwinkle hover:bg-brand-indigo text-black text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-indigo-500/20"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden fixed top-16 left-0 right-0 z-40 items-center justify-around bg-[#161514]/90 backdrop-blur-md px-2 py-2 text-xs border-b border-white/5">
        <button onClick={() => setActiveTab('studio')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'studio' ? 'bg-[#252220] font-bold text-[#F5F4F1]' : 'text-[#8C8782]'}`}>Studio</button>
        <button onClick={() => setActiveTab('resonance')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'resonance' ? 'bg-[#252220] font-bold text-brand-periwinkle' : 'text-[#8C8782]'}`}>Virality</button>
        <button onClick={() => setActiveTab('analytics')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'analytics' ? 'bg-[#252220] font-bold text-emerald-400' : 'text-[#8C8782]'}`}>Analysis</button>
        <button onClick={() => setActiveTab('memory')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'memory' ? 'bg-[#252220] font-bold text-purple-400' : 'text-[#8C8782]'}`}>Memory</button>
      </div>

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      <main className="flex-1 w-full pt-16">

        {/* ── TAB 1: STUDIO ──────────────────────────────────────────────── */}
        {activeTab === 'studio' && (
          <div className="space-y-16">

            {/* True 100% Edge-to-Edge Hero without side padding or inner nav */}
            {!result && !isLoading && (
              <PrismaHero
                onStartRepurposing={() => {
                  const inputElem = document.getElementById('repurpose-button');
                  if (inputElem) inputElem.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Container for Input Form & Results */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 pb-16">

              {result && !isLoading && (
                <button
                  onClick={() => { setResult(null); setError(null); }}
                  className="flex items-center gap-2 text-sm text-[#8C8782] hover:text-[#F5F4F1] transition-colors pt-6"
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
                <div className="flex items-start gap-3 bg-red-500/10 text-red-300 rounded-2xl p-5 text-sm max-w-2xl mx-auto clay-card">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <p className="font-bold mb-1">Error</p>
                    <p className="text-red-300/80">{error}</p>
                  </div>
                </div>
              )}

              {result && !isLoading && (
                <div className="space-y-8">
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

          </div>
        )}

        {/* ── TAB 2: VIRALITY SIMULATOR ───────────────────────────────────── */}
        {activeTab === 'resonance' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-6">
            <AudienceResonanceAnalyzer niche={user?.niche || 'Tech & AI Creator'} />
          </div>
        )}

        {/* ── TAB 3: DEDICATED ANALYSIS DASHBOARD ─────────────────────────── */}
        {activeTab === 'analytics' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#252220]">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-[#F5F4F1]">Prismo Analytics</h2>
                <p className="text-xs text-[#8C8782]">Performance tracking, hours saved, and voice memory retention</p>
              </div>
              <button onClick={() => setActiveTab('studio')} className="clay-button px-5 py-2.5 text-xs uppercase tracking-wider">
                + Repurpose New Video
              </button>
            </div>
            <AnalyticsDashboard messageCount={memoryMessages.length} niche={user?.niche || 'Tech Creator'} />
          </div>
        )}

        {/* ── TAB 4: MINDS MEMORY ────────────────────────────────────────── */}
        {activeTab === 'memory' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-6">
            <MemoryPanel
              messages={memoryMessages}
              memoryInsight="Prismo Agent reads conversation history to adapt hook styles automatically."
              adaptedFromMemory={true}
              onRefresh={fetchMemory}
              isLoading={false}
            />
          </div>
        )}

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-8 text-center text-xs text-[#8C8782] bg-[#0D0C0C] border-t border-white/5">
        Built for{' '}
        <a href="https://creativemindsjam.com" target="_blank" rel="noreferrer"
           className="text-[#818CF8] hover:underline font-semibold">Creative Minds Jam #1</a>
        {' '}· Prismo is powered by{' '}
        <a href="https://hellominds.ai" target="_blank" rel="noreferrer"
           className="text-[#818CF8] hover:underline font-semibold">Minds by Animoca Brands</a>
      </footer>

    </div>
  );
}
