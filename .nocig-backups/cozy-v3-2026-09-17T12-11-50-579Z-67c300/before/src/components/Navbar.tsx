import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

interface NavLink {
  path: string;
  key: string;
}

export default function Navbar(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { path: '/projects', key: 'projects' },
    { path: '/about', key: 'about' },
    { path: '/inspirations', key: 'inspirations' },
  ];

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/92 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          to="/home"
          className="shrink-0 text-xl text-[var(--color-title)] no-underline hover:text-[var(--color-primary)] hover:no-underline"
        >
          nocig.navi<span className="tech-type ml-1 text-[var(--color-primary)]">/</span>
        </Link>

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`border-b pb-0.5 text-base no-underline hover:no-underline ${
                    isActive
                      ? 'border-[var(--color-primary)] text-[var(--color-title)]'
                      : 'border-transparent text-[var(--color-secondary)] hover:text-[var(--color-text)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl gap-5 overflow-x-auto px-4 pb-3 sm:hidden sm:px-6">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap border-b pb-0.5 text-base no-underline hover:no-underline ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-title)]'
                  : 'border-transparent text-[var(--color-secondary)]'
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
