import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
export default function ThemeToggle() {
  const { settings, toggleTheme } = useAppContext();
  const { t } = useTranslation();
  const label = t(settings.theme === 'light' ? 'controls.theme.dark' : 'controls.theme.light');
  return <button type="button" className="icon-button theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
    <span className="theme-toggle-symbol" aria-hidden="true">
      <Moon className="theme-moon" size={17} />
      <Sun className="theme-sun" size={17} />
    </span>
  </button>;
}
