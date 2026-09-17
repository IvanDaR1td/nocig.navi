import profile from '../assets/prof.jpg';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
const socials = [
  { id: 'instagram', href: 'https://www.instagram.com/ivandar1td/' },
  { id: 'github', href: 'https://github.com/IvanDaR1td' },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/xingyi-chen-ivandartd/' },
];
export default function About() {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true }) as string[];
  return <main className="profile-page page-width" id="main-content" tabIndex={-1}>
    <figure className="profile-picture">
      <img src={profile} alt={t('about.portraitAlt')} width="640" height="800" />
      <figcaption>{t('about.photoNote')}</figcaption>
    </figure>
    <section className="profile-text">
      <p className="eyebrow">{t('nav.about')}</p>
      <h1>{t('common.name')}</h1>
      <p className="profile-role">{t('about.role')}</p>
      <div className="profile-values">{values.map(value => <p key={value}>{value}</p>)}</div>
      <p className="profile-aside">{t('about.aside')}</p>
      <p className="profile-company">{t('about.company')}</p>
      <nav className="social-links" aria-label={t('about.socialLabel')}>
        {socials.map(social => <a href={social.href} key={social.id} target="_blank" rel="noopener noreferrer">
          {t('socials.' + social.id)}<ArrowUpRight className="inline-arrow" size={15} strokeWidth={1.6} aria-hidden="true" />
        </a>)}
      </nav>
    </section>
  </main>;
}
