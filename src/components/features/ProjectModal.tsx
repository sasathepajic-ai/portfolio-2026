"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ProjectType } from "@/core/config/schema";
import { X, ExternalLink, Github, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 bg-background flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="relative h-64 shrink-0 bg-background overflow-hidden scanlines border-b border-primary/20">
              <div className="absolute inset-0 bg-black/40" />
              {/* Green accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />
              
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors z-10 border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-8 left-0 right-0 z-10">
                <div className="max-w-6xl mx-auto px-6 relative">
                  {/* Text framing decorations */}
                  <div className="absolute -top-6 -left-2 w-4 h-4 border-t border-l border-primary/60" />
                  <div className="absolute -top-6 -right-2 w-4 h-4 border-t border-r border-primary/60" />

                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-white/60 text-xs font-mono tracking-widest uppercase mb-2"
                  >
                    {project.dateRange}
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="text-3xl md:text-4xl font-bold text-primary tracking-tight"
                  >
                    {project.title}
                  </motion.h2>
                  {project.client && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-white/50 text-base mt-2 font-mono"
                    >
                      {project.client}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-6xl mx-auto px-6 py-12 space-y-8"
              >
                {/* Description */}
                <p className="text-secondary leading-relaxed text-lg">{project.description}</p>

              {/* Links */}
              <div className="flex gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary/15 backdrop-blur-md border border-primary/40 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-foreground rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                )}
              </div>

              {/* Challenge & Solution */}
              {project.challenge && (
                <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-white/4">
                  <h3 className="text-primary font-semibold text-xs uppercase tracking-widest font-mono">{"// The Challenge"}</h3>
                  <p className="text-secondary leading-relaxed text-sm">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-white/4">
                  <h3 className="text-primary font-semibold text-xs uppercase tracking-widest font-mono">{"// The Solution"}</h3>
                  <p className="text-secondary leading-relaxed text-sm">{project.solution}</p>
                </div>
              )}

              {/* Key Results */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold text-xs uppercase tracking-widest font-mono">
                    <span className="text-blue-400">&#9670;</span> Key Results
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-secondary text-sm">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold text-xs uppercase tracking-widest font-mono">
                    <span className="text-blue-400">&#9670;</span> What I Built
                  </h3>
                  <ul className="space-y-2">
                    {project.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2 text-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 mt-1.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-3 pb-6">
                <h3 className="text-foreground font-semibold text-xs uppercase tracking-widest font-mono">
                  <span className="text-accent">&#9670;</span> Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/8 border border-primary/12 rounded-md text-xs text-primary/80 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
