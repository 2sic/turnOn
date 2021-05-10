import { Condition, ConditionRaw } from '.';
import { Status } from '../status/status';

/**
 * Internal class to generate is-it-ready checkers
 */
export class ConditionMaker {

  /**
   * Make a new condition checker
   */
  public make(condition: ConditionRaw): Condition {
    if (typeof(condition) === 'function')
      return this.fnChecker(condition);
    
    if (typeof(condition) === 'string')
      return this.keyChecker(condition);

  }


  fnChecker(fn: () => boolean): Condition {
    let name = fn.toString();
    if (name && name.length > 25) name = name.substr(0, 25);
    return () => { 
      return {
        name,
        ready: fn(),
        message: ''
      } as Status;
    }
  }

  /**
   * Create a checker which verifies if a key or key-sequence on window exists
   * @param key 
   */
  keyChecker(key: string): Condition {
    // empty-ish strings - always say it's done
    if (!key) return () => new Status(true, 'empty key', key);

    const parts = key.split('.');
    if (parts.length > 0 && parts[0] == 'window')
      parts.shift();

    if (parts.length == 0) return () => new Status(true, 'no keys except maybe windows found', key);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parent = window as any;
      let match = 'window';
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        parent = parent[part];
        // if node not found, stop checking
        if (!parent) break;

        // found, so let's add to list of successful matches
        match += '.' + part;

        // if we got to the end, it's good
        if (i == parts.length - 1) return new Status(true, 'all keys matched', key); 
      }
      return new Status(false, `Not all keys matched yet. So far '${match}' worked.`, key);
    }
  }
}