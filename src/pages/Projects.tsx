import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Photography from '../components/Photography';
import { ArrowUpRight } from 'lucide-react';
interface Project { id: string; name: string; kind: string; status: string; summary: string; link?: string }
export default function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Project[];
  return <main className="projects-page page-width" id="main-content" tabIndex={-1}>
    <header className="projects-heading">
      <div><h1>{t('projects.title')}</h1><p className="page-intro">{t('projects.intro')}</p></div>
      <nav className="section-links" aria-label={t('projects.sectionsLabel')}>
        <Link to="/projects#work">{t('projects.work')}</Link><span aria-hidden="true"> / </span><Link to="/projects#photography">{t('photography.title')}</Link>
      </nav>
    </header>
    <section className="project-list" id="work" tabIndex={-1} aria-label={t('projects.work')}>
      {projects.map(project => <article className="project-row" key={project.id} id={'project-' + project.id}>
        <div className="project-name">
          <h2>{project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}<ArrowUpRight className="inline-arrow" size={16} strokeWidth={1.6} aria-hidden="true" /></a> : project.name}</h2>
          <p>{project.kind}</p>
        </div>
        <p className="project-summary">{project.summary}</p>
        <span className="project-status">{project.status}</span>
      </article>)}
    </section>
    <Photography />
  </main>;
}
