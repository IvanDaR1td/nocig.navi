import { useAppContext } from '../context/AppContext';

// 使用默认导出
export default function ThemeToggle() {
  const { settings, toggleTheme } = useAppContext();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {settings.theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}