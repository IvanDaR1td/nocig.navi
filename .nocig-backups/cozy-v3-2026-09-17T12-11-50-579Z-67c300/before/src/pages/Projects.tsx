import { useTranslation } from 'react-i18next';

interface Project {
  name: string;
  kind: string;
  year: string;
  group: 'built' | 'exploring' | 'ideas';
  status: string;
  summary: string;
  detail: string;
  tags: string[];
  link?: string;
}

export default function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Project[];
  const groups = t('projects.groups', { returnObjects: true }) as Record<string, { title: string; description: string }>;
  const order: Project['group'][] = ['built', 'exploring', 'ideas'];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <header className="max-w-3xl pb-12 md:pb-16">
        <p className="tech-type">{t('projects.eyebrow')}</p>
        <h1 className="mt-4 text-5xl font-normal text-[var(--color-title)] md:text-7xl">{t('projects.title')}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--color-secondary)]">{t('projects.intro')}</p>
      </header>

      <div className="space-y-16">
        {order.map((groupKey) => {
          const items = projects.filter((project) => project.group === groupKey);
          if (!items.length) return null;

          return (
            <section key={groupKey}>
              <div className="mb-6 grid gap-2 md:grid-cols-[180px_1fr] md:items-start">
                <h2 className="text-2xl text-[var(--color-title)]">{groups[groupKey].title}</h2>
                <p className="max-w-2xl text-base leading-7 text-[var(--color-secondary)]">{groups[groupKey].description}</p>
              </div>

              <div className="space-y-3">
                {items.map((project) => (
                  <article key={project.name} className="paper-note p-5 md:p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-3xl text-[var(--color-title)]">{project.name}</h3>
                          <span className="tech-type">{project.status}</span>
                        </div>
                        <p className="mt-1 text-base text-[var(--color-primary)]">{project.kind}</p>
                        <p className="mt-5 text-lg leading-8 text-[var(--color-text)]">{project.summary}</p>
                        <p className="mt-3 text-base leading-7 text-[var(--color-secondary)]">{project.detail}</p>
                      </div>

                      <div className="flex shrink-0 flex-col gap-4 md:items-end">
                        <span className="tech-type">{project.year}</span>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--color-muted)] md:max-w-[220px] md:justify-end">
                          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 border-b border-[var(--color-primary)] pb-0.5 text-base text-[var(--color-text)] no-underline hover:text-[var(--color-primary)] hover:no-underline"
                          >
                            {t('projects.open')} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
