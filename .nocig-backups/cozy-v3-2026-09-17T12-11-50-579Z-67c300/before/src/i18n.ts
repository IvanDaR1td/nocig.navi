// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof import('./locales/en.json');
      zh: typeof import('./locales/zh.json');
    };
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
