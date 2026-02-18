"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  name: string;
  items: NavItem[];
}

export default function Navbar({ name, items }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name — monospaced, terminal-style */}
        <a href="#hero" className="group flex items-center gap-2">
          <span className="text-primary/70 font-mono text-sm">&#47;&#47;</span>
          <span className="text-foreground font-semibold text-base tracking-tight font-mono">
            {name.split(" ")[0].toLowerCase()}
          </span>
          <span className="w-px h-4 bg-primary/40 animate-pulse" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-secondary hover:text-foreground transition-colors text-sm font-medium group"
            >
              <span className="text-primary/40 font-mono text-xs mr-1.5">0{i + 1}</span>
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-primary/0 group-hover:bg-primary/40 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-secondary hover:text-foreground transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {items.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-secondary hover:text-foreground transition-colors text-base font-medium py-3 border-b border-white/4"
                >
                  <span className="text-primary/40 font-mono text-xs">0{i + 1}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
