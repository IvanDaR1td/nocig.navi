import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useReducedMotion } from '../hooks/useReducedMotion';

function RouteContent() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = document.getElementById(hash ? hash.slice(1) : 'main-content');
    if (hash) target?.scrollIntoView({ block: 'start' });
    target?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return <Outlet />;
}

export default function MainLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  return <div className="site-shell">
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
    }}>{t('common.skipToContent')}</a>
    <Navbar />
    <motion.div
      key={pathname}
      className="page-outlet"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
    ><Suspense fallback={<div className="page-loading page-width" role="status">{t('common.loading')}</div>}><RouteContent key={pathname} /></Suspense></motion.div>
    <Footer />
  </div>;
}
