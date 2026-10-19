'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  Home: { en: 'Home', bn: 'হোম' },
  About: { en: 'About', bn: 'সম্পর্কে' },
  Projects: { en: 'Projects', bn: 'প্রজেক্টস' },
  Blog: { en: 'Blog', bn: 'ব্লগ' },
  Services: { en: 'Services', bn: 'সেবাসমূহ' },
  Contact: { en: 'Contact', bn: 'যোগাযোগ' },
  Resume: { en: 'Resume', bn: 'রিজিউম' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: string) => {
    if (translations[key]) {
      return translations[key][language] || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
