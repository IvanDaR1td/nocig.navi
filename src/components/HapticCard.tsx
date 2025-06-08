// components/HapticCard.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  content: string;
  onClick: () => void;
  layoutId: string;
};

export default function HapticCard({ icon, title, content, onClick, layoutId }: Props) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-secondary mb-2">{title}</h2>
      <p className="text-text">{content}</p>
    </motion.div>
  );
}
