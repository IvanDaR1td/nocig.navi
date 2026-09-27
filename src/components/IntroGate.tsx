import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, createScope, stagger } from 'animejs';
import { useTranslation } from 'react-i18next';
import '../styles/intro-gate.css';

export default function IntroGate({ opening, enter, skip }: { opening: boolean; enter: () => void; skip: () => void }) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const skipButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    enterButton.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const scope = createScope({ root }).add(() => {
      animate('.gate-character', { opacity: [0, 1], translateY: [7, 0], delay: stagger(35, { start: 100 }), duration: 700, ease: 'out(3)' });
      animate('.gate-seam', { scaleY: [0, 1], duration: 1000, ease: 'inOut(3)' });
    });
    return () => { scope.revert(); document.body.style.overflow = previous; };
  }, []);
  const transition = { duration: 1.16, delay: .12, ease: [.65, 0, .25, 1] as const };
  return <div className={`intro-gate${opening ? ' is-opening' : ''}`} ref={root} role="dialog" aria-modal="true" aria-label={t('gate.label')}
    onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); skip(); }
      if (event.key === 'Tab') {
        event.preventDefault();
        (document.activeElement === enterButton.current ? skipButton.current : enterButton.current)?.focus();
      }
    }}>
    <motion.div className="gate-panel gate-panel--left" initial={false} animate={{ x: opening ? '-102%' : '0%', rotateY: opening ? -12 : 0 }} transition={transition} />
    <motion.div className="gate-panel gate-panel--right" initial={false} animate={{ x: opening ? '102%' : '0%', rotateY: opening ? 12 : 0 }} transition={transition} />
    <motion.div className="gate-seam-wrap" initial={false} animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: .2 }} aria-hidden="true"><div className="gate-seam" /></motion.div>
    <motion.div className="gate-invitation" initial={false} animate={{ scale: opening ? .95 : 1, opacity: opening ? 0 : 1 }} transition={{ duration: .18 }}>
      <h1 aria-label={t('gate.identity')}><span aria-hidden="true">{t('gate.identity').split('').map((character, index) => <span className="gate-character" key={index}>{character}</span>)}</span></h1>
      <button ref={enterButton} type="button" className="gate-enter" onClick={enter} aria-disabled={opening}>{t('gate.enter')}</button>
    </motion.div>
    <button type="button" className="gate-skip" ref={skipButton} onClick={skip}>{t('gate.skip')}</button>
  </div>;
}
