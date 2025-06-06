import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // ✅ 确保路径正确
import './i18n';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);