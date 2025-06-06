import { ComponentProps } from '../types';
import HomeSection from '../sections/Home';
import AboutSection from '../sections/About';
import ProjectsSection from '../sections/Projects';
import InspirationSection from '../sections/Inspiration';


const HomePage: React.FC<ComponentProps> = ({ language }) => (
  <>
    <HomeSection language={language} />
    <AboutSection language={language} />
    <ProjectsSection language={language} />
    <InspirationSection language={language} />
  </>
);

export default HomePage;