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
      onClick={toggleLanguage}
      className="px-4 py-2 rounded bg-[#50fa7b] text-black font-semibold hover:bg-[#45e06d] transition-colors"
      aria-label="切换语言"
      title="切换语言"
    >
      {settings.lang === 'en' ? '中' : 'EN'}
    </button>
  );
}
