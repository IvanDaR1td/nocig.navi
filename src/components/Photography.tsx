import { useEffect, useRef, useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { photographs } from '../content/photography';
import { mediaUrl } from '../utils/media';
import SafeImage from './SafeImage';

function PhotoViewer({ index, setIndex, close, trigger }: { index: number; setIndex: (index: number) => void; close: () => void; trigger: HTMLButtonElement | null }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('zh') ? 'zh' : 'en';
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photographs[index];
  useEffect(() => {
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [trigger]);
  function move(offset: number) { setIndex((index + offset + photographs.length) % photographs.length); }
  const title = photo.title[language];
  const date = photo.date[language];
  const alt = photo.alt[language];
  return <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-viewer-title" onCancel={close}
    onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
    <div className="photo-viewer">
      <button type="button" autoFocus className="viewer-close icon-button" onClick={close} aria-label={t('photography.close')}><X aria-hidden="true" /></button>
      <div className="viewer-image"><SafeImage src={mediaUrl(photo.src)} alt={alt} /></div>
      <div className="viewer-caption" aria-live="polite">
        <div><h3 id="photo-viewer-title">{title}</h3><p>{date}</p></div>
        <span>{t('photography.count', { current: new Intl.NumberFormat(i18n.resolvedLanguage).format(index + 1), total: new Intl.NumberFormat(i18n.resolvedLanguage).format(photographs.length) })}</span>
      </div>
      {photographs.length > 1 && <div className="viewer-navigation">
        <button type="button" onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" />{t('photography.previous')}</button>
        <button type="button" onClick={() => move(1)}>{t('photography.next')}<ChevronRight size={18} aria-hidden="true" /></button>
      </div>}
    </div>
  </dialog>;
}
export default function Photography() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('zh') ? 'zh' : 'en';
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  return <section id="photography" className="photography-section" tabIndex={-1} aria-labelledby="photography-heading">
    <header className="photography-heading">
      <div><p className="eyebrow">{t('photography.eyebrow')}</p><h2 id="photography-heading">{t('photography.title')}</h2></div>
      <p>{t('photography.intro')}</p>
    </header>
    {photographs.length ? <div className="photo-grid">
      {photographs.map((photo, index) => {
        const title = photo.title[language];
  const date = photo.date[language];
  const alt = photo.alt[language];
        return <figure key={photo.id} className={photo.height > photo.width ? 'photo portrait' : 'photo landscape'}>
          <button type="button" className="photo-open" onClick={event => { trigger.current = event.currentTarget; setSelected(index); }} aria-label={t('photography.open', { title })}>
            <span className="gallery-media" style={{ aspectRatio: photo.width + ' / ' + photo.height }}>
              <SafeImage src={mediaUrl(photo.src)} alt={alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
            </span>
            <span className="photo-open-mark" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.6} /></span>
          </button>
          <figcaption>
            <h3>{title}</h3>
            <p>{date}</p>
          </figcaption>
        </figure>;
      })}
    </div> : <div className="photo-empty">
      <Camera size={27} strokeWidth={1.2} aria-hidden="true" />
      <div><h3>{t('photography.empty.title')}</h3><p>{t('photography.empty.body')}</p></div>
      <a className="text-link" href="https://www.instagram.com/ivandar1td/" target="_blank" rel="noopener noreferrer">{t('photography.empty.link')}<ArrowUpRight className="inline-arrow" size={15} strokeWidth={1.6} aria-hidden="true" /></a>
    </div>}
    {selected !== null && photographs[selected] && <PhotoViewer index={selected} setIndex={setSelected} trigger={trigger.current} close={() => setSelected(null)} />}
  </section>;
}
