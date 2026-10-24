"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.builtWith': 'Built with Next.js, Tailwind CSS & Framer Motion',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'সম্পর্কে',
    'nav.skills': 'দক্ষতা',
    'nav.projects': 'প্রজেক্টস',
    'nav.blog': 'ব্লগ',
    'nav.services': 'সার্ভিসেস',
    'nav.contact': 'যোগাযোগ',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
    'footer.builtWith': 'Next.js, Tailwind CSS ও Framer Motion দ্বারা নির্মিত',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
