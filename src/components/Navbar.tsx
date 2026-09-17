import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

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
  return <header className="site-header page-width">
    <Link className="site-name" to="/home" aria-label={`Ivan Chan — ${t('nav.home')}`}>
      <IvanWordmark />
    </Link>
    <nav className="primary-nav" aria-label={t('nav.label')}>
      {links.map(link => <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('nav.' + link.key)}</NavLink>)}
    </nav>
    <div className="site-controls"><LanguageSwitcher /><ThemeToggle /></div>
  </header>;
}
