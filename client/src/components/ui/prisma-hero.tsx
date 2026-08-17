// ─────────────────────────────────────────────────────────────────────────────
// prisma-hero.tsx — Clean Text-Only Full-Bleed Hero (Zero Overlap)
// Located at: client/src/components/ui/prisma-hero.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative font-display font-extrabold"
            style={{ marginRight: isLast ? 0 : "0.2em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Hero Component ---------------- */
interface PrismaHeroProps {
  onStartRepurposing?: () => void;
}

const PrismaHero = ({ onStartRepurposing }: PrismaHeroProps) => {
  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-[#0D0C0C]">
      
      {/* Background video — 100% full screen edge-to-edge */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover filter brightness-[0.75] saturate-110"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Gradient overlay for strong text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0D0C0C]" />

      {/* Hero Content — Pinned neatly at bottom without overlap */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 sm:px-12 md:px-16 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Main Title */}
          <div className="max-w-2xl">
            <h1 className="font-display font-extrabold tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5F4F1]">
              <WordsPullUp text="Prismo" />
            </h1>
          </div>

          {/* Text Description & Action Button */}
          <div className="max-w-md space-y-6">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base text-[#F5F4F1]/90 leading-relaxed font-sans"
            >
              One YouTube video splits into native X Threads, LinkedIn posts, and Shorts. Powered by Minds AI that remembers your creator voice and evolves with every approval.
            </motion.p>

            <motion.button
              onClick={onStartRepurposing}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#818CF8] hover:bg-[#939BF4] text-black text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/25"
            >
              Start Repurposing
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
