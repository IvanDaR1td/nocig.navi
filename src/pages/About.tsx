import profile from '../assets/profile.jpg';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const tags = ['dev', 'writer', 'listener', 'gamer'];

  const qa = [
    {
      question: t('about.q1'),
      answer: t('about.a1'),
    },
    {
      question: t('about.q2'),
      answer: t('about.a2'),
    },
    {
      question: t('about.q3'),
      answer: t('about.a3'),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Freeze Frame 区 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <img
          src={profile}
          alt="Profile"
          className="w-40 h-40 rounded-lg shadow-xl border-4 border-secondary object-cover"
        />
        <div className="text-center md:text-left">
          <h1 className=" text-4xl text-primary font-handwriting neon-text">{t('about.name')}</h1>
          <p className="text-lg text-text italic">{t('about.bio')}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-mono shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 灵魂自问自答区 */}
      <div className="bg-background border border-secondary/50 rounded-xl p-6 shadow-inner backdrop-blur-md">
        <h2 className="text-2xl text-secondary font-semibold mb-6">{t('about.selfQaTitle')}</h2>
        <div className="space-y-4">
          {qa.map(({ question, answer }, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 text-accent font-semibold">{question}</div>
              <div className="w-full md:w-2/3 text-text">{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
