# AGENT.md — RepurposeAI Coding Agent Directive

> Read this file first if you are an AI coding assistant working on this project.

---

## What This Project Does

**RepurposeAI** converts YouTube video transcripts into multi-platform content (X Thread, LinkedIn, YouTube Shorts) using a real Minds Agent. The agent uses its conversation history as persistent memory — it learns a creator's preferred hook styles over time and adapts future outputs.

This is a hackathon submission for **Creative Minds Jam #1** by Minds/Animoca Brands.

---

## Architecture

```
client/ (React + Vite)         server/ (Node.js + Express)
     |                                  |
     |-- POST /api/repurpose ---------> |-- youtube-transcript (npm)
     |                                  |-- minds-client-lib (official SDK)
     |-- POST /api/approve -----------> |-- sends feedback to Minds conversation
     |                                  |
     |-- GET /api/memory  -----------> |-- returns Minds conversation history
```

---

## Key Files & Their Purpose

| File | What it does |
| :--- | :--- |
| `server/index.ts` | Express server — defines all API routes |
| `server/transcript.ts` | Fetches YouTube transcript via `youtube-transcript` npm package |
| `server/minds.ts` | All Minds Agent interactions (send message, wait for reply, get history) |
| `client/src/App.tsx` | Main React app — holds all state, calls the server API |
| `client/src/components/InputPanel.tsx` | YouTube URL + niche input form |
| `client/src/components/DraftCard.tsx` | Renders one platform draft (approve / regenerate actions) |
| `client/src/components/MemoryPanel.tsx` | Shows Minds conversation history (the persistence proof) |
| `client/src/components/LoadingState.tsx` | Animated loading screen during generation |

---

## Environment Variables

All env vars live in `server/.env` (copied from `.env.example`).

| Variable | Required | Description |
| :--- | :--- | :--- |
| `MINDS_BUILDER_API_KEY` | ✅ Yes | Minds Builder API key from build.hellominds.ai/console |
| `SERVER_PORT` | No (default 3001) | Port for the Express server |

---

## Minds API Integration

Uses the official `@animocabrands/minds-client-lib` npm package.

```typescript
// Pattern used throughout server/minds.ts:
const client = createMindsClient({ builderApiKey: process.env.MINDS_BUILDER_API_KEY });
const minds  = await client.listMinds();
const mindId = minds[0].mindId;
await client.ensureConversation('repurpose-main', mindId);
await client.sendMessage({ alias: 'repurpose-main', messageText: prompt });
const { reply } = await client.waitForReply({ alias: 'repurpose-main' });
```

The Minds conversation IS the persistent memory — every approval the user makes is sent as a message, so the agent can reference it in future sessions.

---

## Critical Rules for AI Agents

1. **Never mock the Minds API** — every Minds call must be real. The persistence demo depends on it.
2. **Keep the conversation alias** `'repurpose-main'` consistent — this is how memory persists.
3. **Do not change the JSON format** the server expects from the Minds Agent — see `server/minds.ts` for the schema.
4. **Run `npm run build` in `client/`** and `npx tsc --noEmit` in `server/` before declaring done.
5. **Do not commit `.env`** — it is in `.gitignore` for a reason.

---

## Running Locally

```bash
# From root folder
npm run install:all  # installs everything
npm run dev          # runs server (port 3001) + client (port 5173) together
```
