import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
export default function MainLayout() {
  const { t } = useTranslation();
  return <div className="site-shell">
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
    }}>{t('common.skipToContent')}</a>
    <Navbar />
    <div className="page-outlet"><Outlet /></div>
    <Footer />
  </div>;
}
