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
    for (const child of new Set([...Object.keys(a), ...Object.keys(b)])) {
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
        if (ts.isJsxText(node)) {
          const literal = node.text.replace(/&(?:gt|lt|amp|nbsp|#\d+);/g, '').trim();
          const intentionalIdentity = new Set(['IVAN', 'CHAN', 'Ivan', 'Chan', 'Ivan Chan']);
          if (/[A-Za-z\u3400-\u9fff]/.test(literal) && !intentionalIdentity.has(literal)) report(node, 'literal JSX text: ' + literal);
        }
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

const catalogue = ts.createSourceFile('photography.ts', fs.readFileSync(path.join(root, 'src/content/photography.ts'), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
function prop(object, name) {
  return object.properties.find(p => ts.isPropertyAssignment(p) && ((ts.isIdentifier(p.name) && p.name.text === name) || (ts.isStringLiteral(p.name) && p.name.text === name)));
}
function localizedObject(object, field, id) {
  const p = prop(object, field);
  if (!p || !ts.isPropertyAssignment(p) || !ts.isObjectLiteralExpression(p.initializer)) { errors.push(`Photograph ${id}: invalid ${field}.`); return; }
  for (const lang of ['en', 'zh']) {
    const lp = prop(p.initializer, lang);
    if (!lp || !ts.isPropertyAssignment(lp) || !ts.isStringLiteral(lp.initializer) || !lp.initializer.text.trim()) errors.push(`Photograph ${id}: missing ${field}.${lang}.`);
  }
}
function checkCatalogue(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'photographs' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
    const ids = new Set();
    for (const element of node.initializer.elements) {
      if (!ts.isObjectLiteralExpression(element)) { errors.push('Photo catalogue entries must be object literals.'); continue; }
      const idp = prop(element, 'id');
      const srcp = prop(element, 'src');
      const wp = prop(element, 'width');
      const hp = prop(element, 'height');
      const id = idp && ts.isPropertyAssignment(idp) && ts.isStringLiteral(idp.initializer) ? idp.initializer.text : '';
      const src = srcp && ts.isPropertyAssignment(srcp) && ts.isStringLiteral(srcp.initializer) ? srcp.initializer.text : '';
      const width = wp && ts.isPropertyAssignment(wp) && ts.isNumericLiteral(wp.initializer) ? Number(wp.initializer.text) : 0;
      const height = hp && ts.isPropertyAssignment(hp) && ts.isNumericLiteral(hp.initializer) ? Number(hp.initializer.text) : 0;
      if (!id || ids.has(id)) errors.push('Missing or duplicate photograph id.');
      ids.add(id);
      if (!(width > 0 && height > 0)) errors.push('Invalid photograph dimensions: ' + id);
      if (!src) errors.push('Missing photograph path: ' + id);
      else if (!/^https?:\/\//i.test(src) && !fs.existsSync(path.join(root, 'public', src))) errors.push('Photograph file not found: ' + src);
      localizedObject(element, 'title', id);
      localizedObject(element, 'date', id);
      localizedObject(element, 'alt', id);
    }
  }
  ts.forEachChild(node, checkCatalogue);
}
checkCatalogue(catalogue);

for (const locale of [en, zh]) {
  if (locale.projects.items.length !== 5) errors.push('Expected five project entries.');
  if (locale.inspirations.sections.music.items.length !== 8) errors.push('Expected eight musicians.');
  if (locale.inspirations.sections.albums.items.length !== 25) errors.push('Expected twenty-five albums.');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('PASS: ' + strings + ' bilingual strings; source translation keys and photography catalogue validated.');
