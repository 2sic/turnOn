import { Condition, ExistsProgress } from '.';
import { Status, windowName } from '..';

const statusType = 'window-key';

/**
 * Create a checker which verifies if a key or key-sequence on window exists
 */
export function createNameCondition(key: string): Condition {
  // empty-ish strings - always say it's done
  if (!key) return () => new Status(statusType, true, 'empty key', key);
  if (key === windowName) return () => new Status(statusType, true, 'no keys except maybe windows found', key);

  return () => {
    const exists = ExistsProgress.test(key);
    if(exists.success) return new Status(statusType, true, 'all keys matched', key, exists.result);
    return new Status(statusType, false, `Not all keys matched yet. So far '${exists.matchedKey}' worked.`, key);
  }
}