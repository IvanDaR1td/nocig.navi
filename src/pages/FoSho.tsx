import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, MessageCircle, Mic, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import BrandLogo from '../components/BrandLogo';
import Reveal from '../components/Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/project-notebook.css';

interface Note { title: string; body: string }
interface Step extends Note { label: string; detail: string }
const stepIcons = [Mic, SlidersHorizontal, MessageCircle];

export default function FoSho() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();
  const steps = t('foshoStory.steps', { returnObjects: true }) as Step[];
  const decisions = t('foshoStory.decisions', { returnObjects: true }) as Note[];
  const active = steps[step];
  const StepIcon = stepIcons[step];

  return <main className="notebook-page page-width" id="main-content" tabIndex={-1}>
    <Link className="notebook-back" to="/projects#project-fosho"><ArrowLeft size={15} aria-hidden="true" /><span data-language-copy>{t('foshoStory.back')}</span></Link>
    <header className="notebook-header">
      <Reveal>
        <p className="notebook-eyebrow" data-language-copy>{t('foshoStory.eyebrow')}</p>
        <h1>{t('projects.fosho.name')}<span aria-hidden="true">.</span></h1>
        <p className="notebook-deck" data-language-copy>{t('foshoStory.headline')}</p>
      </Reveal>
      <Reveal className="notebook-brand-note" delay={.1}>
        <BrandLogo brand="fosho" />
        <p data-language-copy>{t('foshoStory.coverNote')}</p>
        <BrandLogo brand="metra" />
      </Reveal>
    </header>
    <div className="notebook-colophon" data-language-copy>
      <p>{t('foshoStory.context')}</p><span>{t('foshoStory.status')}</span>
    </div>

    <Reveal className="notebook-section notebook-opening">
      <h2 data-language-copy>{t('foshoStory.whyTitle')}</h2>
      <div className="reading-copy" data-language-copy><p>{t('foshoStory.why')}</p><p>{t('foshoStory.audience')}</p></div>
    </Reveal>

    <Reveal className="notebook-section notebook-journey">
      <div className="notebook-section-intro" data-language-copy><h2>{t('foshoStory.flowTitle')}</h2><p className="reading-copy">{t('foshoStory.flowIntro')}</p></div>
      <div className="notebook-step-controls" role="group" aria-label={t('foshoStory.stepsLabel')}>
        {steps.map((item, index) => <button type="button" key={index} aria-pressed={step === index} aria-controls="fosho-flow-note" onClick={() => setStep(index)}>
          <span className="notebook-step-number" aria-hidden="true">0{index + 1}</span><span data-language-copy>{item.label}</span>
        </button>)}
      </div>
      <div className="notebook-flow" id="fosho-flow-note">
        <div className="notebook-flow-art" aria-hidden="true">
          <span className="notebook-paper-back" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className="notebook-paper" key={step} initial={reduced ? false : {opacity:0,y:6,rotate:-2}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,y:reduced?0:-4}} transition={{duration:reduced?0:.2}}>
              <span className="notebook-paper-number">0{step + 1}</span>
              <StepIcon size={66} strokeWidth={.8} />
              <span className="notebook-paper-note" data-language-copy>{active.detail}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="notebook-flow-copy" aria-live="polite" aria-atomic="true" data-language-copy>
          <h3>{active.title}</h3><p className="reading-copy">{active.body}</p>
        </div>
      </div>
      <p className="notebook-caption" data-language-copy>{t('foshoStory.flowCaption')}</p>
    </Reveal>

    <Reveal className="notebook-section">
      <h2 data-language-copy>{t('foshoStory.careTitle')}</h2>
      <div className="notebook-decisions">
        {decisions.map((item, index) => <article key={index}>
          <span aria-hidden="true">0{index + 1}</span><div data-language-copy><h3>{item.title}</h3><p className="reading-copy">{item.body}</p></div>
        </article>)}
      </div>
    </Reveal>
    <Reveal className="notebook-section notebook-contribution">
      <h2 data-language-copy>{t('foshoStory.roleTitle')}</h2>
      <div data-language-copy><p className="notebook-role">{t('foshoStory.role')}</p><p className="reading-copy">{t('foshoStory.contribution')}</p></div>
    </Reveal>
    <Reveal>
      <details className="notebook-underneath">
        <summary><span data-language-copy>{t('foshoStory.technicalTitle')}</span><ChevronDown size={16} aria-hidden="true" /></summary>
        <div className="reading-copy" data-language-copy><p>{t('foshoStory.technical')}</p><p>{t('foshoStory.validation')}</p></div>
      </details>
    </Reveal>
    <footer className="notebook-end">
      <p data-language-copy>{t('foshoStory.closing')}</p>
      <a href="https://metra.ie/" target="_blank" rel="noopener noreferrer"><span data-language-copy>{t('projects.fosho.visit')}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
      <Link to="/projects"><ArrowLeft size={15} aria-hidden="true" /><span data-language-copy>{t('foshoStory.back')}</span></Link>
    </footer>
  </main>;
}
