"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ProjectType } from "@/core/config/schema";
import CaseStudy from "./CaseStudy";
import DesignCaseStudy from "./DesignCaseStudy";
import { ExternalLink, ArrowRight } from "lucide-react";

interface ProjectsProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  sectionId?: string;
  items: ProjectType[];
}

export default function ProjectsScroll({ title, subtitle, sectionId, items }: ProjectsProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectType | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<ProjectType | null>(null);

  return (
    <>
      <section id={sectionId ?? "work"} className="border-b border-primary/10">
        {/* Section header */}
        <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-4 border-b border-primary/8 bg-surface/50">
          <span className="text-[11px] font-mono font-semibold text-secondary/70 tracking-[0.2em] uppercase">{title}</span>
          {subtitle && <span className="text-[9px] font-mono text-secondary/35 hidden sm:inline"> {subtitle}</span>}
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-4">
          {items.map((item, i) => (
            <CaseStudyCard
              key={item.id}
              item={item}
              index={i}
              onSelect={() =>
                item.caseStudyType === "design"
                  ? setSelectedDesign(item)
                  : setSelectedCaseStudy(item)
              }
            />
          ))}
        </div>
      </section>

      <CaseStudy project={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} />
      <DesignCaseStudy project={selectedDesign} onClose={() => setSelectedDesign(null)} />
    </>
  );
}


/* ─── Case Study Card ──────────────────────────────── */
function CaseStudyCard({ item, index, onSelect }: { item: ProjectType; index: number; onSelect: () => void }) {
  const hasCaseStudy = !!(item.problem || item.challenge || item.sections);
  // Thumbnails are hidden on the main page — images only appear inside the modal
  const hasThumb = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(135deg, #2563eb, #d97706, #e02020, #16a34a) border-box",
        border: "1px solid transparent",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch hover:bg-primary/2 transition-colors">
        {/* Left: content */}
        <div className={`min-w-0 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 flex flex-col gap-5 ${hasThumb ? "lg:w-1/2" : "w-full"}`}>
          {/* Index + title */}
          <div>
            <span className="text-[10px] font-mono text-primary/35 tabular-nums block mb-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display font-bold tracking-tight text-foreground/90 text-2xl sm:text-3xl leading-tight mb-1">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-xs font-mono text-primary/50">
                {item.subtitle}
              </p>
            )}
          </div>

          {/* Impact statement */}
          <p className="text-sm text-foreground/70 leading-relaxed">
            {item.description}
          </p>

          {/* Problem → Insight → Solution → Outcome — hidden on phones */}
          {item.problem && (
            <div className="hidden sm:grid grid-cols-2 gap-2">
              {[
                { label: "Problem", text: item.problem },
                { label: "Insight", text: item.insight },
                { label: "Solution", text: item.solution ?? item.challenge },
                { label: "Outcome", text: item.outcome },
              ].filter(s => s.text).map((step) => (
                <div key={step.label} className="border border-primary/10 p-3.5 bg-primary/2">
                  <span className="text-[9px] font-mono text-primary/50 tracking-[0.15em] uppercase block mb-2">{step.label}</span>
                  <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">{step.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <ul className="hidden sm:block list-disc list-inside mt-4 space-y-1 text-sm">
              {item.highlights.map((highlight, idx) => {
                const text = highlight
                  .replace(/^Designed /i, 'Designs ')
                  .replace(/^Built /i, 'Builds ')
                  .replace(/^Created /i, 'Creates ')
                  .replace(/^Dark mode via /i, 'Enables dark mode via ')
                  .replace(/^Enable /i, 'Enables ')
                  .replace(/^Build /i, 'Builds ')
                  .replace(/^Create /i, 'Creates ')
                  .replace(/^Design /i, 'Designs ');
                return (
                  <li key={idx} className="text-neutral-500 dark:text-neutral-400">{text}</li>
                );
              })}
            </ul>
          )}

          {/* Meta row: date + client + stack */}
          <div className="flex items-center gap-4 flex-wrap text-[10px] font-mono text-secondary/50">
            {item.dateRange && <span>{item.dateRange}</span>}
            {item.client && <span className="border-l border-primary/15 pl-4">{item.client}</span>}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            {hasCaseStudy && (
              <button
                onClick={onSelect}
                className="group flex items-center gap-2 text-[11px] font-mono bg-btn-cta px-4 py-2 text-white hover:opacity-85 transition-all duration-200 font-semibold"
              >
                View Case Study
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-secondary/55 hover:text-primary/70 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />Live site
              </a>
            )}
          </div>
        </div>

        {/* Right: thumbnail — hidden, images live inside the modal */}
      </div>
    </motion.div>
  );
}
