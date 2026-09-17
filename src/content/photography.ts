export interface LocalisedText {
  en: string;
  zh: string;
}

export interface Photograph {
  id: string;
  src: string;
  width: number;
  height: number;
  title: LocalisedText;
  date: LocalisedText;
  alt: LocalisedText;
}

export const photographs: Photograph[] = [
  {
    id: 'betweenReflections',
    src: 'images/photography/between-reflections.jpg',
    width: 1369,
    height: 2048,
    title: { en: 'Between Reflections.', zh: '倒影之间。' },
    date: { en: '18 JUL 2026', zh: '2026 · 07 · 18' },
    alt: {
      en: 'A seated figure in silhouette beside a bright apartment window, reflected across the polished floor.',
      zh: '明亮公寓窗前的人物剪影，抛光地面映出人物与室内陈设。',
    },
  },
  {
    id: 'forgottenFrame',
    src: 'images/photography/forgotten-frame.jpg',
    width: 1539,
    height: 2048,
    title: { en: 'Forgotten Frame.', zh: '被遗忘的窗框。' },
    date: { en: '19 JUL 2026', zh: '2026 · 07 · 19' },
    alt: {
      en: 'A weathered blue-painted window set into an old brick wall, seen through a dark narrow foreground.',
      zh: '老砖墙上的蓝色旧窗，从狭窄而幽暗的前景之间望去。',
    },
  },
  {
    id: 'hiddenCourtyard',
    src: 'images/photography/hidden-courtyard.jpg',
    width: 1295,
    height: 2048,
    title: { en: 'Hidden Courtyard.', zh: '隐匿院落。' },
    date: { en: '19 JUL 2026', zh: '2026 · 07 · 19' },
    alt: {
      en: 'Apartment buildings glimpsed through a narrow gap, partly veiled by branches and shadow.',
      zh: '从狭窄楼间望向住宅楼，树枝与阴影遮住了部分画面。',
    },
  },
  {
    id: 'isolation',
    src: 'images/photography/isolation.jpg',
    width: 1539,
    height: 2048,
    title: { en: 'Isolation.', zh: '孤立。' },
    date: { en: '20 JUL 2026', zh: '2026 · 07 · 20' },
    alt: {
      en: 'A bright fluorescent tube extending into darkness, with the surrounding space almost entirely swallowed by black.',
      zh: '黑暗空间里，一支明亮的长条灯管向远处延伸，周围几乎被黑色吞没。',
    },
  },
];
