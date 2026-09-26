import { lazy } from 'react';
import { pageLoaders } from './pages/loaders';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Entry from './pages/Entry';
import MainLayout from './layouts/MainLayout';
import RouteEffects from './components/RouteEffects';

const Projects = lazy(pageLoaders.projects);
const About = lazy(pageLoaders.about);
const Inspirations = lazy(pageLoaders.inspirations);
const FoSho = lazy(pageLoaders.fosho);

export default function App() {
  return <>
    <RouteEffects />
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/fosho" element={<FoSho />} />
        <Route path="/about" element={<About />} />
        <Route path="/inspirations" element={<Inspirations />} />
      </Route>
      <Route path="/404" element={<NotFound404 />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </>;
}
