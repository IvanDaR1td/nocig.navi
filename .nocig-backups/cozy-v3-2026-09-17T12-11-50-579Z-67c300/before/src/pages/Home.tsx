import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SelectedProject {
  name: string;
  summary: string;
  status: string;
  tags: string[];
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [welcomeLine, setWelcomeLine] = useState('');
  const clickResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = t('home.selected.items', { returnObjects: true }) as SelectedProject[];

  useEffect(() => {
    const lines = t('home.animations', { returnObjects: true }) as string[];
    const phrase = Array.isArray(lines) && lines.length
      ? lines[Math.floor(Math.random() * lines.length)]
      : '';

    setWelcomeLine('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setWelcomeLine(phrase.slice(0, index));
      if (index >= phrase.length) window.clearInterval(timer);
    }, 34);

    return () => window.clearInterval(timer);
  }, [i18n.language, t]);

  useEffect(() => {
    if (clickCount === 0) return;
    if (clickResetTimeoutRef.current) clearTimeout(clickResetTimeoutRef.current);
    clickResetTimeoutRef.current = setTimeout(() => setClickCount(0), 1500);

    return () => {
      if (clickResetTimeoutRef.current) clearTimeout(clickResetTimeoutRef.current);
    };
  }, [clickCount]);

  const handleTerminalClick = () => {
    setClickCount((count) => count + 1);
    const terminal = document.getElementById('terminal-mark');
    terminal?.classList.add('click-feedback');
    setTimeout(() => terminal?.classList.remove('click-feedback'), 180);
    if (clickCount + 1 >= 3) navigate('/404');
  };

  return (
    <motion.main
      className="mx-auto max-w-5xl px-6 pb-20 pt-12 md:pb-28 md:pt-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <section className="pb-16 md:pb-24">
        <div className="flex items-center justify-between gap-6">
          <p className="tech-type">nocig.navi / 2026</p>
          <button
            id="terminal-mark"
            type="button"
            onClick={handleTerminalClick}
            className="terminal-mark text-sm"
            title="R U That Bored? There's nothing here."
            aria-label="terminal easter egg"
          >
            &gt;_
          </button>
        </div>

        <p className="mt-12 min-h-8 text-xl leading-8 text-[var(--color-secondary)] md:text-2xl">
          {welcomeLine}
          <span className="cursor-blink" aria-hidden="true" />
        </p>

        <h1 className="mt-5 text-6xl font-normal leading-[0.95] tracking-[-0.035em] text-[var(--color-title)] md:text-8xl">
          {t('home.heroName')}
        </h1>

        <p className="mt-8 max-w-3xl text-2xl leading-[1.45] text-[var(--color-text)] md:text-3xl">
          {t('home.heroLine')}
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-secondary)]">
          {t('home.heroBody')}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to="/projects"
            className="border-b border-[var(--color-primary)] pb-1 text-lg text-[var(--color-title)] no-underline hover:text-[var(--color-primary)] hover:no-underline"
          >
            {t('home.cta')} ↗
          </Link>
          <Link
            to="/about"
            className="border-b border-transparent pb-1 text-lg text-[var(--color-secondary)] no-underline hover:border-[var(--color-border)] hover:text-[var(--color-text)] hover:no-underline"
          >
            {t('home.profileCta')} ↗
          </Link>
        </div>
      </section>

      <section className="room-card grid gap-8 p-6 md:grid-cols-[0.72fr_1.28fr] md:p-8">
        <div>
          <p className="tech-type">{t('home.current.label')}</p>
          <p className="mt-4 text-3xl text-[var(--color-title)]">Metra</p>
          <p className="mt-1 text-xl text-[var(--color-primary)]">FoSho</p>
        </div>
        <div className="md:border-l md:border-[var(--color-border)] md:pl-8">
          <p className="text-xl leading-8 text-[var(--color-text)]">{t('home.current.body')}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 tech-type">
            <span>Company · Metra</span>
            <span>Product · FoSho</span>
            <span>2026</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="tech-type">{t('home.selected.eyebrow')}</p>
            <h2 className="mt-3 text-4xl font-normal text-[var(--color-title)] md:text-5xl">
              {t('home.selected.title')}
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden text-base text-[var(--color-secondary)] no-underline hover:text-[var(--color-primary)] hover:no-underline sm:block"
          >
            {t('home.selected.all')} ↗
          </Link>
        </div>

        <div className="space-y-3">
          {selected.map((project, index) => (
            <Link
              key={project.name}
              to="/projects"
              className="paper-note group grid gap-4 px-5 py-5 text-inherit no-underline hover:-translate-y-0.5 hover:no-underline md:grid-cols-[44px_1fr_auto] md:items-center"
            >
              <span className="tech-type">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl text-[var(--color-title)] transition group-hover:text-[var(--color-primary)]">
                    {project.name}
                  </h3>
                  <span className="tech-type">{project.status}</span>
                </div>
                <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-secondary)]">{project.summary}</p>
              </div>
              <span className="hidden text-xl text-[var(--color-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-primary)] md:block">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 border-t border-[var(--color-border)] pt-10 md:grid-cols-[0.65fr_1.35fr]">
        <p className="tech-type">{t('home.elsewhere.label')}</p>
        <div>
          <p className="text-xl leading-8 text-[var(--color-text)]">{t('home.elsewhere.items')}</p>
          <p className="mt-8 text-2xl leading-9 text-[var(--color-secondary)]">{t('home.closing')}</p>
        </div>
      </section>
    </motion.main>
  );
}
