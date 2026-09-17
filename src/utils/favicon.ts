export type SiteTheme = 'light' | 'dark';

/**
 * Keep the browser-tab favicon in sync with the site's actual theme.
 * Replacing the <link> node is intentional: Safari/Chromium can cache a
 * favicon even after href changes, especially when switching repeatedly.
 */
export function applySiteFavicon(theme: SiteTheme): void {
  const current = document.querySelector<HTMLLinkElement>('#site-favicon');
  const light = current?.dataset.light ?? `${import.meta.env.BASE_URL}favicon-light.svg`;
  const dark = current?.dataset.dark ?? `${import.meta.env.BASE_URL}favicon-dark.svg`;
  const baseHref = theme === 'dark' ? dark : light;
  const href = `${baseHref.split('?')[0]}?theme=${theme}&v=4`;

  const next = document.createElement('link');
  next.id = 'site-favicon';
  next.rel = 'icon';
  next.type = 'image/svg+xml';
  next.href = href;
  next.dataset.light = light.split('?')[0];
  next.dataset.dark = dark.split('?')[0];

  if (current) current.replaceWith(next);
  else document.head.appendChild(next);
}
