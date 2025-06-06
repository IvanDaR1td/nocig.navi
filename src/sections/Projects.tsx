
// src/sections/Projects.tsx
export function Projects({ language }: { language: 'en' | 'zh' }) {
  const projects = [
    {
      title: {
        zh: '小游戏合集',
        en: 'Mini Game Collection'
      },
      description: {
        zh: '几个用爱发电的小游戏，灵感来自深夜脑洞。',
        en: 'A few love-fueled minigames, born of midnight sparks.'
      },
      inspirationLink: 'https://example.com/inspiration/game1'
    },
    {
      title: {
        zh: '歌词诗集',
        en: 'Lyrics & Poetry'
      },
      description: {
        zh: '个人碎语与旋律杂糅的产物。',
        en: 'A mashup of personal lines and melodies.'
      },
      inspirationLink: 'https://example.com/inspiration/lyrics'
    },
  ];

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        {language === 'zh' ? '我的项目' : 'My Projects'}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((proj, index) => (
          <div key={index} className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold">
              {language === 'zh' ? proj.title.zh : proj.title.en}
            </h3>
            <p className="mt-2">
              {language === 'zh' ? proj.description.zh : proj.description.en}
            </p>
            <a
              href={proj.inspirationLink}
              target="_blank"
              className="block mt-4 text-sm text-blue-500 underline"
            >
              {language === 'zh' ? '灵感来源' : 'Inspiration source'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
