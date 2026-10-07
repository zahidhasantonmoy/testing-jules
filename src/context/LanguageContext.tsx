'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'hero.view_work': 'View My Work',
    'hero.download_cv': 'Download CV',
    'hero.contact_me': 'Contact Me',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'সম্পর্কে',
    'nav.projects': 'প্রজেক্টস',
    'nav.blog': 'ব্লগ',
    'nav.services': 'সেবাসমূহ',
    'nav.contact': 'যোগাযোগ',
    'nav.resume': 'রিজিউম',
    'hero.view_work': 'আমার কাজ দেখুন',
    'hero.download_cv': 'সিভি ডাউনলোড করুন',
    'hero.contact_me': 'যোগাযোগ করুন',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string) => {
    if (!mounted) return translations['en'][key as keyof typeof translations['en']] || key;
    return translations[language][key as keyof typeof translations['en']] || key;
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
