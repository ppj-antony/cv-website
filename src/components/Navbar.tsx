'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content, Language } from '@/data/content';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const isDe = lang === 'de';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = content[lang].nav;
  const navLinks = [
    { name: nav.experience, href: '#experience' },
    { name: nav.education, href: '#education' },
    { name: nav.skills, href: '#skills' },
    { name: nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 lg:px-16 py-4">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-black text-[#F4F4F0] tracking-tighter" aria-label="Home">
          PA<span className="text-[#FF8F48]">.</span>
        </a>

        {/* Desktop Navigation Items */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-xs font-bold tracking-widest text-[#8E8E93] hover:text-[#F4F4F0] transition-colors uppercase rounded-full"
            >
              {hoveredIndex === index && (
                <span className="absolute inset-0 bg-white/10 rounded-full blur-[2px] transition-all duration-300" />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Right side controls: Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#141417] p-1 rounded-lg border border-white/10 text-xs font-bold">
            <button
              onClick={() => setLang('de')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                isDe ? 'bg-[#FF8F48] text-black shadow-sm font-black' : 'text-[#8E8E93] hover:text-[#F4F4F0]'
              }`}
              aria-label="Auf Deutsch umschalten"
            >
              DE
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                !isDe ? 'bg-[#FF8F48] text-black shadow-sm font-black' : 'text-[#8E8E93] hover:text-[#F4F4F0]'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#141417] border border-white/10 text-[#F4F4F0] hover:text-[#FF8F48] transition-colors focus:outline-none"
            aria-label="Menü öffnen"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10 mt-3 pt-3"
          >
            <div className="flex flex-col gap-2 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-bold tracking-widest text-[#8E8E93] hover:text-[#FF8F48] hover:bg-white/5 rounded-lg transition-colors uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}