"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    services: 'Services',
    blog: 'Blog',
    contact: 'Contact',
    hireMe: 'Hire Me',
    downloadResume: 'Download Resume',
    viewProjects: 'View Projects',
    getInTouch: 'Get in Touch',
    readMore: 'Read More',
    submit: 'Submit',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
  },
  bn: {
    home: 'হোম',
    about: 'সম্পর্কে',
    skills: 'দক্ষতা',
    projects: 'প্রজেক্টস',
    services: 'সেবাসমূহ',
    blog: 'ব্লগ',
    contact: 'যোগাযোগ',
    hireMe: 'হায়ার মি',
    downloadResume: 'রেজুমে ডাউনলোড',
    viewProjects: 'প্রজেক্ট দেখুন',
    getInTouch: 'যোগাযোগ করুন',
    readMore: 'আরও পড়ুন',
    submit: 'জমা দিন',
    name: 'নাম',
    email: 'ইমেইল',
    subject: 'বিষয়',
    message: 'বার্তা',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguage(savedLang);
    }
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
