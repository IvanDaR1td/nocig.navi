export const pageLoaders = {
  projects: () => import('./Projects'),
  about: () => import('./About'),
  inspirations: () => import('./Inspirations'),
  fosho: () => import('./FoSho'),
};
export function warmPage(path: string) {
  const loader = path.startsWith('/projects/fosho') ? pageLoaders.fosho
    : path.startsWith('/projects') ? pageLoaders.projects
    : path === '/about' ? pageLoaders.about
    : path === '/inspirations' ? pageLoaders.inspirations : undefined;
  void loader?.().catch(() => { /* Navigation remains available for a normal retry. */ });
}
