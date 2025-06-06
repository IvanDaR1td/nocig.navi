import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Theme, Language } from './types';
import FakeOfflineIntro from './components/FakeOfflineIntro';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.language.startsWith('zh')) setLanguage('zh');
    
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));

  if (isLoading) {
    return <FakeOfflineIntro language={language} />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout language={language} theme={theme} toggleLanguage={toggleLanguage} toggleTheme={toggleTheme} />}>
          <Route path="/" element={<HomePage language={language} />} />
        </Route>
        <Route path="*" element={<NotFound language={language} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;