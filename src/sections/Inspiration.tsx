
// src/sections/Inspiration.tsx
export function Inspiration({ language }: { language: 'en' | 'zh' }) {
  const sources = [
    {
      name: 'David OReilly',
      desc: {
        zh: '视觉与交互叙事的奇才。',
        en: 'A genius in visual and interactive storytelling.'
      },
      link: 'https://www.davidoreilly.com/'
    },
    {
      name: 'Yugo Nakamura',
      desc: {
        zh: '网页交互的魔法师。',
        en: 'A wizard of web interaction.'
      },
      link: 'https://yugop.com/'
    },
    {
      name: 'Mitski',
      desc: {
        zh: '旋律和孤独的诗人。',
        en: 'A poet of melody and solitude.'
      },
      link: 'https://www.mitski.com/'
    },
  ];

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        {language === 'zh' ? '灵感来源' : 'Inspiration'}
      </h2>
      <ul className="space-y-6">
        {sources.map((item, i) => (
          <li key={i} className="border-l-4 pl-4 border-pink-500">
            <a
              href={item.link}
              target="_blank"
              className="text-xl font-semibold hover:underline"
            >
              {item.name}
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'zh' ? item.desc.zh : item.desc.en}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
