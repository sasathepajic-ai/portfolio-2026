"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

interface ContactProps {
  title: string;
  subtitle?: string;
  email: string;
  location?: string;
  phone?: string;
}

export default function Contact({ title, subtitle, email, location, phone }: ContactProps) {
  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />


      <div className="mx-auto max-w-6xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Terminal prompt */}
          <p className="text-primary/50 font-mono text-sm mb-2">
            $ cat /contact/info
          </p>
          <p className="text-primary/30 font-mono text-xs mb-6">
            &gt;&gt;&gt; Connection established...
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-secondary text-lg">{subtitle}</p>}

          {/* Email CTA */}
          <motion.a
            href={`mailto:${email}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 mt-10 px-8 py-4 bg-linear-to-br from-primary/15 to-primary/5 backdrop-blur-md border border-primary/40 text-primary rounded-full font-semibold text-lg transition-all hover:from-primary/20 hover:to-primary/10 hover:border-primary/60 relative overflow-hidden"
          >
            {/* Hover accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/70 transition-all duration-500" />
            <Mail className="w-5 h-5" />
            {email}
            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center justify-center gap-8 mt-8 text-sm text-secondary"
          >
            {location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/40" />
                {location}
              </span>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-primary/40" />
                {phone}
              </a>
            )}
          </motion.div>

          {/* Decorative brackets */}
          <div className="mt-16 flex items-center justify-center gap-3 text-white/6 font-mono text-xs">
            <span>&#123;</span>
            <div className="w-12 h-px bg-white/6" />
            <span className="text-primary/20">EOF</span>
            <div className="w-12 h-px bg-white/6" />
            <span>&#125;</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
