// ─────────────────────────────────────────────────────────────────────────────
// MemoryPanel.tsx — Claymorphism Theme
// Shows the Minds Agent's conversation history — live proof of persistence.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Database, User, Bot, RefreshCw, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface MemoryPanelProps {
  messages: Message[];
  memoryInsight: string;
  adaptedFromMemory: boolean;
  onRefresh: () => void;
  isLoading: boolean;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({
  messages,
  memoryInsight,
  adaptedFromMemory,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="clay-card overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-clay-border/60 bg-[#1F1C1B]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-periwinkle/10 border border-brand-periwinkle/20">
            <Database className="w-4 h-4 text-brand-periwinkle" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-clay-fg">Minds Memory Inspector</h3>
            <p className="text-[11px] text-clay-muted">
              Live persistent conversation state · {messages.length} messages logged
            </p>
          </div>
        </div>
        <button
          id="refresh-memory"
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh memory"
          className="p-2 rounded-xl bg-clay-input border border-clay-border text-clay-muted hover:text-clay-fg transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Insight banner */}
      {memoryInsight && (
        <div className={`mx-6 mt-5 flex items-start gap-3 text-xs p-4 rounded-xl border
          ${adaptedFromMemory
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-clay-input border-clay-border text-clay-muted'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">
              {adaptedFromMemory ? 'Memory Active & Adapted ✓' : 'Initializing Memory'}
            </span>
            {memoryInsight}
          </div>
        </div>
      )}

      {/* Message list */}
      <div className="p-6 space-y-3.5 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-clay-muted text-xs">
            <Database className="w-8 h-8 mx-auto mb-2 opacity-30 text-brand-periwinkle" />
            No conversation history logged yet.
            <br />
            Generate your first draft to start building persistent Minds memory.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="flex gap-3">
              <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 border
                ${msg.role === 'assistant'
                  ? 'bg-brand-periwinkle/10 border-brand-periwinkle/30 text-brand-periwinkle'
                  : 'bg-clay-input border-clay-border text-clay-muted'
                }`}
              >
                {msg.role === 'assistant'
                  ? <Bot className="w-4 h-4" />
                  : <User className="w-4 h-4" />
                }
              </div>

              <div className={`flex-1 rounded-xl p-3.5 text-xs leading-relaxed border
                ${msg.role === 'assistant'
                  ? 'bg-[#1C1A19] border-brand-periwinkle/20 text-clay-fg'
                  : 'bg-clay-input border-clay-border text-clay-muted'
                }`}
              >
                {msg.content.length > 250
                  ? msg.content.substring(0, 250) + '...'
                  : msg.content
                }
                {msg.timestamp && (
                  <div className="text-[10px] text-clay-muted mt-1.5">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3.5 border-t border-clay-border/60 bg-[#1F1C1B]">
        <p className="text-[11px] text-clay-muted leading-relaxed">
          State is stored natively in Minds. Every approval updates this history thread,
          giving Prismo persistent memory across sessions.
        </p>
      </div>
    </div>
  );
};
