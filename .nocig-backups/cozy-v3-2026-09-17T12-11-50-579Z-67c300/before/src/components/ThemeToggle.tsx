import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  const applyTheme = (light: boolean) => {
    document.documentElement.classList.toggle('light', light);
  };

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const useLight = saved === 'light' || (!saved && prefersLight);
    setIsLight(useLight);
    applyTheme(useLight);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex h-8 w-8 items-center justify-center bg-transparent text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
};

export default ThemeToggle;
