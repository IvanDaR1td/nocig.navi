import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

// 使用默认导出
export default function LanguageSwitcher() {
  const { settings, setLang } = useAppContext();
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    setLang(lang as 'en' | 'zh');
    i18n.changeLanguage(lang);
  };

  return (
    <select
      value={settings.lang}
      onChange={e => changeLanguage(e.target.value)}
      className="p-2 rounded border bg-white dark:bg-gray-800 text-black dark:text-white"
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}