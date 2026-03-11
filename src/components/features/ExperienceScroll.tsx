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

export default function ExperienceScroll({ title, subtitle, sectionLabel = "03", items }: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Determine if this is the "Design Approach" / process section
  const isProcess = title === "Design Approach";

  return (
    <section id={isProcess ? "process" : "experience"} className="border-b border-primary/10">
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-4 border-b border-primary/8 bg-surface/50">
        <span className="text-[11px] font-mono font-semibold text-secondary/70 tracking-[0.2em] uppercase">{title}</span>
        {subtitle && <span className="text-[9px] font-mono text-secondary/35 hidden sm:inline"> {subtitle}</span>}
      </div>

      {/* Process section  clean card layout */}
      {isProcess ? (
        <div className="px-6 sm:px-12 lg:px-16 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border border-primary/12 p-5 sm:p-6 hover:border-primary/25 transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-display font-bold text-primary/30">{item.company}</span>
                  <span className="text-[10px] font-mono text-secondary/45">{item.dateRange}</span>
                </div>
                <h3 className="text-sm font-display font-bold text-foreground/80 mb-3">{item.jobTitle}</h3>
                <p className="text-xs text-secondary/55 leading-relaxed mb-4">{item.location}</p>
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-2 border-t border-primary/8 pt-3">
                    {item.responsibilities.map((r, ri) => (
                      <div key={ri} className="flex items-baseline gap-2">
                        <span className="text-primary/30 text-[10px] shrink-0">&middot;</span>
                        <span className="text-[11px] text-foreground/55 leading-relaxed">{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Experience section  accordion entries */
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
      )}
    </section>
  );
}

function ExperienceEntry({
  item, index, isOpen, onToggle,
}: { item: ExperienceItemType; index: number; isOpen: boolean; onToggle: () => void; }) {
  const hasDetails = (item.highlights?.length ?? 0) > 0 || (item.responsibilities?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <button
        onClick={hasDetails ? onToggle : undefined}
        className={"w-full text-left px-6 sm:px-12 lg:px-16 py-6 group transition-colors duration-150 " + (
          isOpen ? "bg-primary/5" :
          hasDetails ? "hover:bg-primary/3 cursor-pointer" : "cursor-default"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
          <div className="flex items-baseline gap-3 flex-1 min-w-0">
            <div className="min-w-0">
              <span className={"font-display font-bold tracking-tight text-lg sm:text-xl transition-colors " + (
                isOpen ? "text-btn-cta" : "text-foreground/80 group-hover:text-foreground"
              )}>
                {item.company}
              </span>
              <span className="text-[11px] font-mono text-secondary/55 ml-3">{item.jobTitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono text-secondary/50">{item.dateRange}</span>
            {item.location && <span className="text-[10px] font-mono text-secondary/40">({item.location})</span>}
            {hasDetails && (
              <span className={"text-[9px] font-mono " + (isOpen ? "text-primary/55" : "text-secondary/40")}>
                {isOpen ? "" : "+"}
              </span>
            )}
          </div>
        </div>
        {(item.client || item.contractor || item.company.toLowerCase().includes('pragmatic labs')) && (
          <div className="mt-1 text-[10px] font-mono text-secondary/45">
            {item.client
              ? <><span>for {item.client}</span>{item.contractor && <span className="ml-2">via {item.contractor}</span>}</>
              : item.contractor
              ? <span>via {item.contractor}</span>
              : <span>for Pragmatic Labs</span>
            }
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-primary/8 bg-surface/40 px-6 sm:px-12 lg:px-16 py-6">
              {item.highlights && item.highlights.length > 0 && (
                <div className="mb-5">
                  <div className="text-[9px] font-mono text-primary/40 tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
                    <span>Impact</span>
                    <span className="flex-1 h-px bg-primary/8" />
                  </div>
                  <div className="space-y-2.5">
                    {item.highlights.map((h2, hi) => (
                      <div key={hi} className="flex items-baseline gap-3 ml-7">
                        <span className="text-primary/35 text-[10px] shrink-0">&middot;</span>
                        <span
                          className="text-xs text-foreground/60 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: h2.replace(
                              /(\d[\d,.]+%?(?:\s*x\s*\d+)?(?:\s*(?:ms|s|K|M|\+))?)/g,
                              "<strong class=\"text-primary/80 font-semibold\">$1</strong>"
                            ),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {item.responsibilities && item.responsibilities.length > 0 && (
                <div>
                  <div className="text-[9px] font-mono text-secondary/45 tracking-[0.15em] uppercase mb-3 flex items-center gap-2">
                    <span>Responsibilities</span>
                    <span className="flex-1 h-px bg-primary/6" />
                  </div>
                  <div className="space-y-2">
                    {item.responsibilities.map((r, ri) => (
                      <div key={ri} className="flex items-baseline gap-3 ml-7">
                        <span className="text-secondary/35 text-[10px] shrink-0">&middot;</span>
                        <span className="text-xs text-secondary/60 leading-relaxed">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
