# RepurposeAI 🎬→📱

> **Creative Minds Jam #1 Submission** | Built with [Minds by Animoca Brands](https://hellominds.ai)

Turn any YouTube video into platform-native content for **X (Twitter)**, **LinkedIn**, and **YouTube Shorts** — in seconds. Powered by a Minds Agent that **remembers your preferences** across sessions and gets smarter every time you use it.

---

## 🧠 How It Works

```
You paste a YouTube URL
         ↓
Backend fetches the real video transcript
         ↓
Your Minds Agent reads it + checks conversation memory
(Did the creator prefer contrarian hooks last time? It remembers.)
         ↓
Agent generates 3 native drafts (X Thread / LinkedIn / YT Shorts)
         ↓
You approve what you like
         ↓
Approval is sent back to Minds — agent learns your style
(Next time you use it, drafts already match your taste)
```

---

## 📁 Project Structure

```
repurpose-ai/
├── README.md          ← You are here
├── AGENT.md           ← Guide for AI coding assistants
├── MINDS_SETUP.md     ← How to configure your Minds Agent
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
        ├── App.tsx    ← Main page
        └── components/
            ├── InputPanel.tsx    ← YouTube URL input
            ├── DraftCard.tsx     ← Shows generated content
            ├── MemoryPanel.tsx   ← Shows what agent remembers
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
Read **[MINDS_SETUP.md](./MINDS_SETUP.md)** first. This takes about 5 minutes and gives your agent its "brain".

### Step 3 — Add your API key
```bash
# Copy the example file
cp .env.example server/.env

# Open server/.env and paste your Minds Builder API Key
```

### Step 4 — Install everything
```bash
# From the root folder (repurpose-ai/)
npm run install:all
```

### Step 5 — Run it
```bash
# This starts BOTH the backend server AND the frontend at once
npm run dev
```

Then open your browser to: **http://localhost:5173**

---

## 🛠️ Tech Stack

| What | Tool | Why |
| :--- | :--- | :--- |
| AI Agent | Minds by Animoca Brands | Native Minds integration — required for hackathon |
| Transcript | `youtube-transcript` npm package | Free, no API key, works instantly |
| Backend | Node.js + Express | Handles CORS + secret API keys |
| Frontend | React + Vite + TailwindCSS | Fast, beautiful UI |

---

## ❓ Common Issues

**"No Minds found on this account"**
→ Go to hellominds.ai, create a Mind, then try again.

**"Transcript not available"**
→ The YouTube video must have captions enabled. Try a different video.

**"MINDS_BUILDER_API_KEY is not set"**
→ Make sure you created `server/.env` from `.env.example` and added your key.

**"Node version too old"**
→ The Minds client library requires Node 22+. Update from nodejs.org.
