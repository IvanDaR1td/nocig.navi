// src/components/FakeOfflineIntro.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const endings = [
  '你以为我会断网？',
  '来都来了~',
  '再骗你一次',
  '惊不惊喜 意不意外',
  '差点就信了！'
];

function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Default';
}

const fakeOfflineScreens: Record<string, JSX.Element> = {
  Chrome: (
    <div className="text-center">
      <p className="text-2xl">没有互联网连接</p>
      <p className="mt-2">ERR_INTERNET_DISCONNECTED</p>
    </div>
  ),
  Firefox: (
    <div className="text-center">
      <p className="text-2xl">无法连接</p>
      <p className="mt-2">请检查您的网络设置</p>
    </div>
  ),
  Edge: (
    <div className="text-center">
      <p className="text-2xl">Hmmm… 无法访问此页面</p>
      <p className="mt-2">请检查您的连接</p>
    </div>
  ),
  Safari: (
    <div className="text-center">
      <p className="text-2xl">无法打开页面</p>
      <p className="mt-2">Safari 无法连接到服务器</p>
    </div>
  ),
  Default: (
    <div className="text-center">
      <p className="text-2xl">断网啦</p>
      <p className="mt-2">请检查网络</p>
    </div>
  ),
};

export function FakeOfflineIntro({ language }: { language: 'en' | 'zh' }) {
  const [showSike, setShowSike] = useState(false);
  const [ending, setEnding] = useState('');
  const browser = detectBrowser();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSike(true);
      setEnding(endings[Math.floor(Math.random() * endings.length)]);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-900">
      {!showSike ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-700 dark:text-gray-300"
        >
          {fakeOfflineScreens[browser]}
        </motion.div>
      ) : (
        <motion.div
          key="sike"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-pink-500"
        >
          SIKE!
          <p className="mt-4 text-lg text-black dark:text-white">{ending}</p>
        </motion.div>
      )}
    </div>
  );
}
