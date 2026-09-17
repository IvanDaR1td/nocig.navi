import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRandomLine } from '../hooks/useRandomLine';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';

const replaceLegacyIdentity = (value: string) => value.replaceAll('nocig.navi', 'ivandar1td.com');

export default function Entry() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const message = useRandomLine('entry.messages');
  const logLines = (t('entry.logLines', { returnObjects: true }) as string[]).map(replaceLegacyIdentity);
  const text = logLines.join('\n') + '\n\n' + replaceLegacyIdentity(message);
  const typed = useTypewriter({ text, speed: 16 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typed !== text) return;
    const timer = window.setTimeout(() => navigate('/home', { replace: true }), 1300);
    return () => window.clearTimeout(timer);
  }, [typed, text, navigate, reduced]);

  return <main className="entry-page page-width" id="main-content" tabIndex={-1}>
    <header className="standalone-header">
      <Link className="standalone-wordmark" to="/home" aria-label={`Ivan Chan — ${t('nav.home')}`}>
        <span className="ivan-wordmark" aria-hidden="true"><span>IVAN</span><span>CHAN</span></span>
      </Link>
      <div className="site-controls"><LanguageSwitcher /><ThemeToggle /></div>
    </header>
    <div className="boot-screen">
      <h1 className="sr-only">Ivan Chan</h1>
      <pre aria-hidden="true">{typed}<span className="boot-caret">▍</span></pre>
      <p className="sr-only">{replaceLegacyIdentity(t('entry.accessibleWelcome'))}</p>
      <Link to="/home" className="text-link">{t('entry.enter')} <span aria-hidden="true">→</span></Link>
    </div>
  </main>;
}
