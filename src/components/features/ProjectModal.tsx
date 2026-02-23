"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ProjectType } from "@/core/config/schema";
import { X, ExternalLink, Github, ChevronRight, Calendar, Building2 } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } },
  item: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  },
};

// ─── Desktop browser-chrome mockup ─────────────────────────────────
function DesktopMockup({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111116] border-b border-white/6">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-2.5 h-4 rounded-full bg-white/5 flex items-center px-2.5 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />
          <span className="text-[8px] text-white/25 font-mono truncate">ablsafety.com</span>
        </div>
      </div>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={src}
          alt={alt ?? "Desktop screenshot"}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Single overlay: backdrop + scroll container + click-to-close */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-9999 overflow-y-auto bg-black/90 backdrop-blur-md"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative min-h-screen w-full bg-surface"
              style={{ boxShadow: "none" }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

              {/* Close button — fixed to viewport top-right */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="fixed top-5 right-6 z-10000 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-secondary hover:text-foreground transition-all duration-200 border border-white/6"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="relative px-8 sm:px-16 lg:px-32 pt-9 pb-7 border-b border-white/6 max-w-6xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {project.dateRange && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        {project.dateRange}
                      </span>
                    )}
                    {project.company && (
                      <>
                        <span className="text-white/10">&middot;</span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                          <Building2 className="w-3 h-3" />
                          {project.company}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-2">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-sm text-secondary/80 font-mono">{project.subtitle}</p>
                  )}
                  {project.client && (
                    <p className="mt-1 text-xs text-accent/60 font-mono">{project.client}</p>
                  )}
                </motion.div>
              </div>

              {/* Body */}
              <motion.div
                variants={stagger.container}
                initial="initial"
                animate="animate"
                className="px-8 sm:px-16 lg:px-32 py-8 space-y-8 max-w-6xl mx-auto w-full"
              >
                {/* Screenshot gallery */}
                {project.images && project.images.length > 0 && (() => {
                  const desktops = project.images.filter((i) => i.type === "desktop");
                  return (
                    <motion.div variants={stagger.item} className="-mx-8 sm:-mx-16 lg:-mx-32">
                      {/* Desktop row */}
                      {desktops.length > 0 && (
                        <div className="overflow-x-auto pb-4">
                          <div className="flex gap-4 px-8 sm:px-16 lg:px-32" style={{ minWidth: "max-content" }}>
                            {desktops.map((img, i) => (
                              <div key={i} style={{ width: "clamp(280px, 42vw, 560px)" }}>
                                <DesktopMockup src={img.src} alt={img.alt} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </motion.div>
                  );
                })()}

                {/* Description */}
                <motion.p variants={stagger.item} className="text-secondary leading-relaxed text-base">
                  {project.description}
                </motion.p>

                {/* Links */}
                {(project.demoUrl || project.repoUrl) && (
                  <motion.div variants={stagger.item} className="flex gap-3 flex-wrap">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/12 border border-primary/30 text-primary rounded-xl font-semibold text-sm hover:bg-primary/22 hover:border-primary/55 transition-all duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/12 text-foreground rounded-xl font-semibold text-sm hover:bg-white/10 transition-all duration-200"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                  </motion.div>
                )}

                {/* Challenge & Solution */}
                {(project.challenge || project.solution) && (
                  <motion.div variants={stagger.item} className="grid sm:grid-cols-2 gap-4">
                    {project.challenge && (
                      <div className="p-5 rounded-2xl bg-accent/6 border border-accent/18">
                        <h3 className="text-accent/80 font-semibold text-[10px] uppercase tracking-widest font-mono mb-2.5">The Challenge</h3>
                        <p className="text-secondary leading-relaxed text-sm">{project.challenge}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div className="p-5 rounded-2xl bg-primary/6 border border-primary/18">
                        <h3 className="text-primary/80 font-semibold text-[10px] uppercase tracking-widest font-mono mb-2.5">The Solution</h3>
                        <p className="text-secondary leading-relaxed text-sm">{project.solution}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Key Results */}
                {project.highlights && project.highlights.length > 0 && (
                  <motion.div variants={stagger.item}>
                    <h3 className="text-foreground/70 font-semibold text-[10px] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      Key Results
                    </h3>
                    <ul className="space-y-3">
                      {project.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="flex gap-3 text-secondary text-sm leading-relaxed"
                        >
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: h.replace(/(\d[\d,.]+%?(?:\s*[×x]\s*)?(?:ms|s|K|M)?)/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* What I Built */}
                {project.responsibilities && project.responsibilities.length > 0 && (
                  <motion.div variants={stagger.item}>
                    <h3 className="text-foreground/70 font-semibold text-[10px] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                      What I Built
                    </h3>
                    <ul className="space-y-2.5">
                      {project.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-3 text-secondary text-sm leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0 mt-2" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div variants={stagger.item} className="pb-2">
                  <h3 className="text-foreground/70 font-semibold text-[10px] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                    Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-primary/8 border border-primary/20 rounded-lg text-xs text-primary/80 font-mono hover:bg-primary/16 hover:text-primary hover:border-primary/40 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
