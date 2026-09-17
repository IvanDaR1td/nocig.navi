import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const en = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/zh.json'), 'utf8'));
const errors = [];
let strings = 0;
const tokens = value => [...value.matchAll(/{{\s*([^}]+)\s*}}/g)].map(match => match[1].trim()).sort().join('|');
function compare(a, b, key = '') {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) { errors.push(key + ': type mismatch'); return; }
  if (typeof a === 'string') {
    strings += 1;
    if ((!a.trim() || !b.trim()) && !(/^notfound\.dir\.\d+$/.test(key) && a === '' && b === '')) errors.push(key + ': empty string');
    if (tokens(a) !== tokens(b)) errors.push(key + ': interpolation mismatch');
    return;
  }
  if (a && typeof a === 'object') {
    const ka = Object.keys(a), kb = Object.keys(b);
    for (const child of new Set([...ka, ...kb])) {
      const next = key ? key + '.' + child : child;
      if (!(child in a) || !(child in b)) errors.push(next + ': missing locale key');
      else compare(a[child], b[child], next);
    }
  }
}
compare(en, zh);
const get = (obj, key) => key.split('.').reduce((value, part) => value?.[part], obj);
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (/\.tsx?$/.test(file) && !file.endsWith('.d.ts')) {
      const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
      const report = (node, message) => errors.push(path.relative(root, file) + ':' + (source.getLineAndCharacterOfPosition(node.pos).line + 1) + ': ' + message);
      function visit(node) {
        if (ts.isJsxText(node) && /[A-Za-z\u3400-\u9fff]/.test(node.text.replace(/&(?:gt|lt|amp|nbsp|#\d+);/g, ''))) report(node, 'literal JSX text: ' + node.text.trim());
        if (ts.isJsxAttribute(node) && ['alt', 'title', 'placeholder', 'aria-label'].includes(node.name.text) && node.initializer && ts.isStringLiteral(node.initializer) && node.initializer.text) report(node, 'untranslated attribute: ' + node.name.text);
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't' && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
          if (get(en, node.arguments[0].text) === undefined) report(node, 'unknown translation key: ' + node.arguments[0].text);
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
}
scan(path.join(root, 'src'));
// Validate the editable photo catalogue without executing user-authored modules.
const catalogue = ts.createSourceFile('photography.ts', fs.readFileSync(path.join(root, 'src/content/photography.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
const photoIds = new Set();
function checkCatalogue(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'photographs' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
    for (const element of node.initializer.elements) {
      if (!ts.isObjectLiteralExpression(element)) { errors.push('Photo catalogue entries must be object literals.'); continue; }
      const values = {};
      for (const prop of element.properties) if (ts.isPropertyAssignment(prop) && (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name))) {
        if (ts.isStringLiteral(prop.initializer)) values[prop.name.text] = prop.initializer.text;
        if (ts.isNumericLiteral(prop.initializer)) values[prop.name.text] = Number(prop.initializer.text);
      }
      if (typeof values.id !== 'string' || photoIds.has(values.id)) errors.push('Missing or duplicate photograph id.');
      photoIds.add(values.id);
      if (!Number.isInteger(values.width) || !Number.isInteger(values.height) || values.width <= 0 || values.height <= 0) errors.push('Invalid photograph dimensions: ' + values.id);
      for (const [lang, locale] of Object.entries({ en, zh })) for (const field of ['title', 'caption', 'alt']) {
        const value = get(locale, 'photography.items.' + values.id + '.' + field);
        if (typeof value !== 'string' || !value.trim()) errors.push(lang + ': missing photograph ' + values.id + '.' + field);
      }
      if (typeof values.src !== 'string') errors.push('Missing photograph path: ' + values.id);
      else if (!/^https?:\/\//i.test(values.src)) {
        if (values.src.startsWith('/') || values.src.startsWith('public/') || values.src.split('/').includes('..')) errors.push('Use a safe public-relative photograph path: ' + values.src);
        else if (!fs.existsSync(path.join(root, 'public', values.src))) errors.push('Photograph file not found: ' + values.src);
      }
    }
  }
  ts.forEachChild(node, checkCatalogue);
}
checkCatalogue(catalogue);
for (const locale of [en, zh]) {
  if (locale.projects.items.length !== 5) errors.push('Expected five project entries.');
  if (locale.inspirations.sections.music.items.length !== 7) errors.push('Expected seven musicians.');
  if (/\bI\b/.test(locale.about.values.join(' '))) errors.push('Profile values should not use first-person I.');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('PASS: ' + strings + ' bilingual strings; key shapes and interpolation match; JSX text and accessible labels localized.');
