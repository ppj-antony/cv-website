'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Standardmäßig 'en', außer in der URL steht explizit 'de'
  const [lang, setLangState] = useState<'de' | 'en'>('en');

  useEffect(() => {
    const urlLang = searchParams.get('lang');
    if (urlLang === 'de') {
      setLangState('de');
    } else if (urlLang === 'en') {
      setLangState('en');
    } else {
      setLangState('en'); // Standard ist Englisch
    }
  }, [searchParams]);

  // Funktion zum Umschalten der Sprache inklusive Aktualisierung der URL
  const setLang = (newLang: 'de' | 'en') => {
    setLangState(newLang);
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#F4F4F0] selection:bg-[#FF8F48] selection:text-black">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ExperienceSection lang={lang} />
      <EducationSection lang={lang} />
      <SkillsSection lang={lang} />
      <ContactSection lang={lang} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0C]" />}>
      <PortfolioContent />
    </Suspense>
  );
}