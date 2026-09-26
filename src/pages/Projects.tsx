import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import Photography from '../components/Photography';
import { warmPage } from './loaders';
import ProjectCover from '../components/ProjectCover';
import { useReducedMotion } from '../hooks/useReducedMotion';
import '../styles/projects-showcase.css';

interface Project { id: string; name: string; kind: string; status: string; summary: string; link?: string }

export default function Projects() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const projects = t('projects.items', { returnObjects: true }) as Project[];
  return <main className="projects-page page-width showcase-page" id="main-content" tabIndex={-1}>
    <header className="projects-heading">
      <div data-language-copy>
        <p className="showcase-kicker">{t('projects.collection')}</p>
        <h1>{t('projects.title')}<span className="showcase-title-dot" aria-hidden="true">.</span></h1>
        <p className="page-intro">{t('projects.intro')}</p>
      </div>
      <nav className="showcase-index" data-language-copy aria-label={t('projects.sectionsLabel')}>
        <Link to="/projects#work"><span aria-hidden="true">01</span>{t('projects.work')}<ArrowDown size={13} aria-hidden="true" /></Link>
        <Link to="/projects#photography"><span aria-hidden="true">02</span>{t('photography.title')}<ArrowDown size={13} aria-hidden="true" /></Link>
      </nav>
    </header>
    <section id="work" tabIndex={-1} aria-labelledby="work-heading">
      <div className="showcase-section-label">
        <h2 id="work-heading" data-language-copy>{t('projects.work')}</h2>
        <span aria-hidden="true">01 — {String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="project-showcase">
        {projects.map((project, index) => {
          const content = <>
            <ProjectCover id={project.id} />
            <div className="project-card-body">
              <div className="project-card-meta" data-language-copy><span>{String(index + 1).padStart(2, '0')} / {project.kind}</span><span className="project-card-status">{project.status}</span></div>
              <h2 data-language-layout>{project.name}{project.link && <ArrowUpRight className="project-card-arrow" size={24} strokeWidth={1.3} aria-hidden="true" />}</h2>
              <p data-language-copy>{project.summary}</p>
              {(project.id === 'tonetrace' || project.id === 'rehandshaker') && <details className="project-concept-notes">
                <summary><span data-language-copy>{t('projects.notesLabel')}</span><ChevronDown size={14} aria-hidden="true" /></summary>
                <div>{(t(`projects.conceptNotes.${project.id}`, {returnObjects:true}) as {title:string;body:string}[]).map((note, noteIndex) => <div key={noteIndex} data-language-copy><h3>{note.title}</h3><p>{note.body}</p></div>)}</div>
              </details>}
              {project.id === 'fosho' && <ul className="project-feature-notes" data-language-copy>{(t('projects.fosho.features', { returnObjects: true }) as string[]).map(feature => <li key={feature}>{feature}</li>)}</ul>}
              <div className="project-card-foot" data-language-copy>
                {project.id === 'fosho' ? <Link className="project-studio-link" to="/projects/fosho" onMouseEnter={() => warmPage('/projects/fosho')} onFocus={() => warmPage('/projects/fosho')}>{t('projects.fosho.read')}<ArrowUpRight size={14} aria-hidden="true" /></Link> : project.link ? <span>{t('projects.explore')}<ArrowUpRight size={14} aria-hidden="true" /></span> : <span>{project.kind}</span>}
                <span className="project-card-asterisk" aria-hidden="true">✳</span>
              </div>
            </div>
          </>;
          return <motion.article
            className={`project-card project-card--${project.id}${index === 0 ? ' project-card--featured' : ''}`}
            key={project.id} id={'project-' + project.id} tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .08 }}
            transition={{ duration: reduced ? 0 : .65, delay: reduced || index === 0 ? 0 : ((index - 1) % 2) * .07, ease: [.22, 1, .36, 1] }}
          >
            {project.link
              ? <a className="project-card-content" href={project.link} target="_blank" rel="noopener noreferrer">{content}</a>
              : <div className="project-card-content">{content}</div>}
          </motion.article>;
        })}
      </div>
    </section>
    <Photography />
  </main>;
}
