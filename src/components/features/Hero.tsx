"use client";

import { motion } from "framer-motion";
import { Mail, Terminal } from "lucide-react";
import { type SectionType } from "@/core/config/schema";
import HeroWaves from "./HeroWaves";

interface HeroProps {
  data: Extract<SectionType, { type: "hero" }>;
}

export default function Hero({ data }: HeroProps) {
  const { content } = data;

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Terminal-style badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-surface/80 border border-white/6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
              <span className="relative rounded-full h-2 w-2 bg-primary" />
            </span>
            <Terminal className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-secondary text-sm font-mono">{content.greeting}</span>
          </motion.span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-center">
            <span className="neon-text">Functionality</span> doesn&apos;t have to be ugly<span className="text-blue-700">.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-secondary max-w-2xl leading-relaxed">
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            {content.ctaText && (
              <motion.a
                href={content.ctaLink || "#"}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 bg-linear-to-br from-primary/15 to-primary/5 backdrop-blur-md border border-primary/40 text-primary rounded-full font-semibold text-base transition-all hover:from-primary/20 hover:to-primary/10 hover:border-primary/60 flex items-center gap-2.5 overflow-hidden"
              >
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/70 transition-all duration-500" />
                <span className="text-primary/60">&lt;/&gt;</span> {content.ctaText}
              </motion.a>
            )}
            {content.secondaryCtaText && (
              <motion.a
                href={content.secondaryCtaLink || "#"}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 bg-linear-to-br from-white/2 to-transparent border border-white/10 text-foreground rounded-full font-semibold text-base transition-all hover:from-accent/8 hover:to-accent/2 hover:border-accent/30 flex items-center gap-2.5 overflow-hidden"
              >
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-500" />
                <Mail className="w-4 h-4 text-blue-400" />
                {content.secondaryCtaText}
              </motion.a>
            )}
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-secondary/40 uppercase tracking-[0.3em]">scroll</span>
            <div className="w-px h-8 bg-linear-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
