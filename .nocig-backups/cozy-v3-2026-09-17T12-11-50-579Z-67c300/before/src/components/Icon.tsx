import * as Icons from 'lucide-react';

type LucideIconName = keyof typeof Icons;

interface IconProps {
  name: LucideIconName;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className || 'w-5 h-5'} />;
};
