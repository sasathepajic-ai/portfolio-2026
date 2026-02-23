"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ExperienceItemType } from "@/core/config/schema";
import { MapPin, Briefcase, ChevronDown } from "lucide-react";

interface ExperienceProps {
  title: string;
  subtitle?: string;
  items: ExperienceItemType[];
}

export default function Experience({ title, subtitle, items }: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 flex items-center gap-3">
            {title}
            <span className="text-accent/50 font-mono text-2xl leading-none select-none font-normal translate-y-0.5">( )</span>
          </h2>
          {subtitle && <p className="text-secondary max-w-xl">{subtitle}</p>}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute top-0 bottom-0" style={{ left: '11px', transform: 'translateX(-50%)' }}>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-white/20 via-white/10 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3a3a3a]" />
          </div>

          <div className="space-y-8">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const hasDetails =
                (item.highlights && item.highlights.length > 0) ||
                (item.responsibilities && item.responsibilities.length > 0);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 group"
                >
                  {/* Dot */}
                  <div className="absolute left-2.75 -translate-x-1/2 top-3.5">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className={`w-6 h-6 rounded-full border bg-background flex items-center justify-center transition-colors duration-300 ${
                        isOpen ? "border-accent/60" : "border-white/10 group-hover:border-accent/40"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isOpen ? "bg-accent shadow-[0_0_8px_rgba(30,64,175,0.6)]" : "bg-accent/50 group-hover:bg-accent/70"
                      }`} />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`rounded-xl border transition-all duration-300 ${
                    isOpen ? "border-accent/20 bg-accent/3" : "border-white/6 bg-transparent hover:border-white/10 hover:bg-linear-to-br hover:from-white/5 hover:via-white/2 hover:to-transparent"
                  }`}>
                    {/* Always-visible header */}
                    <button
                      onClick={() => hasDetails && toggle(index)}
                      className={`w-full text-left px-5 py-4 ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-accent/60 font-mono text-[10px] font-semibold">
                              {(index + 1).toString(2).padStart(4, "0")}
                            </span>
                            <div className="w-px h-3 bg-accent/20" />
                            <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase">
                              {item.dateRange}
                            </span>
                            {item.type && (
                              <span className="text-[10px] font-mono text-secondary/40 border border-white/8 rounded-full px-2 py-px">
                                {item.type}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-foreground leading-tight">{item.jobTitle}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mt-1 text-xs text-secondary/70">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-accent/50" />
                              {item.company}
                              {item.client && <span className="text-secondary/35">{" · "}{item.client}</span>}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-accent/50" />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {hasDetails && (
                          <div className="flex items-center gap-1.5 shrink-0 mt-1">
                            <span className={`text-[10px] font-mono transition-colors duration-200 ${isOpen ? "text-accent/60" : "text-secondary/30 group-hover:text-secondary/50"}`}>
                              {isOpen ? "collapse" : "what I built"}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className={`transition-colors duration-200 ${isOpen ? "text-accent/60" : "text-secondary/30 group-hover:text-secondary/50"}`}
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Expandable details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 space-y-4">
                            {item.highlights && item.highlights.length > 0 && (
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/8 border border-primary/20 text-primary/80 mb-2.5">
                                  Key results
                                </span>
                                <ul className="space-y-2">
                                  {item.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2 shadow-[0_0_6px_var(--primary)]" />
                                      <span dangerouslySetInnerHTML={{ __html: h.replace(/(~?\d[\d,.]+%?(?:\s*[×x]\s*)?(?:ms|s|K|M|\+)?)/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {item.responsibilities && item.responsibilities.length > 0 && (
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-accent/8 border border-accent/20 text-accent/80 mb-2.5">
                                  What I built
                                </span>
                                <ul className="space-y-1.5">
                                  {item.responsibilities.map((r, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                                      <span className="inline-block w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-2" />
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
