import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CornerDownLeft } from 'lucide-react';


export default function Entry() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase();
  const isChinese = language.startsWith('zh');
  const englishT = i18n.getFixedT('en');
  const englishLogLines = englishT('entry.logLines', { returnObjects: true }) as string[];
  const localizedLogLines = t('entry.logLines', { returnObjects: true }) as string[];
  const languageModuleLines = [
    'LOADING CHINESE LANGUAGE MODULE...',
    'CHINESE LANGUAGE MODULE LOADED SUCCESSFULLY.',
  ];
  const text = isChinese
    ? [...englishLogLines, '', ...languageModuleLines, '', ...localizedLogLines].join('\n')
    : englishLogLines.join('\n');
  const typed = useTypewriter({ text, speed: 18, newlinePause: 105, punctuationPause: 72 });
  const reduced = useReducedMotion();
  const ready = reduced || typed === text;
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!ready || reduced) return;
    const exitTimer = window.setTimeout(() => setExiting(true), 900);
    const navigationTimer = window.setTimeout(() => navigate('/home', { replace: true }), 1460);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(navigationTimer);
    };
  }, [ready, navigate, reduced]);

  function enter(event?: MouseEvent<HTMLAnchorElement>) {
    event?.preventDefault();
    if (exiting) return;
    if (reduced) {
      navigate('/home', { replace: true });
      return;
    }
    setExiting(true);
    window.setTimeout(() => navigate('/home', { replace: true }), 560);
  }

  return <main className={`entry-page${exiting ? ' is-exiting' : ''}`} id="main-content" tabIndex={-1}>
    <div className="boot-screen">
      <div className="boot-output">
        <h1 className="sr-only">Ivan Chan</h1>
        <pre aria-hidden="true">{typed}<span className="boot-caret" aria-hidden="true" /></pre>
        <p className="sr-only">{t('entry.accessibleWelcome')}</p>
        <Link
          to="/home"
          className={`boot-enter${ready ? ' is-ready' : ''}`}
          aria-hidden={!ready}
          tabIndex={ready ? 0 : -1}
          onClick={enter}
        >
          <span aria-hidden="true">&gt; </span>{t('entry.enter')} <CornerDownLeft className="inline-arrow return-arrow" size={15} strokeWidth={1.65} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </main>;
}
