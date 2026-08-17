// ─────────────────────────────────────────────────────────────────────────────
// AuthModal.tsx — Claymorphism Sign In & Creator Profile Modal
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string; niche: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('AI & Tech Creator');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin({
      name: name || email.split('@')[0] || 'Creator',
      email,
      niche,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
      <div className="clay-card w-full max-w-md p-6 md:p-8 relative border border-clay-border bg-[#23201F] shadow-clay">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-clay-input border border-clay-border text-clay-muted hover:text-clay-fg transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 border border-brand-periwinkle/30 flex items-center justify-center mx-auto mb-3 text-brand-periwinkle shadow-clay-button">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display gradient-text">
            {mode === 'signin' ? 'Welcome Back to Prismo' : 'Join Prismo Creator OS'}
          </h2>
          <p className="text-xs text-clay-muted">
            {mode === 'signin'
              ? 'Sign in to access your persistent Minds Agent memory'
              : 'Create your account & train your custom repurposing Mind'}
          </p>
        </div>

        {/* Quick Connect Options */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => {
              onLogin({ name: 'Minds Creator', email: 'minds@hellominds.ai', niche: 'Tech & AI' });
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl clay-input border border-brand-periwinkle/30 hover:border-brand-periwinkle text-xs font-bold text-clay-fg transition-all bg-[#1F1C1B]"
          >
            <ShieldCheck className="w-4 h-4 text-brand-periwinkle" />
            Sign in with Minds Account (Recommended)
          </button>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-clay-border/60" /></div>
          <span className="relative px-3 bg-[#23201F] text-[10px] uppercase tracking-widest text-clay-muted font-mono">or email login</span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-clay-muted uppercase tracking-wider mb-1.5">
                Creator Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivers"
                className="w-full clay-input px-4 py-3 text-xs"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-clay-muted uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@creator.com"
              className="w-full clay-input px-4 py-3 text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-clay-muted uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full clay-input px-4 py-3 text-xs"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-clay-muted uppercase tracking-wider mb-1.5">
                Primary Niche
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="AI tools, Crypto, Lifestyle, Tech"
                className="w-full clay-input px-4 py-3 text-xs"
              />
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="w-full clay-button py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              {mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-clay-muted">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-brand-periwinkle font-bold hover:underline">
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-brand-periwinkle font-bold hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
