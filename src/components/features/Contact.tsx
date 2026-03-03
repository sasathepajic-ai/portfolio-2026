"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

interface ContactProps {
  title: string;
  subtitle?: string;
  email: string;
  location?: string;
  phone?: string;
}

export default function Contact({ title, subtitle, email, location }: ContactProps) {
  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />

      <div className="mx-auto max-w-2xl px-6 relative text-center">

        {/* Terminal breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="text-primary/40 font-mono text-xs">$ cat /contact/ready</span>
          <span className="w-1.5 h-3.5 bg-primary/40 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4 flex items-center gap-2"
        >
          <span className="text-primary/40 font-mono text-2xl leading-none select-none">@</span>
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-secondary text-lg mb-12"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Email button — compact, centered */}
        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 hover:border-primary/60 hover:bg-primary/18 transition-all duration-300 overflow-hidden mb-12"
        >
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
          <Mail className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors shrink-0" />
          <span className="text-foreground/90 font-mono text-sm">{email}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors shrink-0" />
        </motion.a>

        {/* Location */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex items-center justify-center gap-2 text-sm text-secondary/50"
          >
            <MapPin className="w-3.5 h-3.5 text-primary/35" />
            {location}
          </motion.div>
        )}

        {/* EOF decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-16 flex items-center justify-center gap-3 text-white/6 font-mono text-xs"
        >
          <span>&#123;</span>
          <div className="w-12 h-px bg-white/6" />
          <span className="text-primary/40">EOF</span>
          <div className="w-12 h-px bg-white/6" />
          <span>&#125;</span>
        </motion.div>

      </div>
    </section>
  );
}
