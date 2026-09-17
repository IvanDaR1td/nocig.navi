import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import { Icon } from '../components/Icon';

interface InspirationItem {
  label: string;
  note?: string;
  iframe?: string;
  image?: string;
  imageSource?: string;
  link?: string;
}

interface InspirationSection {
  title: string;
  icon?: string;
  description?: string;
  items: InspirationItem[];
}

function imageSrc(path?: string) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path}`;
}

export default function Inspirations() {
  const { t } = useTranslation();
  const sections = t('inspirations.sections', { returnObjects: true }) as Record<string, InspirationSection>;

  const mediaClass = (key: string) => {
    if (key === 'games') return 'aspect-video';
    return 'aspect-[4/5]';
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <header className="max-w-3xl pb-12 md:pb-16">
        <div className="flex items-center gap-2 tech-type">
          <Icon name={t('inspirations.icon') as keyof typeof Icons} className="h-3.5 w-3.5" />
          {t('inspirations.eyebrow')}
        </div>
        <h1 className="mt-4 text-5xl font-normal text-[var(--color-title)] md:text-7xl">{t('inspirations.title')}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--color-secondary)]">{t('inspirations.intro')}</p>
      </header>

      <div className="space-y-20">
        {Object.entries(sections).map(([key, section]) => (
          <section key={key}>
            <div className="mb-7 grid gap-2 md:grid-cols-[180px_1fr]">
              <h2 className="flex items-center gap-2 text-2xl text-[var(--color-title)]">
                {section.icon && <Icon name={section.icon as keyof typeof Icons} className="h-4 w-4 text-[var(--color-primary)]" />}
                {section.title}
              </h2>
              {section.description && (
                <p className="max-w-2xl text-base leading-7 text-[var(--color-secondary)]">{section.description}</p>
              )}
            </div>

            <div className="grid gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const media = (
                  <div className={`${mediaClass(key)} overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)]`}>
                    {item.iframe ? (
                      <iframe
                        src={item.iframe}
                        title={item.label}
                        className="h-full w-full"
                        allowFullScreen
                      />
                    ) : item.image ? (
                      <img
                        src={imageSrc(item.image)}
                        alt={item.label}
                        loading="lazy"
                        className="inspo-image h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center tech-type">image pending</div>
                    )}
                  </div>
                );

                return (
                  <article key={item.label} className="group">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.label} official site`}
                        className="block no-underline hover:no-underline"
                      >
                        {media}
                      </a>
                    ) : media}

                    <div className="mt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-2xl text-[var(--color-title)]">{item.label}</h3>
                        {item.link && <span className="tech-type">↗</span>}
                      </div>
                      {item.note && <p className="mt-2 text-base leading-7 text-[var(--color-secondary)]">{item.note}</p>}
                      {item.imageSource && (
                        <a
                          href={item.imageSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block tech-type no-underline hover:text-[var(--color-primary)] hover:no-underline"
                        >
                          image ref ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
