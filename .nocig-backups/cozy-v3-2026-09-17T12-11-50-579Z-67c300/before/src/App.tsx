import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Inspirations from './pages/Inspirations';
import NotFound404 from './pages/NotFound404';
import Entry from './pages/Entry';
import MainLayout from './layouts/MainLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/inspirations" element={<Inspirations />} />
      </Route>
      <Route path="/404" element={<NotFound404 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
