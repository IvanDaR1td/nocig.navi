// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n';

type Theme = 'light' | 'dark';
type Language = 'en' | 'zh';

interface AppSettings {
  theme: Theme;
  lang: Language;
  darkMode: boolean; // 添加 darkMode 与 theme 同步
}

interface AppContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
  toggleDarkMode: () => void; // 统一命名
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialSettings = (): AppSettings => {
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  const storedLang = localStorage.getItem('lang') as Language | null;
  
  const browserLang: Language = navigator.language.startsWith('zh') ? 'zh' : 'en';
  const isDarkMode = storedTheme ? storedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    theme: storedTheme || (isDarkMode ? 'dark' : 'light'),
    lang: storedLang || browserLang,
    darkMode: isDarkMode
  };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(getInitialSettings);

  // 统一处理主题和暗模式
  const applyThemeSettings = useCallback((theme: Theme) => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
    
    setSettings(prev => ({
      ...prev,
      theme,
      darkMode: isDark
    }));
  }, []);

  useEffect(() => {
    i18n.changeLanguage(settings.lang);
    localStorage.setItem('lang', settings.lang);
  }, [settings.lang]);

  useEffect(() => {
    applyThemeSettings(settings.theme);
  }, [settings.theme, applyThemeSettings]);

  const toggleTheme = useCallback(() => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    applyThemeSettings(newTheme);
  }, [settings.theme, applyThemeSettings]);

  const toggleDarkMode = useCallback(() => {
    toggleTheme(); // 与 toggleTheme 统一行为
  }, [toggleTheme]);

  const setLang = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
    setSettings(prev => ({ ...prev, lang }));
  }, []);

  return (
    <AppContext.Provider value={{ 
      settings, 
      toggleTheme, 
      setLang,
      toggleDarkMode // 暴露统一方法
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};