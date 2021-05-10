import { Condition, ExistsProgress } from '.';
import { Status, windowName } from '..';

/**
 * Create a checker which verifies if a key or key-sequence on window exists
 */
export function createNameCondition(key: string): Condition {
  // empty-ish strings - always say it's done
  if (!key) return () => new Status(true, 'empty key', key);
  if (key === windowName) return () => new Status(true, 'no keys except maybe windows found', key);

  return () => {
    const exists = ExistsProgress.test(key);
    if(exists.success) return new Status(true, 'all keys matched', key, exists.result);
    return new Status(false, `Not all keys matched yet. So far '${exists.matchedKey}' worked.`, key);
  }
}