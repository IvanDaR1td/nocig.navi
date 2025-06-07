import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();
  const [animationText, setAnimationText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  // 计时器 refs，避免闭包导致状态不准
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 随机选一条动画文本 + 定时触发 glitch 效果
  useEffect(() => {
    const texts = t('home.animations', { returnObjects: true }) as string[];
    const idx = Math.floor(Math.random() * texts.length);
    setAnimationText(texts[idx]);

    glitchIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => setGlitchEffect(false), 100);
      }
    }, 3000);

    return () => {
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, [t]);

  // 打字机效果
  useEffect(() => {
    if (!animationText) return;

    let index = 0;
    let currentText = '';
    setTypedText(''); // 立即清空显示内容

    typingIntervalRef.current = setInterval(() => {
      currentText += animationText.charAt(index);
      setTypedText(currentText);
      index++;

      if (index >= animationText.length && typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    }, 50);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [animationText]);

  // 点击次数重置
  useEffect(() => {
    if (clickCount === 0) return;

    if (clickResetTimeoutRef.current) clearTimeout(clickResetTimeoutRef.current);
    clickResetTimeoutRef.current = setTimeout(() => setClickCount(0), 1500);

    return () => {
      if (clickResetTimeoutRef.current) clearTimeout(clickResetTimeoutRef.current);
    };
  }, [clickCount]);

  const handleNeonClick = () => {
    setClickCount((c) => c + 1);

    const neonEl = document.getElementById('neon-logo');
    if (neonEl) {
      neonEl.classList.add('click-feedback');
      setTimeout(() => neonEl.classList.remove('click-feedback'), 200);
    }

    if (clickCount + 1 >= 3) {
      navigate('/404');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 fadeIn">
      {/* 欢迎头部 */}
      <div className={`text-center mb-16 transition-all ${glitchEffect ? 'glitch' : ''}`}>
        <h1
          id="neon-logo"
          onClick={handleNeonClick}
          className="text-6xl font-bold neon-text mb-4 cursor-pointer select-none"
          title="R U That Bored? There's nothing here."
        >
          {t('home.welcome')}
        </h1>
        <p className="text-xl text-[var(--color-secondary)] italic opacity-90 tracking-wide font-title">
          {typedText}
          <span className="animate-blink">█</span>
        </p>
      </div>

      {/* 播放器窗口 */}
      <div className="glass-card relative mb-16">
        <div className="flex items-center justify-between border-b border-[var(--color-secondary)] pb-2 mb-4">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5555]" />
            <div className="w-3 h-3 rounded-full bg-[#f1fa8c]" />
            <div className="w-3 h-3 rounded-full bg-[#50fa7b]" />
          </div>
          <div className="text-sm text-gray-300 tracking-widest">SPOTIFY PLAYER</div>
          <div />
        </div>
        <div className="text-center text-sm text-gray-400 italic">[ Player 插槽 ]</div>
      </div>

      {/* 向下箭头提示 */}
      <div className="text-center text-[var(--color-secondary)] mt-12">
        <p className="animate-pulse text-lg tracking-wide">▼ Scroll down for more ▼</p>
      </div>
    </div>
  );
}
