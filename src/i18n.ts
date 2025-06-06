import { Language } from './types';

export const uiText = {
  nav: {
    home: { en: 'Home', zh: '主页' },
    about: { en: 'About', zh: '关于' },
    projects: { en: 'Projects', zh: '项目' },
    inspiration: { en: 'Inspiration', zh: '灵感' },
  },
  buttons: {
    toggleLanguage: { en: '中', zh: 'EN' },
    toggleTheme: { en: 'Light', zh: 'Dark' },
  },
  footer: {
    credit: { en: 'Built by nocig.navi', zh: '由 nocig.navi 构建' },
  },
};

export const introEndings: Record<Language, string[]> = {
  en: ["Thought I'd disconnect?", "You came all this way~", "Fooled you again!", "Surprise!", "You almost believed it!"],
  zh: ['你以为我会断网？', '来都来了~', '再骗你一次', '惊不惊喜 意不意外', '差点就信了！'],
};

// ... add other text resources here