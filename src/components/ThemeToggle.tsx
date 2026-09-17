import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
export default function ThemeToggle() {
  const { settings, toggleTheme } = useAppContext();
  const { t } = useTranslation();
  const label = t(settings.theme === 'light' ? 'controls.theme.dark' : 'controls.theme.light');
  return <button type="button" className="icon-button" onClick={toggleTheme} aria-label={label} title={label}>
    {settings.theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
  </button>;
}
