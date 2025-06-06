import React, { useEffect } from 'react';
import { ComponentProps } from '../types';

const NotFound: React.FC<ComponentProps> = ({ language }) => {
  useEffect(() => {
    const timer = setTimeout(() => { window.location.hash = '/'; }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black text-green-400 font-mono p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <p>C:\Users\nocig&gt; 404.exe</p>
        <p className="mt-4">{language === 'zh' ? '错误：未找到页面。' : 'Error: Page not found.'}</p>
        <p className="mt-2">{language === 'zh' ? '执行 "cd /" 返回主页。' : 'Executing "cd /" to return home.'}</p>
        <p className="mt-4 animate-pulse">_</p>
      </div>
    </div>
  );
};

export default NotFound;