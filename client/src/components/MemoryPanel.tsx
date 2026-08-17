// ─────────────────────────────────────────────────────────────────────────────
// MemoryPanel.tsx
// Shows the Minds Agent's conversation history — the live proof of persistence.
// This is what judges will look at to verify the "memory continuity" criterion.
//
// Each message in the list is a real message stored in the Minds conversation.
// Approval messages appear here too, showing the agent "learned" from the creator.
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
  memoryInsight: string;          // What the agent says it remembered
  adaptedFromMemory: boolean;     // Did the agent actually use past memory?
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
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">

      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Minds Memory</h3>
            <p className="text-[10px] text-slate-500">
              Live conversation history · {messages.length} messages
            </p>
          </div>
        </div>
        <button
          id="refresh-memory"
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh memory"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800
                     transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Memory insight banner — shown when agent adapted from past sessions */}
      {memoryInsight && (
        <div className={`mx-4 mt-4 flex items-start gap-2.5 text-xs p-3 rounded-xl border
          ${adaptedFromMemory
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">
              {adaptedFromMemory ? 'Memory Used ✓' : 'No Memory Yet'}
            </span>
            {memoryInsight}
          </div>
        </div>
      )}

      {/* Conversation messages */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-slate-600 text-xs">
            <Database className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No conversation history yet.
            <br />
            Generate your first draft to start building memory.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="flex gap-2.5">
              {/* Role icon */}
              <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                ${msg.role === 'assistant'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-slate-700 text-slate-300'
                }`}
              >
                {msg.role === 'assistant'
                  ? <Bot className="w-3.5 h-3.5" />
                  : <User className="w-3.5 h-3.5" />
                }
              </div>

              {/* Message bubble */}
              <div className={`flex-1 rounded-xl px-3 py-2 text-[11px] leading-relaxed
                ${msg.role === 'assistant'
                  ? 'bg-purple-500/10 border border-purple-500/20 text-purple-200'
                  : 'bg-slate-800/80 border border-slate-700/50 text-slate-300'
                }`}
              >
                {/* Truncate long messages */}
                {msg.content.length > 200
                  ? msg.content.substring(0, 200) + '...'
                  : msg.content
                }
                {msg.timestamp && (
                  <div className="text-[9px] text-slate-600 mt-1">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer explaining what this panel proves */}
      <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/30">
        <p className="text-[10px] text-slate-600 leading-relaxed">
          This conversation is stored natively in Minds. Every approval you make updates this history,
          giving the agent persistent memory across sessions.
        </p>
      </div>
    </div>
  );
};
