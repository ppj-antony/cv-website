'use client';

import React from 'react';
import AnimatedSection from './AnimatedSection';
import { content, Language } from '@/data/content';
import { TextRoll } from '@/components/ui/text-roll';

interface SectionProps {
  lang: Language;
}

export default function EducationSection({ lang }: SectionProps) {
  const currentContent = content[lang].education;

  return (
    <AnimatedSection id="education" className="bg-[#0A0A0C] text-[#F4F4F0] py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F4F0] mb-16 border-b border-white/10 pb-4">
          <TextRoll>{currentContent.title}</TextRoll>
        </h2>

        <div className="space-y-12">
          {currentContent.items.map((item, index) => {
            const isDegree = index < 2;
            return (
              <div
                key={index}
                className={`border-l-4 ${
                  isDegree ? 'border-[#FF8F48]' : 'border-gray-700'
                } pl-6 sm:pl-8 py-1`}
              >
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
                  {item.period}
                </span>
                <h3
                  className={`${
                    isDegree ? 'text-2xl sm:text-3xl font-black' : 'text-xl sm:text-2xl font-bold'
                  } text-[#F4F4F0] mt-1`}
                >
                  {item.degree}
                </h3>
                <p className="mt-2 text-[#8E8E93] max-w-3xl leading-relaxed text-sm sm:text-base font-normal">
                  {item.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}