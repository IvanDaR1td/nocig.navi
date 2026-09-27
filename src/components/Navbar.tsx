import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { LayoutGroup, motion } from 'motion/react';
import { warmPage } from '../pages/loaders';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useReducedMotion } from '../hooks/useReducedMotion';

const links = [
  { path: '/projects', key: 'projects' },
  { path: '/about', key: 'about' },
  { path: '/inspirations', key: 'inspirations' }
];

function IvanWordmark() {
  return <span className="ivan-wordmark" aria-hidden="true">
    <span>IVAN</span>
    <span>CHAN</span>
  </span>;
}

export default function Navbar() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  return <header className="site-header page-width" data-gate-stagger>
    <Link className="site-name" to="/home" aria-label={`Ivan Chan — ${t('nav.home')}`}>
      <IvanWordmark />
    </Link>
    <LayoutGroup id="primary-navigation">
      <nav className="primary-nav" aria-label={t('nav.label')}>
        {links.map(link => <NavLink key={link.path} to={link.path} onMouseEnter={() => warmPage(link.path)} onFocus={() => warmPage(link.path)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          {({ isActive }) => <>
            <span className="nav-link-label" data-language-copy>{t('nav.' + link.key)}</span>
            {isActive && <motion.span
              className="nav-active-mark"
              data-language-layout
              layoutId={reducedMotion ? undefined : 'active-nav-underline'}
              transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />}
          </>}
        </NavLink>)}
      </nav>
    </LayoutGroup>
    <div className="site-controls"><LanguageSwitcher /><ThemeToggle /></div>
  </header>;
}
