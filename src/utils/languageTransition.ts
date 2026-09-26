/** Switch translated copy in place; keep media, focus and component state intact. */
export function transitionLanguage(change: () => void) {
  const animations = new Set<Animation>();
  let cancelled = false;
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-language-copy], [data-language-layout]')];
  const before = new Map(nodes.map(node => [node, node.getBoundingClientRect()]));
  const visible = (rect: DOMRect) => rect.height > 0 && rect.width > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
  const play = (node: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    const animation = node.animate(frames, options);
    animations.add(animation);
    return animation;
  };
  const clear = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };

  const finished = (async () => {
    try {
      const leaving = nodes.filter(node => node.hasAttribute('data-language-copy') && visible(before.get(node)!));
      await Promise.all(leaving.map(node => play(node, [
        { opacity: getComputedStyle(node).opacity, translate: '0 0' },
        { opacity: 0, translate: '0 -2px' },
      ], { duration: 90, easing: 'ease-in', fill: 'forwards' }).finished));
      if (cancelled) return;
      // The caller commits the bundled locale synchronously. Measure before paint.
      change();
      clear();
      const after = new Map(nodes.filter(node => node.isConnected).map(node => [node, node.getBoundingClientRect()]));
      const entering: Animation[] = [];
      after.forEach((rect, node) => {
        const previous = before.get(node)!;
        if (!visible(rect) && !visible(previous)) return;
        // Subtract any enclosing layout movement so nested captions do not move twice.
        const parent = node.parentElement?.closest<HTMLElement>('[data-language-copy], [data-language-layout]');
        const parentBefore = parent ? before.get(parent) : undefined;
        const parentAfter = parent ? after.get(parent) : undefined;
        const x = previous.left - rect.left - (parentBefore && parentAfter ? parentBefore.left - parentAfter.left : 0);
        const y = previous.top - rect.top - (parentBefore && parentAfter ? parentBefore.top - parentAfter.top : 0);
        if (node.hasAttribute('data-language-copy')) {
          entering.push(play(node, [
            { opacity: 0, translate: `${x}px ${y + 3}px` },
            { opacity: getComputedStyle(node).opacity, translate: '0 0' },
          ], { duration: 230, easing: 'cubic-bezier(.22, 1, .36, 1)' }));
        } else if (Math.abs(x) > .5 || Math.abs(y) > .5) {
          entering.push(play(node, [
            { translate: `${x}px ${y}px` }, { translate: '0 0' },
          ], { duration: 230, easing: 'cubic-bezier(.22, 1, .36, 1)' }));
        }
      });
      await Promise.all(entering.map(animation => animation.finished));
    } catch (error) {
      // Unmount cancellation is expected; genuine failures are handled by the caller.
      if (!cancelled) throw error;
    } finally {
      clear();
    }
  })();

  return { finished, cancel: () => { cancelled = true; clear(); } };
}
