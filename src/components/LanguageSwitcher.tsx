import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
  const { settings, setLang, languageChanging } = useAppContext();
  const { t } = useTranslation();
  return <button type="button" className="language-toggle" onClick={() => setLang(settings.lang === 'en' ? 'zh' : 'en')}
    aria-disabled={languageChanging} aria-busy={languageChanging} aria-label={t('controls.language.label')} title={t('controls.language.label')}>
    <span className="language-toggle-symbol" aria-hidden="true">
      <span className="language-choice language-choice--zh" lang="zh-CN">{t('controls.language.short', { lng: 'en' })}</span>
      <span className="language-choice language-choice--en" lang="en">{t('controls.language.short', { lng: 'zh' })}</span>
    </span>
  </button>;
}
