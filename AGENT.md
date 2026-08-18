# AGENT.md — Prismo Minds Agent Directive

> Read this file first if you are an AI coding assistant working on this project.

---

## What This Project Does

**Prismo** converts YouTube video transcripts into multi-platform content (X Thread, LinkedIn, YouTube Shorts) using a real Minds Agent. The agent uses its conversation history as persistent memory — it learns a creator's preferred hook styles over time and adapts future outputs.

This is a submission for **Creative Minds Jam #1** by Minds/Animoca Brands.

---

## Backend Architecture

```
server/ (Node.js + Express)
     |
     |-- youtube-transcript (npm) -> Fetches YouTube transcript
     |-- minds-client-lib (official SDK) -> Interacts with Minds AI Agent
     |-- POST /api/repurpose -> Processes video & generates drafts
     |-- POST /api/approve -> Sends creator feedback to Minds conversation
     |-- GET /api/memory -> Returns Minds conversation history
```

---

## Key Files & Their Purpose

| File | What it does |
| :--- | :--- |
| `server/index.ts` | Express server — defines all API routes |
| `server/transcript.ts` | Fetches YouTube transcript via `youtube-transcript` npm package |
| `server/minds.ts` | All Minds Agent interactions (send message, wait for reply, get history) |

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

The Minds conversation IS the persistent memory — every approval the creator makes is sent as a message, so the agent can reference it in future sessions.

---

## Critical Rules for AI Agents

1. **Never mock the Minds API** — every Minds call must be real. The persistence demo depends on it.
2. **Keep the conversation alias** `'repurpose-main'` consistent — this is how memory persists.
3. **Do not change the JSON format** the server expects from the Minds Agent — see `server/minds.ts` for the schema.
4. **Run `npx tsc --noEmit` in `server/`** before declaring done.
5. **Do not commit `.env`** — it is in `.gitignore` for a reason.

---

## Running Backend Server Locally

```bash
cd server
npm install
npx tsx index.ts   # runs Express server on port 3001
```
