import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  // 设置 HTML class
  const applyTheme = (light: boolean) => {
    const root = document.documentElement;
    if (light) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  };

  // 点击按钮切换主题
  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  // 挂载时检查 localStorage / 系统偏好
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const useLight = saved === 'light' || (!saved && prefersLight);
    setIsLight(useLight);
    applyTheme(useLight);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      aria-label="切换主题"
      className="text-xl hover:scale-110 transition-transform"
    >
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
