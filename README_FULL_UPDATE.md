# ivandar1td.com complete source — V4

Current merged source for the site.

## Theme-aware I. favicon

- Light site theme -> `public/favicon-light.svg`
- Dark site theme -> `public/favicon-dark.svg`
- The favicon follows the site's saved theme, not only the OS theme.
- Switching theme replaces the favicon link node to avoid stale Safari/Chromium favicon caching.
- No static `favicon.ico` is referenced from `index.html`, so it cannot override the themed icon.

## Personal assets

Keep the existing personal assets in your repository:

- `src/assets/prof.jpg`
- `src/assets/fonts/Dudu_Calligraphy.woff2`
- `src/assets/fonts/Dudu_Calligraphy.woff`

The source code references them but this source package does not replace them.

## Run

```bash
npm install
npm run dev
```

## Vercel

`vite.config.ts` uses `/` as the base path and `vercel.json` contains SPA routing fallback.
