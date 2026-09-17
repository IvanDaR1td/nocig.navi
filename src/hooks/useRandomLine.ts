import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// One choice per visit. Language switches keep the same thought in translation.
export function useRandomLine(key: string) {
  const { t } = useTranslation();
  const [seed] = useState(() => Math.random());
  const lines = t(key, { returnObjects: true }) as string[];
  return Array.isArray(lines) && lines.length ? lines[Math.floor(seed * lines.length)] : '';
}
