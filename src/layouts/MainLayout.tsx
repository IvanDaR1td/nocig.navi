import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import { Language, Theme } from '../types';

interface MainLayoutProps {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ language, theme, toggleLanguage, toggleTheme }) => (
  <>
    <Navbar language={language} theme={theme} toggleLanguage={toggleLanguage} toggleTheme={toggleTheme} />
    <main>
      <Outlet /> {/* Child routes will render here (e.g., HomePage) */}
    </main>
    <AudioPlayer />
    <Footer language={language} />
  </>
);

export default MainLayout;