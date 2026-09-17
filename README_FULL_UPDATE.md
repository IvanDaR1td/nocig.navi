# ivandar1td.com — complete V5

This is the corrected standalone source bundle.

Included in this build:
- complete React/Vite source including `src/main.tsx` and all `src/pages/*`
- Ivan / Chan identity and boot transitions
- theme-aware light/dark `I.` favicon
- Dudu Calligraphy binaries restored for English UI
- Chinese system/PingFang-style font stack retained
- profile portrait asset included in `src/assets/`
- photography and Inspirations updates
- Spotify player fix
- Vercel SPA rewrite
- Vite base path `/`

Build fixes vs V4:
- removed the invalid `allowImportingTsExtensions` project-reference setup
- added `src/vite-env.d.ts` and Vite client types for `import.meta.env`
- build script is now `tsc --noEmit && vite build`
- profile image is physically included, so About no longer fails module resolution

Run:
```bash
npm install
npm run dev
npm run build
```
