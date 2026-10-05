'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface Dictionary {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const dictionary: Dictionary = {
  home: { en: 'Home', bn: 'হোম' },
  about: { en: 'About', bn: 'সম্পর্কে' },
  skills: { en: 'Skills', bn: 'দক্ষতা' },
  projects: { en: 'Projects', bn: 'প্রজেক্ট' },
  blog: { en: 'Blog', bn: 'ব্লগ' },
  services: { en: 'Services', bn: 'সেবা' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
  all_rights_reserved: { en: 'All rights reserved.', bn: 'সর্বস্বত্ব সংরক্ষিত।' },
  made_with: { en: 'Built by Zahid Hasan Tonmoy', bn: 'জাহিদ হাসান তন্ময় দ্বারা নির্মিত' },
  about_me: { en: 'About Me', bn: 'আমার সম্পর্কে' },
  my_skills: { en: 'My Skills', bn: 'আমার দক্ষতা' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return dictionary[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
