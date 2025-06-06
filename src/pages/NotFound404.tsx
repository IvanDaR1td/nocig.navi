import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound404() {
  const { t } = useTranslation();
  const [cursorBlink, setCursorBlink] = useState(true);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lines = t('notfound.lines', { returnObjects: true }) as string[];
    
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 500);
    
    // 打字机效果
    const typingInterval = setInterval(() => {
      if (currentIndex < lines.length) {
        const currentLine = lines[currentIndex];
        setTypedLines(prev => [...prev, currentLine]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
    
    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [t, currentIndex]);

  return (
    <div className="bg-black text-[#50fa7b] font-mono h-screen flex flex-col justify-center items-center p-8 space-y-2">
      <div className="max-w-2xl">
        {typedLines.map((line, idx) => (
          <div key={idx} className="flex items-start mb-2">
            <span className="text-[#ff79c6] mr-2">$</span>
            <div className="flex items-center">
              <span className="typing-animation">{line}</span>
              {idx === typedLines.length - 1 && (
                <span className={`ml-1 w-2 h-5 bg-[#50fa7b] ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}></span>
              )}
            </div>
          </div>
        ))}
        
        {typedLines.length > 0 && (
          <Link
            to="/"
            className="mt-8 px-6 py-3 bg-[#50fa7b] text-black font-bold hover:bg-[#45e06d] transition-colors flex items-center"
          >
            <span className="mr-2">▶</span> 
            {t('notfound.homeLinkText')}
          </Link>
        )}
      </div>
      
      <div className="absolute bottom-4 text-[#6272a4] text-sm">
        nocig.navi // 404
      </div>
    </div>
  );
}