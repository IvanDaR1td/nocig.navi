
// src/sections/Home.tsx
import { motion } from 'framer-motion';

export function Home({ language }: { language: 'en' | 'zh' }) {
  const phrases = [
    '你以为我会断网？',
    '来都来了~',
    '页面是假的，但我是认真的',
    '继续滑，别害怕',
  ];

  const randomOutro = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {language === 'zh' ? '欢迎来到 nocig.navi' : 'Welcome to nocig.navi'}
      </motion.h1>

      <p className="text-center max-w-xl mb-8">
        {language === 'zh'
          ? '这是我的个人数字据点，目前正在忙于构建各种实验项目~'
          : 'This is my personal digital node, currently busy building experimental things~'}
      </p>

      <motion.p
        className="italic text-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {randomOutro}
      </motion.p>
    </section>
  );
}
