import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import { readPreference, writePreference } from './utils/preferences';

export type Language = 'en' | 'zh';
export function normalizeLanguage(value?: string | null): Language {
  return value?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}
const saved = readPreference('lang');
const language = saved === 'en' || saved === 'zh' ? saved : normalizeLanguage(navigator.language);
function syncLanguage(value: string) {
  const lang = normalizeLanguage(value);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  writePreference('lang', lang);
}
i18n.on('languageChanged', syncLanguage);
void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, zh: { translation: zh } },
  lng: language, fallbackLng: 'en', supportedLngs: ['en', 'zh'], load: 'languageOnly',
  returnNull: false, interpolation: { escapeValue: false },
});
syncLanguage(language);
export default i18n;
