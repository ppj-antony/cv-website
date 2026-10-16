'use client';

import React from 'react';
import AnimatedSection from './AnimatedSection';
import { content, Language } from '@/data/content';
import { TextRoll } from '@/components/ui/text-roll';

interface SectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: SectionProps) {
  const currentContent = content[lang].contact;

  return (
    <AnimatedSection
      id="contact"
      className="bg-[#0A0A0C] text-[#F4F4F0] py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F4F0] mb-4">
          <TextRoll>{currentContent.title}</TextRoll>
        </h2>
        <p className="text-[#8E8E93] text-sm sm:text-base font-normal max-w-2xl mb-16">
          {currentContent.subtitle}
        </p>

        {/* Blocksatz-Verteilung mit allen Überschriften */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-white/10 pt-10">
          
          {/* 1. E-Mail */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold block mb-2">
              {currentContent.email}
            </span>
            <a
              href="mailto:paul@antony.at"
              className="text-xl sm:text-3xl lg:text-4xl font-black text-[#F4F4F0] hover:text-[#FF8F48] transition-all"
            >
              paul@antony.at
            </a>
          </div>

          {/* Trennlinie */}
          <div className="hidden md:block h-12 w-px bg-white/10" />

          {/* 2. Telefon */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold block mb-2">
              {currentContent.phone}
            </span>
            <a
              href="tel:+436607017200"
              className="text-xl sm:text-3xl lg:text-4xl font-black text-[#F4F4F0] hover:text-[#FF8F48] transition-all"
            >
              +43 660 7017200
            </a>
          </div>

          {/* Trennlinie */}
          <div className="hidden md:block h-12 w-px bg-white/10" />

          {/* 3. LinkedIn */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E8E93] font-bold block mb-2">
              {currentContent.social}
            </span>
            <a
              href="https://www.linkedin.com/in/paul-antony-900715222"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-3xl lg:text-4xl font-black text-[#F4F4F0] hover:text-[#FF8F48] transition-all flex items-center gap-2 group"
            >
              <span>LinkedIn</span>
              <span className="text-[#FF8F48] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>

        </div>
      </div>
    </AnimatedSection>
  );
}