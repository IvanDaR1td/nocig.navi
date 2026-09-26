import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { transitionLanguage } from '../utils/languageTransition';
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
  languageChanging: boolean;
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
  const [languageChanging, setLanguageChanging] = useState(false);
  const languageBusy = useRef(false);
  const languageTransition = useRef<ReturnType<typeof transitionLanguage> | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; languageTransition.current?.cancel(); };
  }, []);
  const lang = normalizeLanguage(i18n.resolvedLanguage || i18n.language);
  const toggleTheme = useCallback(() => {
    // Arm transitions only after an intentional toggle, never during first paint.
    document.documentElement.classList.add('theme-ready');
    setTheme(value => value === 'dark' ? 'light' : 'dark');
  }, []);
  const setLang = useCallback((value: Language) => {
    if (languageBusy.current || value === normalizeLanguage(i18n.resolvedLanguage || i18n.language)) return;
    if (!Element.prototype.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void i18n.changeLanguage(value);
      return;
    }
    languageBusy.current = true;
    setLanguageChanging(true);
    const commit = () => flushSync(() => { void i18n.changeLanguage(value); });
    const transition = transitionLanguage(commit);
    languageTransition.current = transition;
    void transition.finished.catch(() => {
      // A failed animation must not prevent an intentional language change.
      if (mounted.current) commit();
    }).finally(() => {
      languageTransition.current = null;
      languageBusy.current = false;
      if (mounted.current) setLanguageChanging(false);
    });
  }, [i18n]);
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f3efe5' : '#201f1a');
    applySiteFavicon(theme);
    writePreference('theme', theme);
  }, [theme]);
  const value = useMemo(() => ({ settings: { theme, lang }, toggleTheme, setLang, languageChanging }), [theme, lang, toggleTheme, setLang, languageChanging]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
