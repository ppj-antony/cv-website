'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content, Language } from '@/data/content';
import ParticleRing from './ParticleRing';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const currentContent = content[lang].hero;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden select-none bg-[#0A0A0C] text-[#F4F4F0]">
      {/* 3D Interaktiver Particle Vortex Ring im Hintergrund nach rechts versetzt */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ParticleRing />
      </div>

      {/* Weicher dezenter Mouse-Follow Glow */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF8F48]/10 rounded-full blur-[140px] transition-transform duration-300 ease-out hidden lg:block z-0"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Name & Title */}
      <div className="relative z-10 w-full text-left pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-black tracking-tighter leading-none text-[#F4F4F0] uppercase text-[13.5vw] w-full block whitespace-nowrap drop-shadow-sm"
        >
          {currentContent.name}
        </motion.h1>

        {/* MSc. Badge */}
        <div className="mt-4 pointer-events-auto">
          <div className="relative inline-block pb-1">
            <span className="text-3xl sm:text-5xl font-extrabold text-[#FF8F48] tracking-widest uppercase">
              MS<span className="lowercase">c</span>.
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF8F48] origin-left rounded-full shadow-[0_0_8px_#FF8F48]"
            />
          </div>
        </div>
      </div>

      {/* Unterer Bereich: Skills Tags (in 2 Zeilen links) & 'Kontakt aufnehmen' Button (einzeilig rechts) */}
      <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-12">
        <div className="flex flex-wrap gap-2 max-w-2xl lg:max-w-3xl">
          {currentContent.keywords.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-semibold tracking-wider rounded-md bg-[#141417]/90 backdrop-blur-sm text-[#F4F4F0] border border-white/10 hover:border-[#FF8F48]/50 transition-colors uppercase whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className="relative group shrink-0 whitespace-nowrap px-8 py-4 rounded-lg bg-[#FF8F48] text-black font-bold uppercase tracking-wider text-sm hover:bg-[#E07A38] transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(255,143,72,0.3)] hover:shadow-[0_0_30px_rgba(255,143,72,0.6)] cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10 whitespace-nowrap">{currentContent.contactMe}</span>
          </a>
        </div>
      </div>
    </section>
  );
}