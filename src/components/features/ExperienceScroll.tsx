"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ExperienceItemType } from "@/core/config/schema";

interface ExperienceProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  items: ExperienceItemType[];
}

export default function ExperienceScroll({ title, sectionLabel = "03", items }: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="border-b border-primary/10">

      {/* Command header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-b border-primary/8 bg-surface/50">
        <span className="text-primary/50 font-mono text-[11px]">$</span>
        <span className="text-[11px] font-mono text-foreground/65 tracking-widest">ls -la ./experience/</span>
        <span className="ml-auto text-[9px] font-mono text-secondary/45 uppercase tracking-[0.15em]">
          {`// ${sectionLabel} / ${title.toUpperCase()}`}
        </span>
      </div>

      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-[3rem_1fr_auto] gap-4 px-6 sm:px-12 lg:px-16 py-2.5 border-b border-primary/6 bg-primary/2">
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase">PERMS</span>
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase">NAME / ROLE</span>
        <span className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase">DATE</span>
      </div>

      <div className="divide-y divide-primary/6">
        {items.map((item, i) => (
          <ExperienceEntry
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function ExperienceEntry({
  item, index, isOpen, onToggle,
}: { item: ExperienceItemType; index: number; isOpen: boolean; onToggle: () => void; }) {
  const hasDetails = (item.highlights?.length ?? 0) > 0 || (item.responsibilities?.length ?? 0) > 0;
  const perms = index % 2 === 0 ? "drwxr-xr-x" : "-rw-r--r--";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ls row */}
      <button
        onClick={hasDetails ? onToggle : undefined}
        className={`w-full text-left px-6 sm:px-12 lg:px-16 py-5 group transition-colors duration-150 ${
          isOpen ? "bg-primary/5" :
          hasDetails ? "hover:bg-primary/2.5 cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[3rem_1fr_auto] gap-1 sm:gap-4 items-center">
          {/* Permissions */}
          <span className="hidden sm:block text-[9px] font-mono text-secondary/40 tracking-[0.05em]">
            {perms}
          </span>
          {/* Name + role */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
            <span className={`font-display font-bold uppercase tracking-wide leading-none text-2xl sm:text-3xl lg:text-[2rem] transition-colors ${
              isOpen ? "text-primary glow-flicker" : "text-foreground/80 group-hover:text-foreground"
            }`}>
              {item.company}
            </span>
            <span className="text-[11px] font-mono text-secondary/60 truncate">
              {item.jobTitle}
              {item.location && <span className="text-secondary/45 ml-2">({item.location})</span>}
            </span>
          </div>
          {/* Date */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono text-secondary/50">{item.dateRange}</span>
            {hasDetails && (
              <span className={`text-[9px] font-mono transition-colors ${
                isOpen ? "text-primary/55" : "text-secondary/40 group-hover:text-secondary/60"
              }`}>
                {isOpen ? "[-]" : "[+]"}
              </span>
            )}
          </div>
        </div>
        {(item.client || item.contractor) && (
          <div className="mt-1.5 text-[10px] font-mono text-secondary/50 flex items-center gap-2">
            <span className="hidden sm:inline-block w-12" />
            <span className="text-primary/40 relative -top-1">↳</span>
            {item.client && <span>for <span className="text-secondary/50">{item.client}</span></span>}
            {item.contractor && <span className="ml-1">via <span className="text-secondary/50">{item.contractor}</span></span>}
          </div>
        )}
      </button>

      {/* cat output */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-primary/8 bg-surface/40">
              {/* cat command line */}
              <div className="flex items-center gap-2 px-6 sm:px-12 lg:px-16 py-3 border-b border-primary/6">
                <span className="text-primary/45 font-mono text-[10px]">$</span>
                <span className="text-[10px] font-mono text-secondary/55">
                  cat ./experience/{item.company.toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-0 px-0">
                {item.highlights && item.highlights.length > 0 && (
                  <div className="col-span-2 px-6 sm:px-12 lg:px-16 py-5">
                    <div className="text-[9px] font-mono text-primary/40 tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                      <span>## KEY_RESULTS</span>
                      <span className="flex-1 h-px bg-primary/8" />
                    </div>
                    <div className="space-y-3">
                      {item.highlights.map((h, hi) => (
                        <div key={hi} className="grid grid-cols-[2.5rem_1fr] gap-2 items-baseline">
                          <span className="text-[10px] font-mono text-primary/40 tabular-nums text-right">
                            {(hi + 1).toString(16).padStart(2, "0").toUpperCase()}
                          </span>
                          <span
                            className="text-[11px] sm:text-xs font-mono text-foreground/65 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: h.replace(
                                /(\d[\d,.]+%?(?:\s*x\s*\d+)?(?:\s*(?:ms|s|K|M|\+))?)/g,
                                `<strong class="text-primary/80 font-semibold">$1</strong>`
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="col-span-2 px-6 sm:px-12 lg:px-16 py-5 border-t border-primary/6">
                    <div className="text-[9px] font-mono text-secondary/50 tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                      <span>## WHAT_I_BUILT</span>
                      <span className="flex-1 h-px bg-primary/6" />
                    </div>
                    <div className="space-y-2">
                      {item.responsibilities.map((r, ri) => (
                        <div key={ri} className="grid grid-cols-[2.5rem_1fr] gap-2 items-baseline">
                          <span className="text-[10px] font-mono text-secondary/40 tabular-nums text-right">
                            {(ri + 1).toString(16).padStart(2, "0").toUpperCase()}
                          </span>
                          <span className="text-[11px] sm:text-xs font-mono text-secondary/65 leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
