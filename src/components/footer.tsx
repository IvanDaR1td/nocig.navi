import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 w-full">
      <p>© {new Date().getFullYear()} Ivan Chan - {t('footer.copyright')}</p>
    </footer>
  );
}