import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { settings, setLang } = useAppContext();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = settings.lang === 'en' ? 'zh' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-8 min-w-8 items-center justify-center bg-transparent px-1 tech-type transition hover:text-[var(--color-primary)]"
      aria-label="Switch language"
      title="Switch language"
    >
      {settings.lang === 'en' ? '中' : 'EN'}
    </button>
  );
}
