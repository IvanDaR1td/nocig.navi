import { Github, Instagram, Linkedin } from 'lucide-react';
import { mediaUrl } from '../utils/media';
import { useTranslation } from 'react-i18next';
import Reveal from '../components/Reveal';

const socials = [
  { id: 'instagram', Icon: Instagram, href: 'https://www.instagram.com/ivandar1td/' },
  { id: 'github', Icon: Github, href: 'https://github.com/IvanDaR1td' },
  { id: 'linkedin', Icon: Linkedin, href: 'https://www.linkedin.com/in/xingyi-chen-ivandartd/' },
];

export default function About() {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true }) as string[];

  return (
    <main className="profile-page" id="main-content" tabIndex={-1}>
      <Reveal className="profile-picture-reveal">
        <figure className="profile-picture">
          <div className="profile-picture-frame">
            <img
              src={mediaUrl('images/profile/portrait-768.webp')}
              srcSet={`${mediaUrl('images/profile/portrait-384.webp')} 384w, ${mediaUrl('images/profile/portrait-768.webp')} 768w, ${mediaUrl('images/profile/portrait-1152.webp')} 1152w`}
              sizes="(max-width: 600px) 76vw, 360px"
              alt={t('about.portraitAlt')}
              width="1284"
              height="1284"
              decoding="async"
            />
          </div>
          <figcaption data-language-copy>{t('about.photoNote')}</figcaption>
        </figure>
      </Reveal>

      <section className="profile-text">
        <Reveal delay={0.1}>
          <p className="eyebrow" data-language-copy>{t('nav.about')}</p>
          <h1 data-language-layout>{t('common.name')}</h1>
          <p className="profile-role" data-language-copy>{t('about.role')}</p>
        </Reveal>

        <Reveal className="profile-values" data-language-copy delay={0.16}>
          {values.map(value => <p key={value}>{value}</p>)}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="profile-aside" data-language-copy>{t('about.aside')}</p>
          <a className="profile-company" data-language-copy href="https://metra.ie/" target="_blank" rel="noopener noreferrer">{t('about.company')}<span aria-hidden="true"> ↗</span></a>
          <p className="profile-elsewhere" data-language-copy>{t('about.socialLabel')}</p>

          <nav className="social-links" data-language-layout aria-label={t('about.socialLabel')}>
            {socials.map(social => (
              <a
                href={social.href}
                className={`social-link social-link--${social.id}`}
                aria-label={t('socials.' + social.id)}
                key={social.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.Icon size={22} strokeWidth={1.3} aria-hidden="true" />
                <span className="social-link-caption" aria-hidden="true">{t('socials.' + social.id)}</span>
              </a>
            ))}
          </nav>
        </Reveal>
      </section>
    </main>
  );
}
