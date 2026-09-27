import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { animate as choreograph, createScope, stagger } from 'animejs';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SafeImage from './SafeImage';
import { clampRecord, projectRecord } from '../utils/recordPhysics';
import '../styles/album-archive.css';

export interface RecordItem { label: string; meta?: string; note?: string; image?: string; link?: string }
const accents = ['#768e66','#b56e5e','#a87d91','#879190','#bea979','#a17552','#759976','#b49a71','#8b739f','#94a48c','#717a84','#b46860','#6395ab','#9c7762','#938ba7','#879881','#b88995','#7f8b7e','#ad7660','#b2976e','#7b8a9b','#869b9c','#aa846d','#9caaad','#849887'];

function RecordSleeve({ item, index, position, width, mobile, near, choose }: { item: RecordItem; index: number; position: MotionValue<number>; width: number; mobile: boolean; near: boolean; choose: (index: number, detail: number) => void }) {
  const distance = useTransform(position, value => index - value);
  const x = useTransform(distance, d => Math.sign(d) * width * (mobile ? Math.abs(d) * .89 : Math.min(Math.abs(d), 1) * .86 + Math.max(0, Math.abs(d) - 1) * .38));
  const scale = useTransform(distance, d => 1 - Math.min(Math.abs(d), 1) * (mobile ? .2 : .23) - Math.min(Math.max(Math.abs(d) - 1, 0), 3) * .065);
  const rotateY = useTransform(distance, d => -Math.sign(d) * Math.min(Math.abs(d), 1) * (mobile ? 15 : 52));
  const z = useTransform(distance, d => -Math.abs(d) * (mobile ? 20 : 70));
  const opacity = useTransform(distance, d => mobile ? Math.max(0, 1 - Math.abs(d) * .57) : Math.max(0, 1 - Math.abs(d) * .25));
  const zIndex = useTransform(distance, d => 30 - Math.round(Math.abs(d) * 5));
  return <motion.button type="button" className="record-sleeve" tabIndex={-1} aria-label={item.label} aria-hidden={!near} disabled={!near}
    style={{ width, height: width, marginLeft: -width / 2, x, z, rotateY, scale, opacity, zIndex, pointerEvents: near ? 'auto' : 'none' }}
    onClick={event => choose(index, event.detail)}>
    {near && <>
      <SafeImage src={item.image || ''} alt="" draggable={false} decoding="async" referrerPolicy="no-referrer" />
      {!mobile && <span className="record-reflection"><img src={item.image} alt="" draggable={false} /></span>}
    </>}
  </motion.button>;
}

