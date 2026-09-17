import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../i18n';
import type { Language } from '../i18n';
import { readPreference, writePreference } from '../utils/preferences';
import { applySiteFavicon } from '../utils/favicon';

type Theme = 'light' | 'dark';
interface AppContextType {
  settings: { theme: Theme; lang: Language };
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
function initialTheme(): Theme {
  const stored = readPreference('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const lang = normalizeLanguage(i18n.resolvedLanguage || i18n.language);
  const toggleTheme = useCallback(() => setTheme(value => value === 'dark' ? 'light' : 'dark'), []);
  const setLang = useCallback((value: Language) => { void i18n.changeLanguage(value); }, [i18n]);
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f3efe5' : '#201f1a');
    applySiteFavicon(theme);
    writePreference('theme', theme);
  }, [theme]);
  const value = useMemo(() => ({ settings: { theme, lang }, toggleTheme, setLang }), [theme, lang, toggleTheme, setLang]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
