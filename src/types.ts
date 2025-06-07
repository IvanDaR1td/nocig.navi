// src/types.ts

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'zh';

export interface AppSettings {
  theme: ThemeMode;
  language: Language;
  musicEnabled: boolean;
}
