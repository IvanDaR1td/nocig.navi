// Local public/ assets must respect Vite's base, including GitHub Pages subpaths.
export function mediaUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
