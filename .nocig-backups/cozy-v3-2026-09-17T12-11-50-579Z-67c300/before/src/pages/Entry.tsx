import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Entry() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const fullText = useRef('');

  const logLines = useMemo(() => {
    const messages = t('entry.messages', { returnObjects: true }) as string[];
    const randomMessage = Array.isArray(messages) && messages.length
      ? messages[Math.floor(Math.random() * messages.length)]
      : 'WELCOME USER.';

    return [
      'SYSTEM BOOTING...',
      'CHECKING HARDWARE...',
      'CPU: OK',
      'MEMORY: OK',
      'STORAGE: OK',
      'LOADING MODULES...',
      'NETWORK: INITIALIZING...',
      'SYSTEM READY.',
      '',
      randomMessage,
    ];
  }, [i18n.language, t]);

  useEffect(() => {
    lineIndex.current = 0;
    charIndex.current = 0;
    fullText.current = '';
    setTypedText('');

    let timeoutId: number;

    const typeNextChar = () => {
      if (lineIndex.current >= logLines.length) {
        timeoutId = window.setTimeout(() => navigate('/home'), 1100);
        return;
      }

      const line = logLines[lineIndex.current];

      if (line.length === 0) {
        fullText.current += '\n';
        setTypedText(fullText.current);
        lineIndex.current += 1;
        charIndex.current = 0;
        timeoutId = window.setTimeout(typeNextChar, 120);
        return;
      }

      fullText.current += line.charAt(charIndex.current);
      setTypedText(fullText.current);
      charIndex.current += 1;

      if (charIndex.current >= line.length) {
        fullText.current += '\n';
        setTypedText(fullText.current);
        lineIndex.current += 1;
        charIndex.current = 0;
        timeoutId = window.setTimeout(typeNextChar, 220);
      } else {
        timeoutId = window.setTimeout(typeNextChar, 34);
      }
    };

    typeNextChar();
    return () => window.clearTimeout(timeoutId);
  }, [logLines, navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-start bg-[#0a0a09] px-8 py-8 font-mono text-[#a8ba8c] whitespace-pre-wrap text-base sm:text-lg md:text-xl">
      <pre className="m-0 whitespace-pre-wrap">
        {typedText}
        <span className="animate-entry-blink">█</span>
      </pre>
      <style>{`
        .animate-entry-blink { animation: entryBlink 1s step-start infinite; }
        @keyframes entryBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
