import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRandomLine } from '../hooks/useRandomLine';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const welcome = useRandomLine('home.animations');
  const typed = useTypewriter({ text: welcome });
  const clicks = useRef<number[]>([]);

  function terminalClick() {
    const now = Date.now();
    clicks.current = [...clicks.current.filter(time => now - time < 1500), now];
    if (clicks.current.length >= 3) { clicks.current = []; navigate('/404'); }
  }

  return <main className="home-page page-width" id="main-content" tabIndex={-1}>
    <div className="home-greeting">
      <p><span aria-hidden="true">{typed}<span className="typing-caret" /></span><span className="sr-only">{welcome}</span></p>
      <button type="button" id="terminal-mark" className="terminal-mark" onClick={terminalClick}
        aria-label={t('home.terminal.label')} title={t('home.terminal.hint')}><span aria-hidden="true">&gt;_</span></button>
    </div>

    <section className="home-introduction" aria-labelledby="home-name">
      <div className="home-name-block">
        <h1 id="home-name" aria-label={t('common.name')}>
          <span>Ivan</span>
          <span>Chan<span className="home-name-dot" aria-hidden="true">.</span></span>
        </h1>
        <p className="home-location">{t('home.location')}</p>
      </div>
      <div className="home-thought">
        <p className="home-line">{t('home.line')}</p>
        <p className="home-focus">{t('home.focus')}</p>
      </div>
    </section>

    <nav className="home-doorways" aria-label={t('home.explore')}>
      <Link to="/projects"><span>{t('nav.projects')}</span><span className="doorway-note">{t('home.projectsNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link>
      <Link to="/projects#photography"><span>{t('photography.title')}</span><span className="doorway-note">{t('home.photosNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link>
      <Link to="/inspirations"><span>{t('nav.inspirations')}</span><span className="doorway-note">{t('home.inspirationsNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link>
    </nav>
    <p className="home-postscript">{t('home.postscript')}</p>
  </main>;
}
