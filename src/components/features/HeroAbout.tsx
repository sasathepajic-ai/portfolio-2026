"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OXOGame from "./OXOGame";

const BOOT_LINES = [
  "BIOS v2.26.0  Copyright (C) 1997-2026 Portfolio Systems Inc.",
  "CPU: sasathepajic.ai-CORE x64  3.2GHz  [OK]",
  "RAM: 16384MB DDR5  [OK]",
  "Storage: NVMe 512GB  [OK]",
  "Loading kernel modules...",
  "  \u251C\u2500\u2500 creativity.ko  [OK]",
  "  \u251C\u2500\u2500 problem-solver.ko  [OK]",
  "  \u251C\u2500\u2500 fullstack-dev.ko  [OK]",
  "  \u2514\u2500\u2500 ai-engineer.ko  [OK]",
  "Mounting filesystems...",
  "Starting system services...",
  "Network interface eth0: UP  192.168.2026.1",
  "",
  "Portfolio OS v2026.03  \u2014  All systems nominal.",
  "Type a command or scroll to explore.",
];

interface HeroProps {
  hero: {
    content: {
      greeting: string;
      headline: string;
      subheadline: string;
      ctaText?: string;
      ctaLink?: string;
      secondaryCtaText?: string;
      secondaryCtaLink?: string;
    };
  };
  about: {
    content: {
      bio: string;
      values?: string[];
      availableForWork?: boolean;
      resumeUrl?: string;
    };
  };
  socials: { platform: string; url: string; label?: string }[];
}

export default function HeroAbout({ hero, about, socials }: HeroProps) {
  const h = hero.content;
  const a = about.content;
  const [bootDone, setBootDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(id);
        setTimeout(() => setBootDone(true), 400);
      }
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* â”€â”€ HERO: full-viewport terminal boot â”€â”€ */}
      <section id="about" className="min-h-screen flex flex-col border-b border-primary/10">

        {/* Terminal titlebar */}
        <div className="flex items-center gap-3 p-5 lg:px-6 lg:py-3 border-b border-primary/10 bg-surface shrink-0">
          {/* On mobile the fixed [ MENU ] button sits here; spacer keeps title clear of it */}
          <div className="lg:hidden w-20 shrink-0" />
          <span className="text-[10px] font-mono text-secondary/55 tracking-[0.15em] uppercase truncate">
            portfolio.exe &#x2014; bash &#x2014; 80&#xD7;24
          </span>
        </div>

        {/* Boot log */}
        <div className="flex-1 flex flex-col p-6 sm:p-10 lg:p-16">
          <div className="font-mono text-[11px] sm:text-xs text-secondary/65 leading-relaxed space-y-0.5 mb-10">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line === "" ? "h-2" : ""}>
                {line && (
                  <span className={
                    line.includes("[OK]") ? "text-primary/60" :
                    line.startsWith("Portfolio OS") ? "text-foreground/70" :
                    line.startsWith("Type") ? "text-secondary/55" :
                    "text-secondary/60"
                  }>{line}</span>
                )}
              </div>
            ))}
          </div>

          {/* Name + role — appears after boot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bootDone ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-auto"
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[10px] font-mono text-primary/55 tracking-[0.2em]">$ whoami</span>
            </div>
            <div className="border-l-2 border-primary/30 pl-6 sm:pl-10 mb-10">
              <h1 className="font-display font-bold leading-none tracking-wide uppercase text-foreground/85"
                  style={{ fontSize: "clamp(1.75rem, 9vw, 8rem)" }}>
                {h.headline}
              </h1>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-[11px] font-mono text-primary/50 tracking-[0.15em] uppercase">
                  {h.greeting}
                </span>
                <span className="text-primary/30 font-mono">{"\u2500\u2500"}</span>
                <span className="text-[11px] font-mono text-secondary/60 tracking-widest">
                  {h.subheadline}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              {h.ctaText && h.ctaLink && (
                <a
                  href={h.ctaLink}
                  className="group flex items-center gap-2 text-xs font-mono border border-primary/40 px-4 py-2 text-primary/80 hover:bg-primary/10 hover:border-primary/70 hover:text-primary transition-all duration-200"
                >
                  <span className="text-primary/40 group-hover:text-primary/70">&gt;</span>
                  {h.ctaText.toUpperCase()}
                </a>
              )}
              {h.secondaryCtaText && h.secondaryCtaLink && (
                <a
                  href={h.secondaryCtaLink}
                  className="text-xs font-mono text-secondary/55 hover:text-foreground/70 transition-colors hover:underline underline-offset-4"
                >
                  {h.secondaryCtaText.toUpperCase()}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ ABOUT: cat about.txt output â”€â”€ */}
      <section className="border-b border-primary/10">
        {/* "Command" header */}
        <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-b border-primary/8 bg-surface/50">
          <span className="text-primary/30 font-mono text-[11px]">$</span>
          <span className="text-[11px] font-mono text-foreground/65 tracking-widest">cat about.txt</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14"
        >
          {/* Flex row: bio grid + OXO game */}
          <div className="flex flex-col xl:flex-row gap-12 items-start">

          {/* Grid: line numbers + content */}
          <div className="grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-0 max-w-3xl flex-1">
            {a.bio.split('\n\n').filter(Boolean).map((para, i) => (
              <div key={i} className="contents">
                <div className="text-[10px] font-mono text-secondary/40 tabular-nums text-right pr-4 sm:pr-6 pt-1 select-none leading-relaxed">
                  {i + 1}
                </div>
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-sm sm:text-base font-mono text-foreground/70 leading-relaxed pb-5"
                >
                  {para}
                </motion.p>
              </div>
            ))}
          </div>

            {/* OXO game */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full xl:w-64 shrink-0 xl:pt-1"
            >
              <OXOGame />
            </motion.div>

          </div>{/* end flex row */}
          {socials.length > 0 && (
            <div className="mt-8 border-t border-primary/8 pt-6 flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-mono text-secondary/50 mr-2">$ ls -la ./links/</span>
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-secondary/55 hover:text-primary/70 transition-colors uppercase tracking-widest border border-primary/12 px-2.5 py-1 hover:border-primary/35 hover:bg-primary/5"
                >
                  {s.label ?? s.platform}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}
