import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number; // 每个字符间隔（ms）
  sound?: boolean; // 是否启用打字音效
  clearBeforeTyping?: boolean;
}

export function useTypewriter({
  text,
  speed = 50,
  sound = false,
  clearBeforeTyping = true,
}: UseTypewriterOptions) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!text) return;

    let index = 0;
    let current = '';
    let typingAudio: HTMLAudioElement | null = null;

    if (sound) {
      typingAudio = new Audio('/sounds/keypress.mp3'); // 你需要放一个短小的按键音效文件
      typingAudio.volume = 0.3;
    }

    if (clearBeforeTyping) setTyped('');

    const interval = setInterval(() => {
      current += text.charAt(index);
      setTyped(current);

      if (sound && typingAudio) {
        typingAudio.currentTime = 0;
        typingAudio.play().catch(() => {}); // 避免浏览器播放错误
      }

      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return typed;
}
