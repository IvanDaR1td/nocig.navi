// src/utils/themeUtils.ts

export const getPreferredTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const setThemeClass = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  root.classList.remove(theme === 'dark' ? 'light' : 'dark');
  root.classList.add(theme);
};

export const saveTheme = (theme: string) => localStorage.setItem('theme', theme);
export const loadTheme = (): 'light' | 'dark' =>
  (localStorage.getItem('theme') as 'light' | 'dark') || getPreferredTheme();
