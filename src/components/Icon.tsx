import { icons } from 'lucide-react';

type LucideIconName = keyof typeof icons;

interface IconProps {
  name: LucideIconName;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className || 'w-5 h-5'} />;
};
