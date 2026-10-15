'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.blog': 'Blog',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.resume': 'Resume',
    },
    bn: {
        'nav.home': 'হোম',
        'nav.about': 'সম্পর্কে',
        'nav.projects': 'প্রজেক্টস',
        'nav.skills': 'স্কিলস',
        'nav.blog': 'ব্লগ',
        'nav.services': 'সার্ভিসেস',
        'nav.contact': 'যোগাযোগ',
        'nav.resume': 'রেজিউম',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key;
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
