import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/utils/languageTransition.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { transitionLanguage } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const rect = (top, left = 0) => ({ top, left, bottom: top + 50, right: left + 100, width: 100, height: 50 });
let changed = false;
let hold = false;
class Node {
  constructor(copy, before, after, parent = null) { Object.assign(this, { copy, before, after, parent, isConnected: true, animations: [] }); }
  hasAttribute(name) { return name === 'data-language-copy' && this.copy; }
  getBoundingClientRect() { return changed ? this.after : this.before; }
  get parentElement() { return { closest: () => this.parent }; }
  animate(frames) {
    if (this.fail) throw new Error('Animation unavailable');
    let reject;
    const animation = {
      frames, cancelled: false,
      finished: hold ? new Promise((_, failure) => { reject = failure; }) : Promise.resolve(),
      cancel() { this.cancelled = true; reject?.(new Error('Cancelled')); },
    };
    this.animations.push(animation);
    return animation;
  }
}
globalThis.innerWidth = 1280;
globalThis.innerHeight = 720;
globalThis.getComputedStyle = () => ({ opacity: '1' });
let nodes;
globalThis.document = { querySelectorAll: () => nodes };

const cover = new Node(false, rect(200), rect(250));
const caption = new Node(true, rect(220), rect(270), cover);
const offscreen = new Node(true, rect(1800), rect(1850));
nodes = [cover, caption, offscreen];
await transitionLanguage(() => { changed = true; }).finished;
assert.equal(caption.animations[1].frames[0].translate, '0px 3px', 'nested text must not duplicate its cover movement');
assert.equal(cover.animations[0].frames[0].translate, '0px -50px');
assert.ok(cover.animations.every(a => a.frames.every(frame => !('opacity' in frame))), 'media must never fade');
assert.equal(offscreen.animations.length, 0, 'offscreen copy should not animate');
assert.ok(nodes.flatMap(n => n.animations).every(a => a.cancelled), 'no animation fill should survive completion');

changed = false;
hold = true;
nodes = [new Node(true, rect(10), rect(10))];
const cancelled = transitionLanguage(() => { changed = true; });
cancelled.cancel();
await cancelled.finished;
assert.equal(changed, false, 'unmount cancellation must not commit a delayed language change');
assert.ok(nodes[0].animations.every(a => a.cancelled));

hold = false;
nodes = [new Node(true, rect(10), rect(10)), new Node(true, rect(80), rect(80))];
nodes[1].fail = true;
await assert.rejects(transitionLanguage(() => { changed = true; }).finished, /Animation unavailable/);
assert.ok(nodes[0].animations.every(a => a.cancelled), 'a failed animation must restore visible copy');
console.log('PASS: media stays visible, nested layout offsets, offscreen work, cancellation and failure cleanup.');
