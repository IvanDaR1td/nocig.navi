import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, ArrowUpRight, Expand } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { photographs } from '../content/photography';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { photographyMedia } from '../utils/photographyMedia';
import SafeImage from './SafeImage';
import '../styles/photography-showcase.css';

function PhotoViewer({ index, setIndex, close, trigger }: { index: number; setIndex: (index: number) => void; close: () => void; trigger: HTMLButtonElement | null }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('zh') ? 'zh' : 'en';
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photographs[index];

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    if (!modal.open) modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      // A StrictMode effect replay keeps the dialog mounted. Only restore focus
      // after an actual unmount, when the browser's modal focus trap is gone.
      queueMicrotask(() => {
        if (!modal.isConnected && trigger?.isConnected) trigger.focus({ preventScroll: true });
      });
    };
  }, [trigger]);

  function move(offset: number) { setIndex((index + offset + photographs.length) % photographs.length); }

  return <dialog ref={dialog} className="pe-dialog" aria-labelledby="pe-viewer-title"
    onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
    <div className="pe-viewer">
      <button type="button" autoFocus className="pe-viewer-close" onClick={close} aria-label={t('photography.close')}><X size={21} strokeWidth={1.5} aria-hidden="true" /></button>
      <div className="pe-viewer-image">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={photo.id} className="pe-viewer-image-inner"
            initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: reduced ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.16 }}>
            <SafeImage src={photographyMedia(photo).full} alt={photo.alt[language]} width={photo.width} height={photo.height} decoding="async" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pe-viewer-caption" aria-live="polite" aria-atomic="true">
        <div><h3 id="pe-viewer-title">{photo.title[language]}</h3><p>{photo.date[language]}</p></div>
        <span>{t('photography.count', { current: index + 1, total: photographs.length })}</span>
      </div>
      {photographs.length > 1 && <div className="pe-viewer-navigation">
        <button type="button" onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" />{t('photography.previous')}</button>
        <button type="button" onClick={() => move(1)}>{t('photography.next')}<ChevronRight size={18} aria-hidden="true" /></button>
      </div>}
    </div>
  </dialog>;
}

export default function Photography() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('zh') ? 'zh' : 'en';
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const photo = photographs[active];

  function move(offset: number) { setActive(current => (current + offset + photographs.length) % photographs.length); }
  function openViewer(button: HTMLButtonElement) { trigger.current = button; setSelected(active); }
  function changeViewer(index: number) { setSelected(index); setActive(index); }

  return <motion.section id="photography" className="photography-exhibition" tabIndex={-1} aria-labelledby="photography-heading"
    initial={reduced ? false : { opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: .03 }}
    transition={{ duration: reduced ? 0 : .24, ease: 'easeOut' }}>
      <header className="pe-heading" data-language-copy>
        <div><p className="eyebrow">{t('photography.eyebrow')}</p><h2 id="photography-heading">{t('photography.title')}</h2></div>
        <p>{t('photography.intro')}</p>
      </header>
    {photo ?
      <div className="pe-exhibition" role="group" aria-label={t('photography.exhibition.collection')}>
        <figure className="pe-feature">
          <div className="pe-stage" data-language-layout>
            <button type="button" className="pe-stage-open" onClick={event => openViewer(event.currentTarget)} aria-label={t('photography.open', { title: photo.title[language] })} onKeyDown={event => {
              if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
              if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
            }}>
              <AnimatePresence initial={false} mode="wait">
                <motion.span key={photo.id} className="pe-stage-image"
                  initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -5 }}
                  transition={{ duration: reduced ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}>
                  <SafeImage src={photographyMedia(photo).preview} srcSet={photographyMedia(photo).srcSet} sizes="(max-width: 700px) calc(100vw - 88px), 440px" alt={photo.alt[language]} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                </motion.span>
              </AnimatePresence>
              <span className="pe-expand" aria-hidden="true"><Expand size={16} strokeWidth={1.5} /></span>
            </button>
          </div>
          <figcaption className="pe-caption">
            <div className="pe-caption-copy" data-language-copy aria-live="polite" aria-atomic="true">
              <h3>{photo.title[language]}</h3>
              <p className="pe-date">{photo.date[language]}</p>
            </div>
            <div className="pe-actions">
              <button className="pe-closer" data-language-copy type="button" onClick={event => openViewer(event.currentTarget)} aria-label={t('photography.open', { title: photo.title[language] })}>{t('photography.exhibition.enlarge')}<ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" /></button>
              {photographs.length > 1 && <div className="pe-navigation">
                <button type="button" onClick={() => move(-1)} aria-label={t('photography.previous')}><ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button>
                <button type="button" onClick={() => move(1)} aria-label={t('photography.next')}><ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" /></button>
              </div>}
            </div>
            <div className="pe-contact-sheet">
              {photographs.map((item, index) => <button key={item.id} type="button" className="pe-thumbnail"
                aria-label={t('photography.exhibition.select', { title: item.title[language] })} aria-pressed={index === active} onClick={() => setActive(index)}>
                <span className="pe-thumbnail-image" data-language-layout><SafeImage src={photographyMedia(item).thumbnail} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" /></span>
              </button>)}
            </div>
          </figcaption>
        </figure>
      </div>
    : <div className="pe-empty">
      <Camera size={27} strokeWidth={1.2} aria-hidden="true" />
      <div><h3>{t('photography.empty.title')}</h3><p>{t('photography.empty.body')}</p></div>
      <a className="text-link" href="https://www.instagram.com/ivandar1td/" target="_blank" rel="noopener noreferrer">{t('photography.empty.link')}<ArrowUpRight className="inline-arrow" size={15} strokeWidth={1.6} aria-hidden="true" /></a>
    </div>}
    {selected !== null && photographs[selected] && <PhotoViewer index={selected} setIndex={changeViewer} trigger={trigger.current} close={() => setSelected(null)} />}
  </motion.section>;
}
