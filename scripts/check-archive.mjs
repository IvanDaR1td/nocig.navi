import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { createInstance } from 'i18next';
async function load(file) {
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
}
const { projectRecord, clampRecord } = await load('../src/utils/recordPhysics.ts');
assert.equal(projectRecord(3.1, 7, 25), 4, 'a short, fast flick carries beyond the nearest sleeve');
assert.equal(projectRecord(3.1, 0, 25), 3, 'a slow release snaps to the nearest sleeve');
assert.equal(projectRecord(3.8, -5, 25), 3, 'reverse momentum follows the release direction');
assert.equal(projectRecord(-.25, -30, 25), 0, 'first record cannot be overshot');
assert.equal(projectRecord(24.25, 30, 25), 24, 'last record cannot be overshot');
assert.equal(projectRecord(10, 1000, 25), 13, 'high velocity has a bounded destination');
for (let index = -5; index <= 30; index += .25) {
  for (const velocity of [-1000, -2, 0, 2, 1000]) {
    const result = projectRecord(index, velocity, 25);
    assert.ok(Number.isInteger(result) && result >= 0 && result < 25);
  }
}
assert.equal(clampRecord(23.7, 25), 24);
const session = new Map();
globalThis.sessionStorage = { getItem: key => session.get(key), setItem: (key, value) => session.set(key, value) };
const { hasEnteredArchive, rememberArchiveEntry } = await load('../src/utils/introSession.ts');
assert.equal(hasEnteredArchive(), false);
rememberArchiveEntry();
assert.equal(hasEnteredArchive(), true, 'refresh in the same session bypasses the gate');
session.clear();
assert.equal(hasEnteredArchive(), false, 'a new browser session can show the gate');
globalThis.sessionStorage = { getItem: () => { throw Error('blocked'); }, setItem: () => { throw Error('blocked'); } };
assert.doesNotThrow(rememberArchiveEntry);
assert.equal(hasEnteredArchive(), false, 'blocked storage does not crash entry');
for (const lang of ['en', 'zh']) {
  const data = JSON.parse(fs.readFileSync(new URL(`../src/locales/${lang}.json`, import.meta.url), 'utf8')).inspirations;
  assert.equal(data.sections.albums.items.length, 25);
  assert.equal(data.encore.length, 3);
  assert.ok(data.encore.every(record => record.image.startsWith('https://') && record.link.startsWith('https://') && record.note));
}
console.log('PASS: slow releases, momentum, reverse flicks, collection boundaries, session persistence, blocked storage, and 25 + 3 catalogue.');

const resources = Object.fromEntries(['en', 'zh'].map(lang => [lang, { translation: JSON.parse(fs.readFileSync(new URL(`../src/locales/${lang}.json`, import.meta.url), 'utf8')) }]));
const translations = createInstance();
await translations.init({ lng: 'en', resources, interpolation: { escapeValue: false } });
for (const lang of ['en', 'zh']) {
  await translations.changeLanguage(lang);
  for (const year of [2026, 2027, 2030]) {
    const sections = translations.t('inspirations.sections', { returnObjects: true, yearsSince2022: year - 2022 });
    const note = sections.albums.items.find(item => item.label === 'Nurture').note;
    assert.ok(note.includes(String(year - 2022)), `${lang}: Nurture follows the current calendar year`);
    assert.ok(!note.includes('{{'), `${lang}: nested album notes interpolate correctly`);
  }
}
console.log('PASS: Nurture resolves its 2022 memory in both languages for 2026, 2027, and 2030.');
