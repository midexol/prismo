// ─────────────────────────────────────────────────────────────────────────────
// AuthModal.tsx — Text-Only Auth Modal (Matching HextaUI Design Reference)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

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
      <div className="clay-card w-full max-w-md p-6 md:p-8 relative border border-white/5 bg-[#161514] shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xs text-[#8C8782] hover:text-[#F5F4F1] transition-all"
        >
          Close
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6 pt-2">
          <h2 className="text-2xl font-bold font-display text-[#F5F4F1]">
            {mode === 'signin' ? 'Prismo' : 'Join Prismo'}
          </h2>
          <p className="text-xs text-[#8C8782]">
            {mode === 'signin'
              ? 'Sign in to access your persistent Minds Agent memory'
              : 'Create your account & train your custom repurposing Mind'}
          </p>
        </div>

        {/* Quick Connect Option */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => {
              onLogin({ name: 'Minds Creator', email: 'minds@hellominds.ai', niche: 'Tech & AI' });
              onClose();
            }}
            className="w-full text-center py-3 px-4 rounded-xl clay-input border border-white/5 hover:border-brand-periwinkle text-xs font-bold text-[#F5F4F1] transition-all bg-[#1D1B1A]"
          >
            Continue with Minds Account
          </button>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
          <span className="relative px-3 bg-[#161514] text-[10px] uppercase tracking-widest text-[#8C8782] font-mono">or email</span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-[#8C8782] uppercase tracking-wider mb-1.5">
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
            <label className="block text-[11px] font-semibold text-[#8C8782] uppercase tracking-wider mb-1.5">
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
            <label className="block text-[11px] font-semibold text-[#8C8782] uppercase tracking-wider mb-1.5">
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
              <label className="block text-[11px] font-semibold text-[#8C8782] uppercase tracking-wider mb-1.5">
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
            <button type="submit" className="w-full clay-button py-3.5 text-xs uppercase tracking-wider">
              {mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-[#8C8782]">
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
