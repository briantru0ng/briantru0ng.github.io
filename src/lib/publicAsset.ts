import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * True when a root-relative path (e.g. "/images/foo.jpg") exists in /public.
 * Used at build time so missing images render a placeholder instead of a broken icon.
 * Note: on Windows the check is case-insensitive; production (Linux) is not.
 */
export function publicAssetExists(path?: string): path is string {
  if (!path || !path.startsWith('/')) return false;
  return existsSync(join(process.cwd(), 'public', decodeURI(path)));
}
