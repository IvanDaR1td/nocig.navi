import profile from '../assets/prof.jpg';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface AboutBlock {
  label: string;
  text: string;
}

export default function About() {
  const { t } = useTranslation();
  const focus = t('about.focus', { returnObjects: true }) as string[];
  const blocks = t('about.blocks', { returnObjects: true }) as AboutBlock[];

  const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/ivandar1td/', icon: FaInstagram },
    { label: 'GitHub', href: 'https://github.com/IvanDaR1td', icon: FaGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xingyi-chen-ivandartd/', icon: FaLinkedin },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <section className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-end md:gap-14">
        <div>
          <img
            src={profile}
            alt={t('about.name')}
            className="aspect-[4/5] w-full max-w-md rounded-[1.35rem] border border-[var(--color-border)] object-cover"
          />
          <p className="mt-3 tech-type">profile / 2026</p>
        </div>

        <div>
          <p className="tech-type">{t('about.eyebrow')}</p>
          <h1 className="mt-4 text-5xl font-normal text-[var(--color-title)] md:text-7xl">{t('about.name')}</h1>
          <p className="mt-4 text-xl text-[var(--color-primary)]">{t('about.role')}</p>
          <p className="mt-7 max-w-2xl text-2xl leading-10 text-[var(--color-text)]">{t('about.bio')}</p>

          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-base text-[var(--color-secondary)]">
            {focus.map((item) => <span key={item}>· {item}</span>)}
          </div>
        </div>
      </section>

      <section className="room-card mt-14 grid gap-8 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-8">
        <div>
          <p className="tech-type">{t('about.current.label')}</p>
          <p className="mt-4 text-3xl text-[var(--color-title)]">Metra</p>
          <p className="mt-1 text-xl text-[var(--color-primary)]">FoSho</p>
        </div>
        <p className="text-xl leading-8 text-[var(--color-text)] md:border-l md:border-[var(--color-border)] md:pl-8">
          {t('about.current.body')}
        </p>
      </section>

      <section className="grid gap-5 py-14 md:grid-cols-3">
        {blocks.map((block) => (
          <article key={block.label} className="paper-note p-5">
            <p className="tech-type">{block.label}</p>
            <p className="mt-4 text-lg leading-8 text-[var(--color-secondary)]">{block.text}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-5 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-[var(--color-secondary)]">{t('about.contact')}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {socials.map(({ label, href, icon: SocialIcon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-base text-[var(--color-text)] no-underline hover:text-[var(--color-primary)] hover:no-underline"
            >
              <SocialIcon size={15} />
              {label}
              <span className="text-[var(--color-muted)] transition group-hover:translate-x-0.5">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
