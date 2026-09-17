import profile from '../assets/prof.jpg';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

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

      {/* 🔗 卡片外的社交链接 */}
      <div className="flex justify-center gap-8 mt-10">
        <a
        href="https://www.instagram.com/ivandar1td/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary/20 text-text
                  hover:text-white hover:bg-red-600   
                  hover:shadow-[0_0_15px_3px_rgba(220,38,38,0.7)]
                  transition-all transform hover:scale-110"
      >
        <FaInstagram size={26} />
      </a>  
        {/* GitHub - 浅绿色 */}
        <a
          href="https://github.com/IvanDaR1td"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary/20 text-text
                     hover:text-white hover:bg-green-500 
                     hover:shadow-[0_0_15px_3px_rgba(34,197,94,0.7)]
                     transition-all transform hover:scale-110"
        >
          <FaGithub size={26} />
        </a>

        {/* LinkedIn - 蓝色 */}
        <a
          href="https://www.linkedin.com/in/xingyi-chen-ivandartd/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary/20 text-text
                     hover:text-white hover:bg-blue-600   
                     hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.7)]
                     transition-all transform hover:scale-110"
        >
          <FaLinkedin size={26} />
        </a>
      </div>
    </div>
  );
}
