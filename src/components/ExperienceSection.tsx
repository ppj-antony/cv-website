'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { content, ExperienceItem, Language } from '@/data/content';
import { TextRoll } from '@/components/ui/text-roll';

interface SectionProps {
  lang: Language;
}

function ExperienceItemCard({
  item,
  coreResponsibilitiesLabel,
}: {
  item: ExperienceItem;
  coreResponsibilitiesLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasResponsibilities = item.responsibilities && item.responsibilities.length > 0;

  return (
    <div
      className={`border-l-4 ${
        item.isCurrent ? 'border-[#FF8F48]' : 'border-gray-300'
      } pl-6 sm:pl-8 py-1`}
    >
      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
        {item.period} • {item.company}
      </span>
      <h3 className="text-2xl sm:text-3xl font-black mt-1 text-[#0A0A0C]">
        {item.role}
      </h3>
      <p className="mt-2 text-gray-700 max-w-3xl leading-relaxed text-sm sm:text-base font-medium">
        {item.description}
      </p>

      {/* Ausklappbarer Button */}
      {hasResponsibilities && (
        <div className="mt-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8E8E93] hover:text-[#0A0A0C] transition-colors py-1 focus:outline-none cursor-pointer"
            aria-expanded={isOpen}
          >
            <span>{coreResponsibilitiesLabel}</span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-4 h-4 text-[#FF8F48]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          {/* Sanft ausfahrendes Dropdown */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="responsibilities-dropdown"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 pb-2">
                  {item.responsibilities?.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-black/5 backdrop-blur-sm rounded-2xl border border-black/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[#0A0A0C] font-bold text-sm sm:text-base block mb-2">
                          {resp.title}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600 leading-relaxed block font-medium">
                          {resp.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function ExperienceSection({ lang }: SectionProps) {
  const currentContent = content[lang].experience;

  return (
    <AnimatedSection
      id="experience"
      className="bg-[#F4F4F0] text-[#0A0A0C] py-24 px-6 sm:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-16 border-b-2 border-black/10 pb-4">
          <TextRoll>{currentContent.title}</TextRoll>
        </h2>

        <div className="space-y-16">
          {currentContent.items.map((item, index) => (
            <ExperienceItemCard
              key={index}
              item={item}
              coreResponsibilitiesLabel={currentContent.coreResponsibilities}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}