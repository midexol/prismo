// ─────────────────────────────────────────────────────────────────────────────
// prisma-hero.tsx — Full-Bleed Media First Hero (Borderless & Modern Font)
// Located at: client/src/components/ui/prisma-hero.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
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
            style={{ marginRight: isLast ? 0 : "0.22em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#818CF8]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 24, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block font-display ${w.className ?? ""}`}
          style={{ marginRight: "0.22em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero Component ---------------- */
interface PrismaHeroProps {
  onStartRepurposing?: () => void;
  onExploreVirality?: () => void;
  onSelectTab?: (tab: 'studio' | 'resonance' | 'analytics' | 'memory') => void;
}

const navItems = [
  { label: "Studio", tab: "studio" },
  { label: "Virality Simulator", tab: "resonance" },
  { label: "Analysis", tab: "analytics" },
  { label: "Memory Log", tab: "memory" },
] as const;

const PrismaHero = ({ onStartRepurposing, onSelectTab }: PrismaHeroProps) => {
  return (
    <section className="min-h-[88vh] md:min-h-screen w-full relative mb-12">
      {/* Full-bleed edge-to-edge container without inner border lines */}
      <div className="relative h-full min-h-[88vh] md:min-h-screen w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-[#0D0C0C]">
        
        {/* Background video — full attraction of the hero */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover filter brightness-[0.85] saturate-110"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Gradient overlay for text contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0D0C0C]" />

        {/* Hero Navbar — Borderless floating pill */}
        <nav className="absolute left-1/2 top-4 z-20 -translate-x-1/2">
          <div className="flex items-center gap-4 rounded-full bg-black/60 backdrop-blur-lg px-6 py-2.5 sm:gap-8 md:px-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onSelectTab && onSelectTab(item.tab)}
                className="text-xs transition-colors sm:text-sm font-semibold tracking-wide"
                style={{ color: "rgba(245, 244, 241, 0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#818CF8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 244, 241, 0.75)")}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 md:px-14 z-10">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-7">
              <h1
                className="font-display font-extrabold leading-[0.85] tracking-[-0.06em] text-[24vw] sm:text-[22vw] md:text-[18vw] lg:text-[14vw] xl:text-[13vw]"
                style={{ color: "#F5F4F1" }}
              >
                <WordsPullUp text="Prismo" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-5 lg:pb-6">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-[#F5F4F1]/90 sm:text-base md:text-lg leading-relaxed font-sans font-normal"
              >
                One YouTube video splits into native X Threads, LinkedIn posts, and Shorts. Powered by Minds AI that remembers your creator voice and evolves with every approval.
              </motion.p>

              <motion.button
                onClick={onStartRepurposing}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#818CF8] py-3 pl-7 pr-2 text-sm font-bold text-black transition-all hover:bg-[#939BF4] hover:gap-4 shadow-lg shadow-indigo-500/25"
              >
                Split Your First Video
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D0C0C] transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" style={{ color: "#F5F4F1" }} />
                </span>
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
