// ─────────────────────────────────────────────────────────────
// index.ts — RepurposeAI Backend Server
//
// This Express server acts as a bridge between:
//   • The React frontend (client/)
//   • The YouTube transcript API
//   • Your Minds Agent
//
// Why do we need a backend at all?
// 1. API keys must be kept secret — never in the browser
// 2. The youtube-transcript package has CORS restrictions in browsers
// 3. The Minds client library requires Node.js ≥ 22
// ─────────────────────────────────────────────────────────────

import 'dotenv/config';             // Load .env file first
import express from 'express';
import cors from 'cors';
import { fetchTranscript } from './transcript.ts';
import {
  repurposeWithMinds,
  sendApprovalToMinds,
  getConversationHistory,
} from './minds.ts';

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow the React dev server

// ── Health check ─────────────────────────────────────────────
// Visit http://localhost:3001/api/health to confirm the server is running
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'RepurposeAI server is running!' });
});

// ── POST /api/repurpose ───────────────────────────────────────
// Main endpoint: takes a YouTube URL + creator niche,
// fetches the transcript, sends it to the Minds Agent,
// and returns the structured drafts.
//
// Request body:  { url: string, niche: string }
// Response:      { drafts, adapted_from_memory, memory_insight, transcript_preview }
app.post('/api/repurpose', async (req, res) => {
  const { url, niche } = req.body as { url?: string; niche?: string };

  // Basic validation
  if (!url || !url.trim()) {
    return res.status(400).json({ error: 'Please provide a YouTube URL.' });
  }
  if (!niche || !niche.trim()) {
    return res.status(400).json({ error: 'Please describe your creator niche.' });
  }

  try {
    console.log(`\n📹 Fetching transcript for: ${url}`);
    const transcript = await fetchTranscript(url.trim());
    console.log(`✅ Transcript fetched (${transcript.length} chars)`);

    console.log(`🧠 Sending to Minds Agent...`);
    const result = await repurposeWithMinds(transcript, niche.trim());
    console.log(`✅ Minds Agent responded (adapted_from_memory: ${result.adapted_from_memory})`);

    return res.json({
      ...result,
      transcript_preview: transcript.substring(0, 200) + '...',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(`❌ Error in /api/repurpose: ${message}`);
    return res.status(500).json({ error: message });
  }
});

// ── POST /api/approve ─────────────────────────────────────────
// Called when the creator clicks "Approve" on a draft.
// Sends a feedback message to the Minds conversation so the agent
// remembers this preference in future sessions.
//
// Request body: { platform: string, hookStyle: string, hook: string }
// Response:     { success: true }
app.post('/api/approve', async (req, res) => {
  const { platform, hookStyle, hook } = req.body as {
    platform?: string;
    hookStyle?: string;
    hook?: string;
  };

  if (!platform || !hook) {
    return res.status(400).json({ error: 'Missing platform or hook.' });
  }

  try {
    console.log(`\n👍 Approval sent to Minds: [${platform}] "${hook.substring(0, 60)}..."`);
    await sendApprovalToMinds(platform, hookStyle || 'unknown', hook);
    return res.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(`❌ Error in /api/approve: ${message}`);
    return res.status(500).json({ error: message });
  }
});

// ── GET /api/memory ───────────────────────────────────────────
// Returns the Minds conversation history.
// Used by the MemoryPanel in the UI to show what the agent remembers.
//
// Response: { messages: ConversationMessage[] }
app.get('/api/memory', async (_req, res) => {
  try {
    const messages = await getConversationHistory();
    return res.json({ messages });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not load memory.';
    return res.status(500).json({ error: message });
  }
});

// ── Start the server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 RepurposeAI server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
