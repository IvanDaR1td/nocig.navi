// pages/Entry.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const logLines = [
  'SYSTEM BOOTING...',
  'CHECKING HARDWARE...',
  'CPU: OK',
  'MEMORY: OK',
  'STORAGE: OK',
  'LOADING MODULES...',
  'NETWORK: INITIALIZING...',
  'SYSTEM READY. ',
  'WELCOME USER.'
];

export default function Entry() {
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();

  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const fullText = useRef('');

  useEffect(() => {
    const typeNextChar = () => {
      if (lineIndex.current >= logLines.length) {
        setTimeout(() => navigate('/home'), 1500); // 所有行完成后延迟跳转
        return;
      }

      const line = logLines[lineIndex.current];
      fullText.current += line.charAt(charIndex.current);
      setTypedText(fullText.current);

      charIndex.current++;

      if (charIndex.current >= line.length) {
        fullText.current += '\n'; // 换行
        setTypedText(fullText.current);
        lineIndex.current++;
        charIndex.current = 0;
        setTimeout(typeNextChar, 300); 
      } else {
        setTimeout(typeNextChar, 50);
      }
    };

    typeNextChar();
  }, [navigate]);

  return (
    <div className="flex items-center justify-start min-h-screen w-full bg-black px-8 py-8 font-mono text-green-400 whitespace-pre-wrap text-lg sm:text-xl md:text-2xl">
      <pre>
        {typedText}
        <span className="animate-blink">█</span>
      </pre>
      <style>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
