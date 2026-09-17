import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer';
export default function Footer() {
  const { t } = useTranslation();
  return <footer className="site-footer page-width">
    <p>{t('footer.line')}</p>
    <div className="footer-bottom"><small>{t('footer.copyright', { year: new Date().getFullYear() })}</small><AudioPlayer /></div>
  </footer>;
}
