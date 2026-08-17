// ─────────────────────────────────────────────────────────────
// minds.ts
// All interactions with your Minds Agent live here.
// Uses the official @animocabrands/minds-client-lib package.
//
// HOW MINDS MEMORY WORKS:
// The agent's "memory" is simply its conversation history.
// Every message you send (including approvals) is stored by Minds.
// When you ask the agent to repurpose new content, it reads the
// conversation history and knows what you liked before.
// This is the "Persistence Loop" that wins the hackathon.
// ─────────────────────────────────────────────────────────────

import { createMindsClient } from '@animocabrands/minds-client-lib';

// This alias identifies the conversation thread.
// Using a consistent alias means the agent always picks up where it left off.
const CONVERSATION_ALIAS = 'repurpose-main';

// The shape of the JSON our Minds Agent is trained to return
export interface MindsRepurposeResult {
  adapted_from_memory: boolean;    // Did the agent reference past approvals?
  memory_insight: string;          // What did it remember / learn?
  drafts: {
    twitter: {
      hook: string;
      thread: string[];
      cta: string;
    };
    linkedin: {
      hook: string;
      body: string;
      cta: string;
    };
    youtube_shorts: {
      hook: string;
      script: string;
      cta: string;
    };
  };
}

// A single conversation message (for the memory panel in the UI)
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

// ─── Create a Minds client from your API key ───────────────────────────────
function getClient() {
  const key = process.env.MINDS_BUILDER_API_KEY;
  if (!key || key === 'paste_your_key_here') {
    throw new Error(
      'MINDS_BUILDER_API_KEY is not set. ' +
      'Open server/.env and add your key from build.hellominds.ai/console'
    );
  }
  return createMindsClient({ builderApiKey: key });
}

// ─── Shared helper: get your Mind's ID ────────────────────────────────────
async function getMindId(): Promise<string> {
  const client = getClient();
  const minds = await client.listMinds();
  if (!minds || minds.length === 0) {
    throw new Error(
      'No Minds found on your account. ' +
      'Go to hellominds.ai, create a Mind, then try again.'
    );
  }
  return minds[0]!.mindId;
}

// ─── Main function: ask the agent to repurpose a transcript ───────────────
export async function repurposeWithMinds(
  transcript: string,
  niche: string,
  angle: string = 'contrarian'
): Promise<MindsRepurposeResult> {
  const client = getClient();
  const mindId = await getMindId();

  await client.ensureConversation(CONVERSATION_ALIAS, mindId);

  const prompt = `CREATOR NICHE: ${niche}
TARGET ANGLE: ${angle.toUpperCase()}

TRANSCRIPT:
${transcript}

Please repurpose this into 3 platform-native content pieces following your instructions.
Return ONLY valid JSON — no extra text before or after.`;

  // Send the message to the Minds Agent
  await client.sendMessage({
    alias: CONVERSATION_ALIAS,
    messageText: prompt,
  });

  // Wait for the agent's reply (up to 90 seconds)
  const { reply, timedOut } = await client.waitForReply({
    alias: CONVERSATION_ALIAS,
  });

  if (timedOut || !reply) {
    throw new Error(
      'The Minds Agent took too long to respond. ' +
      'Check your Mind is set up correctly in build.hellominds.ai'
    );
  }

  // Extract the JSON block from the reply
  const jsonMatch = reply.match(/\{[\s\S]*\}/);
  if (!jsonMatch || !jsonMatch[0]) {
    throw new Error(
      `The Minds Agent returned an unexpected format. Raw reply:\n${reply}`
    );
  }

  return JSON.parse(jsonMatch[0]) as MindsRepurposeResult;
}

// ─── Send approval feedback to the agent so it learns ─────────────────────
// This is what makes the persistence loop real:
// By sending approvals as messages, the agent's next reply will
// reference what you liked, because it reads conversation history.
export async function sendApprovalToMinds(
  platform: string,
  hookStyle: string,
  hook: string
): Promise<void> {
  const client = getClient();
  const mindId = await getMindId();

  await client.ensureConversation(CONVERSATION_ALIAS, mindId);

  // The format "APPROVED:" is something the Soul prompt is trained to look for
  const feedbackMessage =
    `APPROVED: The creator liked the ${platform.toUpperCase()} draft.\n` +
    `Hook style used: ${hookStyle}\n` +
    `Hook text: "${hook}"\n` +
    `Remember this preference for future repurposing sessions.`;

  await client.sendMessage({
    alias: CONVERSATION_ALIAS,
    messageText: feedbackMessage,
  });

  // We don't need to wait for a reply on approvals
}

// ─── Get the full conversation history (shown in the Memory Panel) ─────────
export async function getConversationHistory(): Promise<ConversationMessage[]> {
  try {
    const client = getClient();
    const mindId = await getMindId();
    await client.ensureConversation(CONVERSATION_ALIAS, mindId);

    const history = await client.getConversationHistory({
      alias: CONVERSATION_ALIAS,
    });

    // Normalize into a simple shape for the frontend
    return (history || []).map((msg: { role?: string; content?: string; text?: string; timestamp?: string }) => ({
      role: (msg.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: (msg.content || msg.text || '').substring(0, 500), // truncate for display
      timestamp: msg.timestamp,
    }));
  } catch {
    // If history isn't available yet, just return empty
    return [];
  }
}
