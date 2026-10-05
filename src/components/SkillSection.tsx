'use client';

import SkillsInteractive from './SkillsInteractive';
import { useLanguage } from '@/context/LanguageContext';

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillSectionProps {
  skills: SkillCategory[];
}

const SkillSection = ({ skills }: SkillSectionProps) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12">{t('my_skills')}</h2>
      <SkillsInteractive skills={skills} />
    </div>
  );
};

export default SkillSection;
