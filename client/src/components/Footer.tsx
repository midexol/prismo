// ─────────────────────────────────────────────────────────────────────────────
// Footer.tsx — Minimal Dark High-End Footer (Matching Design Reference)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Twitter, Github, Disc as Discord, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tab: 'studio' | 'resonance' | 'analytics' | 'memory') => void;
  onOpenAuth?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAuth }) => {
  return (
    <footer className="w-full bg-[#0D0C0C] text-[#F5F4F1] border-t border-white/5 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Intro Section */}
        <div className="max-w-3xl space-y-4">
          <h3 className="text-2xl font-display font-extrabold tracking-tight text-[#F5F4F1]">
            Prismo
          </h3>
          <p className="text-xs md:text-sm text-[#8C8782] leading-relaxed font-sans font-normal">
            Welcome to Prismo, where longform video meets autonomous AI repurposing. We empower digital creators, filmmakers, and storytellers to split YouTube content into native X Threads, LinkedIn posts, and Shorts — backed by persistent Minds AI memory that adapts to your voice over time.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/5" />

        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs">

          {/* Col 1: Product */}
          <div className="space-y-3">
            <h4 className="font-display font-bold uppercase tracking-wider text-[11px] text-[#F5F4F1]">
              Product
            </h4>
            <ul className="space-y-2 text-[#8C8782]">
              <li>
                <button onClick={() => onSelectTab && onSelectTab('studio')} className="hover:text-[#F5F4F1] transition-colors">
                  Repurpose Studio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('resonance')} className="hover:text-[#F5F4F1] transition-colors">
                  Virality Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('analytics')} className="hover:text-[#F5F4F1] transition-colors">
                  Intelligence Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab && onSelectTab('memory')} className="hover:text-[#F5F4F1] transition-colors">
                  Minds Memory Log
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Features */}
          <div className="space-y-3">
            <h4 className="font-display font-bold uppercase tracking-wider text-[11px] text-[#F5F4F1]">
              Features
            </h4>
            <ul className="space-y-2 text-[#8C8782]">
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Angle Targeting</span></li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Quote Extraction</span></li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Voice Alignment</span></li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Cross-Platform Fit</span></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="font-display font-bold uppercase tracking-wider text-[11px] text-[#F5F4F1]">
              Resources
            </h4>
            <ul className="space-y-2 text-[#8C8782]">
              <li>
                <a href="https://build.hellominds.ai" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
                  Minds Builder Hub
                </a>
              </li>
              <li>
                <a href="https://creativemindsjam.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
                  Creative Minds Jam #1
                </a>
              </li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">System Prompt</span></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="font-display font-bold uppercase tracking-wider text-[11px] text-[#F5F4F1]">
              Company
            </h4>
            <ul className="space-y-2 text-[#8C8782]">
              <li>
                <a href="https://www.animocabrands.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
                  Animoca Brands
                </a>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-[#F5F4F1] transition-colors">
                  Creator Account
                </button>
              </li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-[#F5F4F1] transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>

          {/* Col 5: Social Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold uppercase tracking-wider text-[11px] text-[#F5F4F1]">
              Social Links
            </h4>
            <ul className="space-y-2 text-[#8C8782]">
              <li className="flex items-center gap-2 hover:text-[#F5F4F1] cursor-pointer">
                <Twitter className="w-3.5 h-3.5" /> Twitter / X
              </li>
              <li className="flex items-center gap-2 hover:text-[#F5F4F1] cursor-pointer">
                <Github className="w-3.5 h-3.5" /> GitHub
              </li>
              <li className="flex items-center gap-2 hover:text-[#F5F4F1] cursor-pointer">
                <Discord className="w-3.5 h-3.5" /> Discord
              </li>
              <li className="flex items-center gap-2 hover:text-[#F5F4F1] cursor-pointer">
                <Youtube className="w-3.5 h-3.5" /> YouTube
              </li>
              <li className="flex items-center gap-2 hover:text-[#F5F4F1] cursor-pointer">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </li>
            </ul>
          </div>

        </div>

        {/* Social Icon Bar & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C8782]">

          <div className="flex items-center gap-5 text-[#8C8782]">
            <a href="https://x.com/hellominds_" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://github.com/midexol/prismo" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://hellominds.ai" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
              <Discord className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F5F4F1] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] font-mono">
            © 2026 Prismo. All rights reserved. Powered by Minds by Animoca Brands.
          </p>
        </div>

      </div>
    </footer>
  );
};
