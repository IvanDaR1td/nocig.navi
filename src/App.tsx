import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // 默认导入
import Projects from './pages/Projects'; // 默认导入
import About from './pages/About'; // 默认导入
import Inspirations from './pages/Inspirations'; // 默认导入
import NotFound404 from './pages/NotFound404'; // 默认导入
import Entry from './pages/Entry'; // 默认导入
import MainLayout from './layouts/MainLayout'; // 默认导入

// 使用默认导出
import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/inspirations" element={<Inspirations />} />
        </Route>
        {/* 404页面改成一个明确路径 */}
        <Route path="/404" element={<NotFound404 />} />
        {/* 未知路径重定向回Entry */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
