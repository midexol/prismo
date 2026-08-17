# Prismo

> **Creative Minds Jam #1 Submission** | Built with [Minds by Animoca Brands](https://hellominds.ai)

**One video. Three platforms. Done.**

Paste a YouTube URL. Prismo's Minds Agent reads the transcript, checks what hooks you've approved before, and generates native content for **X (Twitter)**, **LinkedIn**, and **YouTube Shorts** — in seconds. The more you use it, the smarter it gets.

---

## 🧠 How Prismo Works

```
You paste a YouTube URL
         ↓
Backend fetches the real video transcript
         ↓
Prismo's Minds Agent reads it + checks conversation memory
(Did you prefer contrarian hooks last time? It remembers.)
         ↓
Agent generates 3 native drafts (X Thread / LinkedIn / YT Shorts)
         ↓
You approve what you like
         ↓
Approval is sent back to Minds — agent learns your style
(Next time, drafts already match your taste from session 1)
```

---

## 📁 Project Structure

```
prismo/
├── README.md          ← You are here
├── AGENT.md           ← Guide for AI coding assistants
├── MINDS_SETUP.md     ← How to configure your Minds Agent (START HERE)
├── .env.example       ← Template for your API key
├── package.json       ← Root scripts (run both apps at once)
│
├── server/            ← Node.js backend (handles Minds API + YouTube)
│   ├── index.ts       ← Express server (the API)
│   ├── transcript.ts  ← Fetches YouTube transcripts
│   └── minds.ts       ← Talks to your Minds Agent
│
└── client/            ← React frontend (the UI you see)
    └── src/
        ├── App.tsx               ← Main page
        └── components/
            ├── InputPanel.tsx    ← YouTube URL input
            ├── DraftCard.tsx     ← Shows generated content
            ├── MemoryPanel.tsx   ← Shows what the agent remembers
            └── LoadingState.tsx  ← Loading animation
```

---

## 🚀 Getting Started (Step by Step)

### Step 1 — Check your Node.js version
This project requires **Node.js version 22 or higher**.

```bash
node --version
# Should print: v22.x.x or higher
# If not, download from: https://nodejs.org
```

### Step 2 — Set up your Minds Agent
Read **[MINDS_SETUP.md](./MINDS_SETUP.md)** first. This takes about 5 minutes and gives Prismo its brain.

### Step 3 — Add your API key
```bash
# Copy the example env file into the server folder
copy .env.example server\.env

# Open server/.env and paste your Minds Builder API Key
```

### Step 4 — Install everything
```bash
# From the root folder
npm run install:all
```

### Step 5 — Run it
```bash
# Starts BOTH the backend and the frontend at once
npm run dev
```

Then open your browser to: **http://localhost:5173**

---

## 🛠️ Tech Stack

| What | Tool | Why |
| :--- | :--- | :--- |
| AI Agent | Minds by Animoca Brands | Native Minds integration — core of the product |
| Transcript | `youtube-transcript` npm package | Free, no API key, works instantly |
| Backend | Node.js + Express | Handles secret API keys + CORS |
| Frontend | React + Vite + TailwindCSS | Fast, beautiful UI |

---

## ❓ Common Issues

**"No Minds found on this account"**
→ Go to hellominds.ai, create a Mind, then try again.

**"Transcript not available"**
→ The video must have captions enabled. Try a different video.

**"MINDS_BUILDER_API_KEY is not set"**
→ Make sure you created `server/.env` from `.env.example` and added your key.

**"Node version too old"**
→ Prismo requires Node 22+. Update from nodejs.org.
