'use client';

import React, { useRef, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { content, Language } from '@/data/content';
import { TextRoll } from '@/components/ui/text-roll';

interface SectionProps {
  lang: Language;
}

interface CardProps {
  title: string;
  description: string;
}

function SpotlightCard({ title, description }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden p-6 bg-black/10 backdrop-blur-md rounded-2xl border border-black/10 group transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between"
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.3), transparent 40%)`,
        }}
      />

      <div>
        <h3 className="text-xl sm:text-2xl font-black mb-3 text-black group-hover:text-black transition-colors">
          {title}
        </h3>
        <p className="text-black/80 text-xs sm:text-sm font-medium leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SkillsSection({ lang }: SectionProps) {
  const currentContent = content[lang].skills;

  return (
    <AnimatedSection id="skills" className="bg-[#FF8F48] text-black py-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-16 border-b-2 border-black/20 pb-4">
          <TextRoll>{currentContent.title}</TextRoll>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {currentContent.items.map((skill) => (
            <SpotlightCard key={skill.title} title={skill.title} description={skill.description} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}