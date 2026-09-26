import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type RevealProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'transition'> & {
  delay?: number;
};

/** A small, one-time entrance that leaves the page's reading rhythm intact. */
export default function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return <motion.div
    {...props}
    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
    animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}
