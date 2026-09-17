import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pageKeys: Record<string, string> = {
  '/': 'entry',
  '/home': 'home',
  '/projects': 'projects',
  '/about': 'about',
  '/inspirations': 'inspirations',
  '/404': 'notfound'
};

export default function RouteEffects() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const previous = useRef(location.pathname);

  useEffect(() => {
    const page = t('meta.pages.' + (pageKeys[location.pathname] || 'notfound'));
    document.title = `${page} · Ivan Chan`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, [location.pathname, i18n.resolvedLanguage, t]);

  useEffect(() => {
    const changed = previous.current !== location.pathname;
    previous.current = location.pathname;
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        const anchor = document.getElementById(location.hash.slice(1));
        anchor?.scrollIntoView({ block: 'start' });
        anchor?.focus({ preventScroll: true });
      } else if (changed) {
        window.scrollTo({ top: 0 });
        const target = document.querySelector<HTMLElement>('[data-route-focus]') || document.getElementById('main-content');
        target?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
}
