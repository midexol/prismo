// ─────────────────────────────────────────────────────────────────────────────
// MemoryPanel.tsx — Text-Only Minds Memory Inspector (Zero Icons)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

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
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#1B1918]">
        <div>
          <h3 className="text-sm font-bold text-[#F5F4F1]">Minds Memory Inspector</h3>
          <p className="text-[11px] text-[#8C8782]">
            Live persistent conversation state · {messages.length} messages logged
          </p>
        </div>
        <button
          id="refresh-memory"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-clay-input border border-white/5 text-[#8C8782] hover:text-[#F5F4F1] transition-all disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Insight banner */}
      {memoryInsight && (
        <div className={`mx-6 mt-5 p-4 rounded-xl text-xs border ${
          adaptedFromMemory
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-clay-input border-white/5 text-[#8C8782]'
        }`}>
          <span className="font-bold block mb-0.5">
            {adaptedFromMemory ? 'Memory Active & Adapted' : 'Initializing Memory'}
          </span>
          {memoryInsight}
        </div>
      )}

      {/* Message list */}
      <div className="p-6 space-y-3.5 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-[#8C8782] text-xs">
            No conversation history logged yet.
            <br />
            Generate your first draft to start building persistent Minds memory.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C8782]">
                {msg.role === 'assistant' ? 'Minds Agent' : 'Creator Input'}
              </div>

              <div className={`rounded-xl p-3.5 text-xs leading-relaxed border ${
                msg.role === 'assistant'
                  ? 'bg-[#1C1A19] border-brand-periwinkle/20 text-[#F5F4F1]'
                  : 'bg-clay-input border-white/5 text-[#8C8782]'
              }`}>
                {msg.content.length > 250
                  ? msg.content.substring(0, 250) + '...'
                  : msg.content
                }
                {msg.timestamp && (
                  <div className="text-[10px] text-[#8C8782] mt-1.5">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3.5 border-t border-white/5 bg-[#1B1918]">
        <p className="text-[11px] text-[#8C8782] leading-relaxed">
          State is stored natively in Minds. Every approval updates this history thread,
          giving Prismo persistent memory across sessions.
        </p>
      </div>
    </div>
  );
};
