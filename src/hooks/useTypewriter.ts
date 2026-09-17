import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Options {
  text: string;
  speed?: number;
  newlinePause?: number;
  punctuationPause?: number;
}

export function useTypewriter({
  text,
  speed = 38,
  newlinePause = 90,
  punctuationPause = 65,
}: Options) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState({ text, count: 0 });

  useEffect(() => {
    setFrame({ text, count: 0 });
    if (reduced || !text) return;

    const characters = Array.from(text);
    let count = 0;
    let timer = 0;

    const tick = () => {
      count += 1;
      setFrame({ text, count });
      if (count >= characters.length) return;

      const character = characters[count - 1];
      let delay = speed;
      if (character === '\n') delay += newlinePause;
      else if (/[.!?。！？…]/.test(character)) delay += punctuationPause;
      else if (/[,，:：;]/.test(character)) delay += Math.round(punctuationPause * 0.45);

      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 180);
    return () => window.clearTimeout(timer);
  }, [text, speed, newlinePause, punctuationPause, reduced]);

  return reduced ? text : Array.from(text).slice(0, frame.text === text ? frame.count : 0).join('');
}
