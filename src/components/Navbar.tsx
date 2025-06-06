import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { t } = useTranslation();
  const { settings } = useAppContext();
  const location = useLocation();
  
  const navLinks = [
    { path: "/home", key: "home", icon: "🏠" },
    { path: "/projects", key: "projects", icon: "🕹️" },
    { path: "/about", key: "about", icon: "👤" },
    { path: "/inspirations", key: "inspirations", icon: "💡" },
  ];

  return (
     <nav className="py-4 px-6 border-b border-[#6272a4] flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-[#ff79c6] text-xl">nocig.navi</div>
        <div className="h-4 w-px bg-[#6272a4] mx-2"></div>
        
        <div className="flex space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded-md flex items-center ${
                location.pathname === link.path 
                  ? 'bg-[#44475a] text-[#50fa7b]' 
                  : 'hover:bg-[#44475a]'
              }`}
            >
              <span className="mr-1.5">{link.icon}</span>
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
    
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}