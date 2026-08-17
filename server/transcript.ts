// ─────────────────────────────────────────────────────────────
// transcript.ts
// Fetches the real spoken transcript from any public YouTube video.
// Uses the youtube-transcript npm package (free, no API key needed).
// ─────────────────────────────────────────────────────────────

import { YoutubeTranscript } from 'youtube-transcript';

// Pull just the video ID from a full YouTube URL
// Works with:  https://www.youtube.com/watch?v=abc123
//              https://youtu.be/abc123
//              https://youtube.com/shorts/abc123
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1] ?? null;
  }
  return null;
}

// Fetch the transcript and combine all the chunks into one clean string
export async function fetchTranscript(youtubeUrl: string): Promise<string> {
  const videoId = extractVideoId(youtubeUrl);

  if (!videoId) {
    throw new Error(
      'Could not find a valid YouTube video ID in that URL. ' +
      'Please use a standard youtube.com or youtu.be link.'
    );
  }

  let chunks;
  try {
    chunks = await YoutubeTranscript.fetchTranscript(videoId);
  } catch (err) {
    throw new Error(
      'Could not fetch transcript for this video. ' +
      'Make sure the video is public and has captions/subtitles enabled.'
    );
  }

  if (!chunks || chunks.length === 0) {
    throw new Error(
      'This video has no captions available. ' +
      'Try a different video that has subtitles enabled.'
    );
  }

  // Join all transcript chunks into clean readable text
  const fullText = chunks
    .map((chunk) => chunk.text.trim())
    .join(' ')
    .replace(/\s+/g, ' ')         // collapse multiple spaces
    .trim();

  // Cap at 4000 characters to avoid overloading the Minds Agent
  return fullText.length > 4000
    ? fullText.substring(0, 4000) + '...[transcript truncated]'
    : fullText;
}
