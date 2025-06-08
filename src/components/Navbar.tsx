import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useAppContext } from '../context/AppContext';
import { Icon, LucideIconName } from './Icon';

interface NavLink {
  path: string;
  key: string;
  icon: LucideIconName;
}

export default function Navbar(): JSX.Element {
  const { t } = useTranslation();
  const { settings } = useAppContext();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { path: "/home", key: "home", icon: "Home" },
    { path: "/projects", key: "projects", icon: "Gamepad" },
    { path: "/about", key: "about", icon: "User" },
    { path: "/inspirations", key: "inspirations", icon: "Lightbulb" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
      className="flex justify-between items-center px-6 py-3 border-b border-border text-text font-mono backdrop-blur-sm"
    >
      {/* 🔰 Logo + Links */}
      <div className="flex items-center space-x-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-primary font-handwriting neon-text"
        >
          nocig.navi
        </motion.div>

        <div className="w-px h-5 bg-border opacity-50" />

        <div className="flex space-x-2">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 
                    ${isActive
                      ? 'bg-primary/10 text-primary border border-primary'
                      : 'hover:bg-border hover:text-primary/90'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon name={link.icon} className="w-4 h-4" />
                  <span>{t(`nav.${link.key}`)}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🌐 Language & Theme */}
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <LanguageSwitcher />
        <ThemeToggle />
      </motion.div>
    </motion.nav>
  );
}
