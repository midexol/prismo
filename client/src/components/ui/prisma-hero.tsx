// ─────────────────────────────────────────────────────────────────────────────
// prisma-hero.tsx — 100% Edge-to-Edge Full-Bleed Hero (No Double Nav, No Gutters)
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
            style={{ marginRight: isLast ? 0 : "0.2em" }}
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

/* ---------------- Hero Component ---------------- */
interface PrismaHeroProps {
  onStartRepurposing?: () => void;
}

const PrismaHero = ({ onStartRepurposing }: PrismaHeroProps) => {
  return (
    <section className="relative h-[92vh] md:h-screen w-full overflow-hidden bg-[#0D0C0C]">
      
      {/* Background video — 100% full screen edge-to-edge */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] saturate-110"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0D0C0C]" />

      {/* Hero Content — Pinned to bottom left and right */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 sm:px-12 md:px-16 z-10">
        <div className="grid grid-cols-12 items-end gap-6 max-w-7xl mx-auto">
          
          <div className="col-span-12 lg:col-span-7">
            <h1
              className="font-display font-extrabold leading-[0.82] tracking-[-0.07em] text-[26vw] sm:text-[22vw] md:text-[18vw] lg:text-[14vw] xl:text-[13vw]"
              style={{ color: "#F5F4F1" }}
            >
              <WordsPullUp text="Prismo" showAsterisk />
            </h1>
          </div>

          <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-5 lg:pb-4">
            
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
              className="group inline-flex items-center gap-3 self-start rounded-full bg-[#818CF8] py-3.5 pl-7 pr-2.5 text-sm font-bold text-black transition-all hover:bg-[#939BF4] hover:gap-4 shadow-xl shadow-indigo-500/30"
            >
              Split Your First Video
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D0C0C] transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4" style={{ color: "#F5F4F1" }} />
              </span>
            </motion.button>

          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
