"use client";
import { motion } from "framer-motion";
import PixelComputer from "./PixelComputer";

const TAB_COLORS = [
  { tab: "var(--nav-about)",       text: "#001a06" },
  { tab: "var(--mondrian-blue)",   text: "#ffffff" },
  { tab: "var(--mondrian-yellow)", text: "#1a0600" },
  { tab: "var(--accent)",          text: "#ffffff" },
  { tab: "var(--mondrian-white)",  text: "#1a1917" },
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
  skills?: { name: string; icon?: string; items: string[] }[];
}

export default function HeroAbout({ hero, about, socials, skills }: HeroProps) {
  const h = hero.content;
  const a = about.content;

  return (
    <>
      {/*  HERO  */}
      <section id="about" className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-primary/10">
        <div className="flex flex-col xl:flex-row xl:items-center gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="xl:w-1/2"
        >
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-8"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse" />
                <span className="relative rounded-full h-2 w-2 bg-primary/60" />
              </span>
              <span className="text-[11px] font-mono text-primary/60 tracking-[0.15em] uppercase">{h.greeting}</span>
            </div>
            {a.availableForWork && (
              <span className="text-[10px] font-mono text-secondary/50 border border-primary/15 px-2 py-0.5 self-start">Available for work</span>
            )}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-foreground/90 leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
          >
            {h.headline.replace(/\.$/, "").split(" ").map((word, i, arr) => {
              const lower = word.toLowerCase();
              const color =
                lower === "complex" ? "var(--mondrian-yellow)" :
                lower === "simple" ? "var(--nav-about)" :
                undefined;
              return (
                <span key={i} style={color ? { color } : undefined}>{word}{i < arr.length - 1 ? " " : ""}</span>
              );
            })}<span className="text-foreground/90">.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-sm sm:text-base text-secondary/70 leading-relaxed max-w-2xl mb-8"
          >
            {h.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-4 flex-wrap"
          >
            {h.ctaText && h.ctaLink && (
              <a
                href={h.ctaLink}
                className="group flex items-center gap-2 text-xs font-mono bg-btn-cta hover:opacity-85 px-5 py-2.5 text-white transition-all duration-200 font-semibold"
              >
                {h.ctaText}
                <span className="text-white/60 group-hover:text-white/80 transition-colors">&darr;</span>
              </a>
            )}
            {h.secondaryCtaText && h.secondaryCtaLink && (
              <a
                href={h.secondaryCtaLink}
                className="text-xs font-mono text-secondary/55 hover:text-foreground/70 transition-colors hover:underline underline-offset-4"
              >
                {h.secondaryCtaText}
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Pixel art computer — centered below text on mobile, right column on xl+ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex xl:w-1/2 items-center justify-center"
        >
          <PixelComputer />
        </motion.div>
        </div>
      </section>

      {/*  ABOUT  */}
      <section className="border-b border-primary/10">
        <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-4 border-b border-primary/8 bg-surface/50">
          <span className="text-[11px] font-mono font-semibold text-secondary/70 tracking-[0.2em] uppercase">About</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14"
        >
          <div className="flex flex-col xl:flex-row gap-12 items-center">
            {/* Bio */}
            <div className="xl:w-1/2 space-y-5">
              {a.bio.split("\n\n").filter(Boolean).map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="text-sm sm:text-[15px] text-foreground/65 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Capabilities — right column of About */}
            {skills && skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="xl:w-1/2 xl:pt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-x-3 gap-y-7 sm:h-104">
                  {skills.map((cat, i) => {
                    const color = TAB_COLORS[i % TAB_COLORS.length];
                    return (
                      <div key={cat.name} className="relative flex flex-col h-48 sm:h-auto min-h-0">
                        <div
                          className="absolute -top-5 left-0 h-5 px-2 flex items-center text-[8px] font-mono tracking-widest uppercase font-semibold select-none"
                          style={{ background: color.tab, color: color.text }}
                        >
                          {cat.name}
                        </div>
                        <div
                          className="flex-1 min-h-0 overflow-y-auto p-3 border border-primary/12"
                          style={{
                            background: `color-mix(in srgb, ${color.tab} 5%, var(--surface))`,
                            borderTop: `2px solid ${color.tab}`,
                          }}
                        >
                          {cat.items.map((skill) => (
                            <div key={skill} className="flex items-baseline gap-1.5">
                              <span
                                className="text-[8px] shrink-0"
                                style={{ color: `color-mix(in srgb, ${color.tab} 70%, transparent)` }}
                              >
                                ▸
                              </span>
                              <span className="text-xs text-foreground/65 leading-relaxed">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="mt-8 border-t border-primary/8 pt-6 grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center text-[10px] font-mono text-secondary/55 hover:text-primary/70 transition-colors uppercase tracking-widest border border-primary/12 px-2.5 py-1 hover:border-primary/35 hover:bg-primary/5"
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
