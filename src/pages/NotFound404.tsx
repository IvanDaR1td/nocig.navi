import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import { ArrowUpRight } from 'lucide-react';

type Output = { kind: 'resource'; key: string } | { kind: 'literal'; text: string } | { kind: 'date' | 'time'; at: number };
export default function NotFound404() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [lines, setLines] = useState<Output[]>([{ kind: 'resource', key: 'notfound.lines' }]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [lines]);
  function resource(key: string) { setLines(old => [...old, { kind: 'resource', key }]); }
  async function beep() {
    try {
      const context = new AudioContext();
      await context.resume();
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'square'; oscillator.frequency.value = 880; volume.gain.value = 0.025;
      oscillator.connect(volume); volume.connect(context.destination);
      oscillator.onended = () => { void context.close(); };
      oscillator.start(); oscillator.stop(context.currentTime + 0.1);
      resource('notfound.beep');
    } catch { resource('notfound.audioUnavailable'); }
  }
  function command(raw: string) {
    const value = raw.trim();
    if (!value) return;
    const lower = value.toLowerCase();
    if (lower === 'cls') { setLines([]); return; }
    setLines(old => [...old, { kind: 'literal', text: '> ' + value }]);
    if (lower === 'help' || lower === 'dir') { resource('notfound.' + lower); return; }
    if (lower === 'echo' || lower.startsWith('echo ')) { setLines(old => [...old, { kind: 'literal', text: value.slice(5) }]); return; }
    if (lower === 'goto /404') { resource('notfound.no404'); return; }
    if (lower === 'goto /dream') { resource(Math.random() > 0.5 ? 'notfound.dreamOffline' : 'notfound.dreamLocked'); return; }
    if (/^goto\s+https?:\/\//i.test(value)) {
      try {
        const url = new URL(value.replace(/^goto\s+/i, ''));
        if (url.protocol === 'https:' || url.protocol === 'http:') window.location.assign(url.href);
        else resource('notfound.unknown');
      } catch { resource('notfound.unknown'); }
      return;
    }
    const matched = lower.match(/^goto\s+(\/(?:home|about|projects|inspirations))$/);
    if (matched) { navigate(matched[1]); return; }
    if (lower === 'date' || lower === 'time') { setLines(old => [...old, { kind: lower, at: Date.now() }]); return; }
    if (lower === 'beep') { void beep(); return; }
    resource('notfound.unknown');
  }
  function renderLine(line: Output): string {
    if (line.kind === 'literal') return line.text;
    if (line.kind === 'resource') {
      const result = t(line.key, { returnObjects: true }) as unknown;
      return Array.isArray(result) ? result.join('\n') : String(result);
    }
    const value = new Intl.DateTimeFormat(i18n.resolvedLanguage, line.kind === 'date' ? { dateStyle: 'long' } : { timeStyle: 'medium' }).format(line.at);
    return t('notfound.' + line.kind, { value });
  }
  return <main className="terminal-page page-width" id="main-content" tabIndex={-1}>
    <header className="standalone-header"><Link className="standalone-wordmark" to="/home" aria-label={`Ivan Chan — ${t('nav.home')}`}><span className="ivan-wordmark" aria-hidden="true"><span>IVAN</span><span>CHAN</span></span></Link><div className="site-controls"><LanguageSwitcher /><ThemeToggle /></div></header>
    <section className="terminal-window">
      <div className="terminal-heading"><h1>{t('notfound.title')}</h1><Link to="/home">{t('notfound.homeLinkText')}<ArrowUpRight className="inline-arrow" size={16} strokeWidth={1.6} aria-hidden="true" /></Link></div>
      <p className="terminal-error">{t('notfound.errorCode')}</p>
      <div className="terminal-output" ref={outputRef} role="log" aria-live="polite" aria-label={t('notfound.outputLabel')}>
        {lines.map((line, index) => <pre key={index}>{renderLine(line)}</pre>)}
      </div>
      <form className="terminal-form" onSubmit={event => { event.preventDefault(); command(input); setInput(''); }}>
        <label htmlFor="terminal-input"><span aria-hidden="true">&gt;</span><span className="sr-only">{t('notfound.inputLabel')}</span></label>
        <input ref={inputRef} id="terminal-input" data-route-focus value={input} onChange={event => setInput(event.target.value)}
          autoComplete="off" autoCapitalize="off" spellCheck={false} aria-describedby="terminal-hint" />
        <button type="submit">{t('notfound.run')}</button>
      </form>
      <p className="terminal-hint" id="terminal-hint">{t('notfound.hint')}</p>
    </section>
  </main>;
}
