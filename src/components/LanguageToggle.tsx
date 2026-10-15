'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className="flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
    >
      <span className={language === 'en' ? 'font-bold' : ''}>EN</span>
      <span className="mx-1">/</span>
      <span className={language === 'bn' ? 'font-bold' : ''}>BN</span>
    </button>
  );
}