function RecordText({ item }: { item: RecordItem }) {
  return <><h3>{item.label}</h3><p className="record-meta">{item.meta}</p><div className="record-memory">{item.note?.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></>;
}

export default function AlbumArchive({ items, title, description }: { items: RecordItem[]; title: string; description: string }) {
  const { t, i18n } = useTranslation();
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [nearest, setNearest] = useState(0);
  const [size, setSize] = useState({ width: 280, mobile: false });
  const position = useMotionValue(0);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const dragStart = useRef(0);
  const dragging = useRef(false);
  const ignoreDragClick = useRef(false);
  const wheelTimer = useRef<ReturnType<typeof setTimeout>>();
  const step = size.width * .9;
  const encore = t('inspirations.encore', { returnObjects: true }) as RecordItem[];

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const mobile = w < 600;
      setSize({ mobile, width: mobile ? Math.min(250, w * .64) : Math.min(320, w * .32) });
    });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(position, 'change', value => setNearest(clampRecord(value, items.length)));
  const settle = useCallback((target: number, velocity = 0) => {
    const next = clampRecord(target, items.length);
    clearTimeout(wheelTimer.current);
    animation.current?.stop();
    setActive(next);
    if (reduced) position.set(next);
    else animation.current = animate(position, next, { type: 'spring', stiffness: 150, damping: 25, mass: .9, velocity, restDelta: .001, restSpeed: .01 });
  }, [items.length, position, reduced]);
  useEffect(() => () => { animation.current?.stop(); clearTimeout(wheelTimer.current); }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || event.ctrlKey) return;
      event.preventDefault();
      animation.current?.stop();
      const delta = event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? step : 1);
      position.set(Math.max(-.2, Math.min(items.length - .8, position.get() + delta / step)));
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => settle(position.get()), 140);
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, [items.length, position, settle, step]);

  useEffect(() => {
    if (reduced) return;
    const scope = createScope({ root }).add(() => {});
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      scope.add(() => {
        const targets = entry.target.querySelectorAll('[data-record-reveal], .record-title-word');
        choreograph(targets, { opacity: [0, 1], translateY: [10, 0], delay: stagger(65), duration: 650, ease: 'out(3)' });
      });
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    root.current?.querySelectorAll('[data-record-chapter]').forEach(node => observer.observe(node));
    return () => { observer.disconnect(); scope.revert(); };
  }, [reduced, i18n.resolvedLanguage]);

  useEffect(() => {
    if (reduced || !counter.current) return;
    const effect = choreograph(counter.current, { opacity: [.3, 1], translateY: [3, 0], duration: 300, ease: 'out(3)' });
    return () => { effect.revert(); };
  }, [active, reduced]);

  const item = items[active];
  const choose = (index: number, detail: number) => {
    if (detail && ignoreDragClick.current) return;
    settle(index);
  };
  return <section className="inspiration-section albums record-archive" id="albums" tabIndex={-1} ref={root}
    style={{ '--record-accent': accents[active], '--sleeve-size': `${size.width}px` } as CSSProperties}>
    <header className="record-heading" data-language-copy data-record-chapter>
      <span className="inspiration-section-number" aria-hidden="true" data-record-reveal>04</span>
      <h2>{title.split(' ').map((word, index) => <span className="record-title-word" key={index}>{word}{' '}</span>)}</h2>
      <p data-record-reveal>{description}</p>
    </header>
    <p id="record-instructions" className="sr-only">{t('inspirations.archive.instructions')}</p>
    <motion.div className="record-stage" ref={stage} role="region" tabIndex={0} aria-label={t('inspirations.archive.browse')} aria-describedby="record-instructions"
      drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0} dragMomentum={false}
      onPointerDownCapture={() => { ignoreDragClick.current = false; }}
      onDragStart={() => { dragging.current = true; ignoreDragClick.current = true; clearTimeout(wheelTimer.current); animation.current?.stop(); dragStart.current = position.get(); }}
      onDrag={(_, info) => { position.set(Math.max(-.25, Math.min(items.length - .75, dragStart.current - info.offset.x / step))); }}
      onDragEnd={(_, info) => {
        dragging.current = false;
        const velocity = -info.velocity.x / step;
        settle(projectRecord(position.get(), velocity, items.length), Math.max(-8, Math.min(8, velocity)));
      }}
      onPointerCancel={() => { if (dragging.current) { dragging.current = false; settle(position.get()); } }}
      onKeyDown={event => {
        const target = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : null;
        if (target !== null) { event.preventDefault(); settle(target); }
      }}>
      <div className="record-halo" aria-hidden="true" />
      {items.map((record, index) => <RecordSleeve key={index} item={record} index={index} position={position} width={size.width} mobile={size.mobile} near={Math.abs(index - nearest) <= (size.mobile ? 2 : 4)} choose={choose} />)}
    </motion.div>
    <div className="record-navigation">
      <button type="button" onClick={() => settle(active - 1)} disabled={active === 0} aria-label={t('inspirations.archive.previous')}><ArrowLeft size={19} strokeWidth={1.4} /></button>
      <p className="record-count"><span ref={counter}>{String(active + 1).padStart(2, '0')}</span><span aria-hidden="true"> / </span>{items.length}</p>
      <button type="button" onClick={() => settle(active + 1)} disabled={active === items.length - 1} aria-label={t('inspirations.archive.next')}><ArrowRight size={19} strokeWidth={1.4} /></button>
    </div>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{t('inspirations.archive.position', { current: active + 1, total: items.length, name: item.label })}</p>
    <div className="record-reading-room" data-language-copy>
      <div className="record-copy-stack">
        {/* Invisible copies reserve the longest note's space, so the page never jumps. */}
        {items.map((record, index) => <div className="record-copy-sizer" aria-hidden="true" key={index}><RecordText item={record} /></div>)}
        <motion.div className="record-copy" key={active} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .3 }}><RecordText item={item} /></motion.div>
      </div>
      <a className="record-listen" href={item.link} target="_blank" rel="noopener noreferrer" aria-label={t('inspirations.spotifyAlbum', { name: item.label })}>{t('inspirations.archive.listen')}<ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" /></a>
    </div>
    <div className="record-scrubber">
      <input type="range" min={0} max={items.length - 1} value={active} onChange={event => settle(Number(event.target.value))} aria-label={t('inspirations.archive.browse')} aria-valuetext={t('inspirations.archive.position', { current: active + 1, total: items.length, name: item.label })} />
      <p data-language-copy>{t('inspirations.archive.hint')}</p>
    </div>
    <section className="record-encore" aria-labelledby="encore-title" data-record-chapter>
      <header data-language-copy data-record-reveal><h3 id="encore-title">{t('inspirations.archive.encoreTitle')}</h3><p>{t('inspirations.archive.encoreNote')}</p></header>
      <div className="record-encore-grid">{encore.map((record, index) => <article key={index} data-record-reveal>
        <a className="encore-sleeve" href={record.link} target="_blank" rel="noopener noreferrer" aria-label={`${t('inspirations.archive.listen')} · ${record.label}`}><SafeImage src={record.image || ''} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" /><ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="encore-identity" data-language-copy><h4>{record.label}</h4><p className="record-meta">{record.meta}</p></div><div className="record-memory" data-language-copy>{record.note?.split('\n\n').map((paragraph, p) => <p key={p}>{paragraph}</p>)}</div>
      </article>)}</div>
    </section>
  </section>;
}
