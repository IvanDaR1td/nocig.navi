import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AlbumArchive from '../components/AlbumArchive';
import SafeImage from '../components/SafeImage';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { mediaUrl } from '../utils/media';
import '../styles/inspirations-showcase.css';

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
  const reduceMotion = useReducedMotion();
  const sections = t('inspirations.sections', { returnObjects: true, yearsSince2022: new Date().getFullYear() - 2022 }) as Record<string, Section>;

  return (
    <main className="inspirations-page page-width" id="main-content" tabIndex={-1}>
      <header className="inspirations-heading" data-language-copy>
        <h1>{t('inspirations.title')}</h1>
        <p className="page-intro">{t('inspirations.intro')}</p>
        <nav className="section-links" aria-label={t('inspirations.sectionsLabel')}>
          {Object.entries(sections).map(([key, section], index) => (
            <Link key={key} to={`/inspirations#${key}`}>
              <span className="inspiration-index-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {key === 'albums' ? t('inspirations.albumsLabel') : section.title}
            </Link>
          ))}
        </nav>
      </header>

      {Object.entries(sections).map(([key, section], sectionIndex) => key === 'albums' ? (
        <AlbumArchive key={key} items={section.items} title={section.title} description={section.description} />
      ) : (
        <section className={`inspiration-section ${key}`} id={key} key={key} tabIndex={-1}>
          <header className="inspiration-section-heading" data-language-copy>
            <span className="inspiration-section-number" aria-hidden="true">{String(sectionIndex + 1).padStart(2, '0')}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </header>

          <motion.div className="inspiration-grid"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: .03 }}
            transition={{ duration: reduceMotion ? 0 : .24, ease: 'easeOut' }}>
            {section.items.map((item, itemIndex) => {
              const linkLabel = t('inspirations.officialSite', { name: item.label });

              const media = (
                <div className="inspiration-media" data-language-layout>
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
                <article
                  className="inspiration"
                  key={`${key}-${itemIndex}`}
                >
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

                  <h3 data-language-copy>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : item.label}
                  </h3>
                  {item.meta && <p className="inspiration-meta" data-language-copy>{item.meta}</p>}
                  {item.note && <p className="inspiration-note" data-language-copy>{item.note}</p>}

                  {(item.imageSource || item.imageCredit) && (
                    <details className="image-credits" data-language-copy>
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
          </motion.div>
        </section>
      ))}
    </main>
  );
}
