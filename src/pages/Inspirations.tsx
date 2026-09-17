import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import { ArrowUpRight } from 'lucide-react';
import { mediaUrl } from '../utils/media';

interface Item {
  label: string;
  meta?: string;
  note?: string;
  image?: string;
  iframe?: string;
  imageSource?: string;
  imageCredit?: string;
  link?: string;
}

interface Section {
  title: string;
  description: string;
  items: Item[];
}

export default function Inspirations() {
  const { t } = useTranslation();
  const sections = t('inspirations.sections', { returnObjects: true }) as Record<string, Section>;

  return (
    <main className="inspirations-page page-width" id="main-content" tabIndex={-1}>
      <header className="inspirations-heading">
        <h1>{t('inspirations.title')}</h1>
        <p className="page-intro">{t('inspirations.intro')}</p>
        <nav className="section-links" aria-label={t('inspirations.sectionsLabel')}>
          {Object.entries(sections).map(([key, section]) => (
            <Link key={key} to={`/inspirations#${key}`}>{section.title}</Link>
          ))}
        </nav>
      </header>

      {Object.entries(sections).map(([key, section]) => (
        <section className={`inspiration-section ${key}`} id={key} key={key} tabIndex={-1}>
          <header className="inspiration-section-heading">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </header>

          <div className="inspiration-grid">
            {section.items.map((item) => {
              const isAlbum = key === 'albums';
              const linkLabel = isAlbum
                ? t('inspirations.spotifyAlbum', { name: item.label })
                : t('inspirations.officialSite', { name: item.label });

              const media = (
                <div className="inspiration-media">
                  {item.iframe ? (
                    <iframe
                      title={t('inspirations.videoTitle', { name: item.label })}
                      src={item.iframe}
                      loading="lazy"
                      allowFullScreen
                    />
                  ) : item.image ? (
                    <SafeImage
                      src={mediaUrl(item.image)}
                      alt={t('inspirations.imageAlt', { name: item.label })}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy={/^https?:\/\//i.test(item.image) ? 'no-referrer' : undefined}
                    />
                  ) : (
                    <span className="image-fallback">{t('common.imageUnavailable')}</span>
                  )}
                </div>
              );

              return (
                <article className={`inspiration${isAlbum ? ' album-card' : ''}`} key={item.label}>
                  {item.link ? (
                    <a
                      className="inspiration-image-link"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={linkLabel}
                    >
                      {media}
                      <span className="image-link-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.6} /></span>
                    </a>
                  ) : media}

                  <h3>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : item.label}
                  </h3>
                  {item.meta && <p className="inspiration-meta">{item.meta}</p>}
                  {item.note && <p className="inspiration-note">{item.note}</p>}

                  {(item.imageSource || item.imageCredit) && (
                    <details className="image-credits">
                      <summary>{t('inspirations.imageDetails')}</summary>
                      {item.imageCredit && <p>{item.imageCredit}</p>}
                      {item.imageSource && (
                        <a href={item.imageSource} target="_blank" rel="noopener noreferrer">
                          {t('inspirations.imageReference')}<ArrowUpRight className="inline-arrow" size={15} strokeWidth={1.6} aria-hidden="true" />
                        </a>
                      )}
                    </details>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
