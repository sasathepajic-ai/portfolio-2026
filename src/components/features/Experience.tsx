"use client";

import { motion } from "framer-motion";
import { type ExperienceItemType } from "@/core/config/schema";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface ExperienceProps {
  title: string;
  subtitle?: string;
  items: ExperienceItemType[];
}

export default function Experience({ title, subtitle, items }: ExperienceProps) {
  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />

      <div className="mx-auto max-w-6xl px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-blue-400/70" />
              <div className="w-px h-8 bg-linear-to-b from-accent/30 to-transparent" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">{title}</h2>
              {subtitle && <p className="mt-3 text-secondary max-w-xl">{subtitle}</p>}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-2.75 top-0 bottom-0 w-px bg-linear-to-b from-white/8 via-white/6 to-transparent" />

          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative pl-12 group"
              >
                {/* Dot */}
                <div className="absolute left-2.75 -translate-x-1/2 top-0">
                  <div className="w-6 h-6 rounded-full border border-white/10 bg-background flex items-center justify-center group-hover:border-blue-500/60 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 h-6">
                        <span className="text-blue-400/60 font-mono text-xs font-semibold">{(index + 1).toString(2).padStart(4, '0')}</span>
                        <div className="w-px h-3 bg-blue-400/20" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground leading-tight mt-2">{item.jobTitle}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-secondary">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-blue-400/60" />
                          {item.company}
                          {item.client && <span className="text-secondary/40">· {item.client}</span>}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-400/60" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-400/60 tracking-widest shrink-0 uppercase mt-1">
                      {item.dateRange}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-1.5">
                    {item.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-secondary">
                        <span className="text-blue-400/40 font-mono text-xs mt-0.5">&#9656;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] rounded bg-accent/8 text-blue-400 border border-accent/12 font-mono"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
