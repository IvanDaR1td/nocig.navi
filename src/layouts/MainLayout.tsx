import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { animate, createScope, stagger } from 'animejs';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import IntroGate from '../components/IntroGate';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { hasEnteredArchive, rememberArchiveEntry } from '../utils/introSession';

function RouteContent({ reveal }: { reveal: boolean }) {
  const { pathname, hash } = useLocation();
  const revealOnArrival = useRef(reveal);
  useEffect(() => {
    const target = document.getElementById(hash ? hash.slice(1) : 'main-content');
    if (hash) target?.scrollIntoView({ block: 'start' });
    target?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return <div className="route-content">
    <Outlet />
    {revealOnArrival.current && reveal && <div className="route-reveal" aria-hidden="true">
      <motion.span initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: .46, ease: [.22, .65, .3, 1] }} />
      <motion.span initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: .46, ease: [.22, .65, .3, 1] }} />
    </div>}
  </div>;
}

export default function MainLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [gate, setGate] = useState<'closed' | 'opening' | 'done'>(() => (pathname === '/' || pathname === '/home') && !reducedMotion && !hasEnteredArchive() ? 'closed' : 'done');
  const world = useRef<HTMLDivElement>(null);
  const gated = gate !== 'done';
  const complete = () => { rememberArchiveEntry(); setGate('done'); };

  useEffect(() => {
    if (reducedMotion && (pathname === '/' || pathname === '/home')) { rememberArchiveEntry(); setGate('done'); }
  }, [pathname, reducedMotion]);
  useEffect(() => {
    if (gate !== 'opening' || reducedMotion) return;
    const scope = createScope({ root: world }).add(() => {
      animate('[data-gate-stagger]', { opacity: [0, 1], translateY: [12, 0], delay: stagger(65, { start: 500 }), duration: 600, ease: 'out(3)' });
    });
    return () => scope.revert();
  }, [gate, reducedMotion]);
  useEffect(() => {
    if (gate === 'done') document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [gate]);

  return <>
    <motion.div ref={world} className="site-shell site-world" data-gate-state={gate} {...(gated ? { inert: '' } : {})} aria-hidden={gated || undefined}
      initial={gated ? { scale: .92, filter: 'blur(7px)' } : false}
      animate={{ scale: gate === 'closed' ? .92 : 1, filter: gate === 'closed' ? 'blur(7px)' : gate === 'opening' ? 'blur(0px)' : 'none' }}
      transition={{ duration: gate === 'opening' ? 1.35 : 0, ease: [.22, .65, .3, 1] }}
      onAnimationComplete={() => { if (gate === 'opening') complete(); }}>
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>{t('common.skipToContent')}</a>
      <Navbar />
      <div className="page-outlet"><Suspense fallback={<div className="page-loading page-width" role="status">{t('common.loading')}</div>}>
        <RouteContent key={pathname} reveal={!gated && !reducedMotion} />
      </Suspense></div>
      <Footer />
    </motion.div>
    {gated && <IntroGate opening={gate === 'opening'} enter={() => setGate(current => current === 'closed' ? 'opening' : current)} skip={complete} />}
  </>;
}
