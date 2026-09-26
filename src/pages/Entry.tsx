import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/entry.css';

export default function Entry() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const typed = useTypewriter({ text: t('entry.doorNote'), speed: 34 });
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const exitTimer = useRef<number>();
  const leaving = useRef(false);

  const enter = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    if (reduced) { navigate('/home', { replace: true }); return; }
    setExiting(true);
    exitTimer.current = window.setTimeout(() => navigate('/home', { replace: true }), 420);
  }, [navigate, reduced]);

  useEffect(() => () => window.clearTimeout(exitTimer.current), []);
  useEffect(() => {
    if (reduced || paused || exiting) return;
    const timer = window.setTimeout(enter, 3000);
    return () => window.clearTimeout(timer);
  }, [enter, reduced, paused, exiting]);

  return <main className={`entry-page${exiting ? ' is-exiting' : ''}`} id="main-content" tabIndex={-1}>
    <header className="entry-header page-width">
      <Link className="standalone-wordmark" to="/home" aria-label={`Ivan Chan — ${t('nav.home')}`} onClick={event => { event.preventDefault(); enter(); }} onFocus={() => setPaused(true)}>
        <span className="ivan-wordmark" aria-hidden="true"><span>IVAN</span><span>CHAN</span></span>
      </Link>
      <span className="entry-location" data-language-copy>{t('home.location')}</span>
    </header>
    <div className="entry-arrival">
      <div className="entry-door-scene" aria-hidden="true">
        <div className="entry-door-frame"><div className="entry-door-panel"><span className="entry-door-handle" /></div></div>
        <span className="entry-door-floor" />
      </div>
      <div className="entry-note">
        <p className="entry-eyebrow" data-language-copy>{t('entry.eyebrow')}</p>
        <h1 data-language-copy>{t('entry.headline')}</h1>
        <p className="entry-description reading-copy" data-language-copy>{t('entry.note')}</p>
        <Link to="/home" className="entry-enter" onClick={event => { event.preventDefault(); enter(); }} onFocus={() => setPaused(true)} onPointerEnter={() => setPaused(true)}>
          <span data-language-copy>{t('entry.enter')}</span><ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </div>
    </div>
    <p className="entry-footnote" aria-hidden="true"><span className="entry-prompt">&gt;_</span><span>{typed}<span className="typing-caret" /></span></p>
    <p className="sr-only">{t('entry.accessibleWelcome')}</p>
  </main>;
}
