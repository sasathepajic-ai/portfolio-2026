"use client";

import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { type SectionType } from "@/core/config/schema";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="w-3 h-3" style={{ color: "#0A66C2" }} />,
  github:   <Github   className="w-3 h-3" style={{ color: "#E6EDF3" }} />,
};

interface AboutProps {
  data: Extract<SectionType, { type: "about" }>;
  socials?: { platform: string; url: string; label?: string }[];
}

export default function About({ data, socials = [] }: AboutProps) {
  const { content } = data;
  const profileSocials = socials.filter((s) => s.platform === "linkedin" || s.platform === "github");

  return (
    <section id={data.id} className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />

      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left column — label + icon */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-2 flex items-center gap-3">
                About
                <span className="text-primary/40 font-mono text-2xl leading-none select-none font-normal translate-y-0.5">&#123; &#125;</span>
              </h2>
              <p className="text-secondary text-sm font-mono">The person behind the code.</p>
            </div>

            {/* Available-for-work badge + social links */}
            {content.availableForWork && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono mt-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for work
              </motion.span>
            )}

            {/* LinkedIn + GitHub — same size as the pill */}
            {profileSocials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-2 mt-2"
              >
                {profileSocials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-white/3 hover:border-white/22 hover:bg-white/6 text-secondary hover:text-foreground text-xs font-mono transition-all duration-200"
                  >
                    {SOCIAL_ICONS[s.platform]}
                    {s.label ?? s.platform}
                  </a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right column — bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Bio text — split into paragraphs */}
            <div className="space-y-5">
              {content.bio.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-secondary text-lg leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Resume CTA */}
            {content.resumeUrl && (
              <motion.a
                href={content.resumeUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 mt-8 px-6 py-3 bg-linear-to-br from-primary/12 to-primary/5 border border-primary/30 text-primary rounded-full text-sm font-semibold hover:from-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <span className="font-mono text-primary/60">↓</span>
                Download Resume
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
