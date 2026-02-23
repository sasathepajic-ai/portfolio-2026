"use client";

import { motion } from "framer-motion";
import { Mail, Terminal, ArrowDown } from "lucide-react";
import { type SectionType } from "@/core/config/schema";
import HeroWaves from "./HeroWaves";

interface HeroProps {
  data: Extract<SectionType, { type: "hero" }>;
}

export default function Hero({ data }: HeroProps) {
  const { content } = data;

  // Split headline: first word gets gradient, rest stays white
  const words = content.headline.split(" ");
  const accentWord = words[0];
  const restOfHeadline = words.slice(1).join(" ");

  return (
    <section
      id={data.id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Animated wave background ─── */}
      <HeroWaves />

      {/* ─── Main content ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Available-for-work badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-surface/80 border border-primary/20 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#14532d] animate-ping opacity-30" />
                <span className="relative rounded-full h-2 w-2 bg-[#14532d]" />
              </span>
              <Terminal className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-secondary text-sm font-mono">{content.greeting}</span>
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-center"
          >
            <span className="hero-gradient-text glitch-text" data-text={accentWord}>{accentWord}</span>{" "}
            <span className="text-foreground">{restOfHeadline.replace(/\.$/, "")}</span>
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-secondary max-w-2xl leading-relaxed"
          >
            {content.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            {content.ctaText && (
              <motion.a
                href={content.ctaLink || "#"}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 bg-linear-to-br from-primary/15 to-primary/5 backdrop-blur-md border border-primary/40 text-primary rounded-full font-semibold text-base transition-all hover:from-primary/25 hover:to-primary/10 hover:border-primary/70 flex items-center gap-2.5 overflow-hidden"
              >
                <span className="text-primary/60 font-mono" style={{ wordSpacing: "-4px" }}>&lt; / &gt;</span>
                {content.ctaText}
              </motion.a>
            )}
            {content.secondaryCtaText && (
              <motion.a
                href={content.secondaryCtaLink || "#"}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 bg-linear-to-br from-white/3 to-transparent border border-white/10 text-foreground rounded-full font-semibold text-base transition-all hover:from-accent/8 hover:to-accent/2 hover:border-accent/40 flex items-center gap-2.5 overflow-hidden"
              >
                <Mail className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                {content.secondaryCtaText}
              </motion.a>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] font-mono text-secondary/35 uppercase tracking-[0.35em]">scroll</span>
            <div className="scroll-bounce flex flex-col items-center gap-1">
              <ArrowDown className="w-3.5 h-3.5 text-secondary/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
