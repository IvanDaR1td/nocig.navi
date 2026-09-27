const key = 'nocig:archive-intro:v2';
export function hasEnteredArchive() {
  try { return sessionStorage.getItem(key) === 'entered'; } catch { return false; }
}
export function rememberArchiveEntry() {
  try { sessionStorage.setItem(key, 'entered'); } catch { /* Storage restrictions never prevent entry. */ }
}
