import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [animationText, setAnimationText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const texts = t('home.animations', { returnObjects: true }) as string[];
    const idx = Math.floor(Math.random() * texts.length);
    setAnimationText(texts[idx]);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [t]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className={`text-center mb-12 ${glitchEffect ? 'glitch' : ''}`}>
        <h1 className="text-5xl font-bold neon-text text-[#50fa7b] mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-xl text-[#bd93f9] italic">
          {animationText}
        </p>
      </div>

      <div className="bg-[#44475a] rounded-xl overflow-hidden shadow-2xl border border-[#6272a4]">
        <div className="bg-[#6272a4] py-2 px-4 flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5555]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f1fa8c]"></div>
            <div className="w-3 h-3 rounded-full bg-[#50fa7b]"></div>
          </div>
          <div className="ml-3 text-xs">Spotify Player</div>
        </div>
        {/* 在此处添加播放器组件 */}
      </div>

      <div className="mt-12 text-center text-[#bd93f9]">
        <p className="animate-pulse">▼ Scroll down for more ▼</p>
      </div>
    </div>
  );
}
