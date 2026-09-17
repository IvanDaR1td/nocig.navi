import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
// Legacy import compatibility. An idea must not regain a fake progress bar.
export default function ProjectWindow() {
  const { t } = useTranslation();
  return <Link className="text-link" to="/projects#project-no-one-was-here">{t('projects.ideaLink')}<ArrowUpRight className="inline-arrow" size={15} strokeWidth={1.6} aria-hidden="true" /></Link>;
}
