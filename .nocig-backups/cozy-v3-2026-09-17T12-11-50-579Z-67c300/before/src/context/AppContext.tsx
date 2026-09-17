import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
type Lang = 'en' | 'zh';

interface AppSettings {
  theme: Theme;
  lang: Lang;
}

interface AppContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  setLang: (lang: Lang) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
};

const getInitialLang = (): Lang => {
  const stored = localStorage.getItem('lang') as Lang | null;
  if (stored === 'en' || stored === 'zh') return stored;
  return 'en';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: getInitialTheme(),
    lang: getInitialLang(),
  });

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const newTheme = prev.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return { ...prev, theme: newTheme };
    });
  }, []);

  const setLang = useCallback((lang: Lang) => {
    localStorage.setItem('lang', lang);
    setSettings((prev) => ({ ...prev, lang }));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', settings.theme === 'light');
  }, [settings.theme]);

  return (
    <AppContext.Provider value={{ settings, toggleTheme, setLang }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
