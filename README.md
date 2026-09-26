# nocig.navi — Ivan Chan

个人网站完整优化版，包含 Projects / Photography showcase、原有 Inspirations 内容、FoSho / Metra 品牌素材、深浅主题、双语界面与全站动效。另含 FoSho 工作手记、构想笔记、摄影编排及图片加载优化。

## 本地运行

安装 Node.js 与 npm，在解压后的 `nocig.navi` 文件夹中运行：

```sh
npm ci
npm run dev
```

开发服务器地址会显示在终端中。`/` 为欢迎开场；直接打开 `/home`、`/projects`、`/about` 或 `/inspirations` 可查看对应页面。FoSho 工作手记位于 `/projects/fosho`。

## 构建与检查

```sh
npm run check:locales
npm run check:language-transition
npm run build
npm run preview
```

`npm run build` 会把生产版本生成到 `dist/`。

## 完整 ZIP 中的文件

- `src/`、`public/`：完整源码、照片、字体、图标与品牌素材。
- `dist/`：与本次源码对应的生产构建，可直接用于静态托管。
- `package.json`、`package-lock.json`：依赖与版本锁定；安装依赖使用 `npm ci`。
- `scripts/`：双语内容、摄影目录及语言过渡的校验。
- `SHOWCASE.md`：所有优化与验证说明。
- `vercel.json`：原项目的 Vercel 构建与路由配置。

ZIP 不包含可重新安装的 `node_modules`、Git 历史、本机配置或原始 FoSho 文档。

## 部署

当前资源路径从站点根目录 `/` 加载。静态托管的发布目录设为 `dist`，并让 `/home`、`/projects` 等前端路由回退到 `index.html`。不要直接双击 `dist/index.html` 预览，应使用 HTTP 服务。

线上 Inspirations 图片与嵌入内容保持原地址，需要网络连接。本轮没有修改这部分作品内容，也没有推送或发布到线上。
