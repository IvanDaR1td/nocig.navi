import type { CSSProperties } from 'react';
import { ArrowUpRight, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';
import '../styles/project-studies.css';

// Small material studies, rather than invented product screenshots.
function MedicineBottle() {
  const { t } = useTranslation();
  return <div className="medicine-stage"><div className="medicine-tilt"><div className="medicine-bottle">
    {Array.from({ length: 32 }, (_, index) => {
      const shade = Math.round(28 + 18 * Math.cos(index / 32 * Math.PI * 2));
      const style = { '--facet-angle': `${index * 11.25}deg`, '--glass': `hsl(31 42% ${shade}%)` } as CSSProperties;
      return <div className="medicine-facet" key={index} style={style}>
        <i className="medicine-glass" />
        <i className="medicine-cap-rib" />
        {(index < 5 || index > 27) && <i className="medicine-paper" />}
      </div>;
    })}
    <div className="medicine-cap-top" />
    <div className="medicine-bottom" />
    <div className="medicine-label" data-language-copy><strong>{t('projects.medicine.company')}</strong><span>{t('projects.medicine.category')}</span><span>{t('projects.medicine.name')}</span><i /><b /></div>
  </div></div></div>;
}

export default function ProjectCover({ id }: { id: string }) {
  const { t } = useTranslation();
  return <div className={`project-cover project-cover--${id}`} aria-hidden="true" data-language-layout>
    {id !== 'no-one-was-here' && <>
      <span className="cover-registration cover-registration--tl">+</span>
      <span className="cover-registration cover-registration--br">+</span>
      <span className="cover-label" data-language-copy>{t(`projects.covers.${id}.label`)}</span>
    </>}
    {id === 'fosho' && <>
      <div className="fosho-brand-composition">
        <div className="fosho-brand-lockup"><BrandLogo brand="fosho" /><span>{t('projects.fosho.name')}</span></div>
        <p data-language-copy>{t('projects.covers.fosho.note')}</p>
      </div>
      <div className="fosho-studio-signature"><span>{t('projects.fosho.by')}</span><BrandLogo brand="metra" /></div>
    </>}
    {id === 'steam' && <>
      <div className="price-tickets">
        {['$', '€', '¥'].map((symbol, index) => <div className={`price-ticket price-ticket--${index}`} key={symbol}>
          <span className="ticket-region">{t(`projects.covers.steam.regions.${index}`)}</span>
          <span className="ticket-currency">{symbol}</span>
          <span className="ticket-rule" />
          <span className="ticket-stamp" data-language-copy>{t('projects.covers.steam.stamp')}<ArrowUpRight size={13} strokeWidth={1.4} /></span>
        </div>)}
      </div>
      <span className="cover-bottom-note" data-language-copy>{t('projects.covers.steam.note')}</span>
    </>}
    {id === 'tonetrace' && <>
      <svg className="guitar-study" viewBox="0 0 500 300" fill="none">
        <g className="guitar-instrument" transform="translate(240 154) rotate(38)">
          <path className="guitar-body" d="M-8-19C-16-3-27-6-30-29C-50-18-48 7-35 22C-29 30-48 39-49 57C-53 89-25 104 0 104S53 89 49 57C48 39 29 30 35 22C48 7 50-18 30-29C27-6 16-3 8-19Z" />
          <path className="guitar-pickguard" d="M-10 0C-24 10-31 3-30-12C-35 4-20 14-19 26S-31 47-25 62L14 61L16 3Z" />
          <path className="guitar-neck" d="M-6-87H6L8 56H-8Z" />
          <path className="guitar-head" d="M-6-87L-7-103Q-10-119-3-125L7-125Q13-121 9-110L6-87Z" />
          {[-119,-109,-99].map(y => <g key={y}><path d={`M-8 ${y}h-6M8 ${y}h6`} /><circle cx="-15" cy={y} r="2" /><circle cx="15" cy={y} r="2" /></g>)}
          {[-73,-60,-48,-37,-27,-18,-10,-3,5,12,18,24,30,35].map(y => <path className="guitar-fret" key={y} d={`M-6 ${y}h12`} />)}
          <rect className="guitar-pickup" x="-13" y="41" width="26" height="7" rx="2" />
          <rect className="guitar-pickup" x="-13" y="61" width="26" height="7" rx="2" />
          <path d="M-12 78H12M-12 81H12" />
          {[-4,-2.4,-.8,.8,2.4,4].map(x => <path className="guitar-string" key={x} d={`M${x} -115V80`} />)}
          <circle cx="28" cy="65" r="3" /><circle cx="24" cy="79" r="3" />
          <path className="guitar-cable" d="M14 99Q22 145 80 117T160 125" />
        </g>
        <g className="guitar-listening">
          <path d="M350 99Q390 123 350 149M362 84Q418 123 362 163M374 69Q446 123 374 179" />
        </g>
        <path className="guitar-scan" d="M108 140H335" />
      </svg>
      <span className="cover-bottom-note" data-language-copy>{t('projects.covers.tonetrace.note')}</span>
    </>}
    {id === 'rehandshaker' && <>
      <div className="handshaker-study">
        <div className="handshaker-sheet handshaker-sheet--back"><i /><i /><i /></div>
        <div className="handshaker-sheet handshaker-sheet--front"><i /><i /><i /></div>
        <div className="handshaker-folder">
          <Handshake className="handshaker-emblem" strokeWidth={.9} />
          <span className="handshaker-seal"><svg viewBox="0 0 24 24" fill="none"><path d="m8 5 10 5-2 4-4-2-5 9-3-2 5-9-3-2z" fill="currentColor" /></svg></span>
        </div>
      </div>
      <span className="cover-bottom-note" data-language-copy>{t('projects.covers.rehandshaker.note')}</span>
    </>}
    {id === 'no-one-was-here' && <MedicineBottle />}
  </div>;
}
