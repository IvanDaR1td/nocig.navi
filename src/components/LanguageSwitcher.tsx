import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
  const { settings, setLang } = useAppContext();
  const { t } = useTranslation();
  return <button type="button" className="language-toggle" onClick={() => setLang(settings.lang === 'en' ? 'zh' : 'en')}
    aria-label={t('controls.language.label')} title={t('controls.language.label')}>
    <span lang={settings.lang === 'en' ? 'zh-CN' : 'en'}>{t('controls.language.short')}</span>
  </button>;
}
