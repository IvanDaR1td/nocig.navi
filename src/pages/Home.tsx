import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRandomLine } from '../hooks/useRandomLine';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowUpRight } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { warmPage } from './loaders';
import Reveal from '../components/Reveal';

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
    <Reveal className="home-greeting">
      <p data-language-copy><span aria-hidden="true">{typed}<span className="typing-caret" /></span><span className="sr-only">{welcome}</span></p>
      <button type="button" id="terminal-mark" className="terminal-mark" onClick={terminalClick}
        aria-label={t('home.terminal.label')} title={t('home.terminal.hint')}><span aria-hidden="true">&gt;_</span></button>
    </Reveal>

    <section className="home-introduction" aria-labelledby="home-name">
      <Reveal className="home-name-block" delay={0.06}>
        <h1 data-language-layout id="home-name" aria-label={t('common.name')}>
          <span>Ivan</span>
          <span>Chan<span className="home-name-dot" aria-hidden="true">.</span></span>
        </h1>
        <p className="home-location" data-language-copy>{t('home.location')}</p>
      </Reveal>
      <Reveal className="home-thought" data-language-copy delay={0.13}>
        <p className="home-line">{t('home.line')}</p>
        <p className="home-focus">{t('home.focus')}</p>
      </Reveal>
    </section>

    <Reveal className="home-featured" delay={.1}>
      <Link to="/projects/fosho" className="home-notebook-link" onMouseEnter={() => warmPage('/projects/fosho')} onFocus={() => warmPage('/projects/fosho')}>
        <span className="home-note-mark" aria-hidden="true"><BrandLogo brand="fosho" /></span>
        <span className="home-note-copy" data-language-copy>
          <span className="home-note-eyebrow">{t('home.featured.eyebrow')}</span>
          <span className="home-note-title">{t('home.featured.title')}</span>
          <span className="home-feature-note reading-copy">{t('home.featured.note')}</span>
          <span className="home-note-open">{t('home.featured.link')}<ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" /></span>
        </span>
      </Link>
    </Reveal>
    <nav className="home-doorways" aria-label={t('home.explore')}>
      <Reveal delay={0.08}><Link to="/projects" onMouseEnter={() => warmPage('/projects')} onFocus={() => warmPage('/projects')}><span data-language-copy>{t('nav.projects')}</span><span className="doorway-note" data-language-copy>{t('home.projectsNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link></Reveal>
      <Reveal delay={0.14}><Link to="/projects#photography" onMouseEnter={() => warmPage('/projects#photography')} onFocus={() => warmPage('/projects#photography')}><span data-language-copy>{t('photography.title')}</span><span className="doorway-note" data-language-copy>{t('home.photosNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link></Reveal>
      <Reveal delay={0.2}><Link to="/inspirations" onMouseEnter={() => warmPage('/inspirations')} onFocus={() => warmPage('/inspirations')}><span data-language-copy>{t('nav.inspirations')}</span><span className="doorway-note" data-language-copy>{t('home.inspirationsNote')}</span><span className="doorway-arrow" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.55} /></span></Link></Reveal>
    </nav>
    <Reveal delay={0.2}><p className="home-postscript" data-language-copy>{t('home.postscript')}</p></Reveal>
  </main>;
}
