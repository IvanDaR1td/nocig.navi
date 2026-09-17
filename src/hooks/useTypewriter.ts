import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
interface Options { text: string; speed?: number; sound?: boolean; clearBeforeTyping?: boolean }
export function useTypewriter({ text, speed = 34 }: Options) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState({ text, count: 0 });
  useEffect(() => {
    setFrame({ text, count: 0 });
    if (reduced || !text) return;
    const characters = Array.from(text);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setFrame({ text, count });
      if (count >= characters.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed, reduced]);
  return reduced ? text : Array.from(text).slice(0, frame.text === text ? frame.count : 0).join('');
}
