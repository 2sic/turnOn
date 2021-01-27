import { StringOrFn } from '.';
import { Status } from './status';


export class ConditionMaker {

  public generate(condition: StringOrFn): () => Status {
    if (typeof(condition) === 'function')
      return this.fnChecker(condition);
    
    if (typeof(condition) === 'string')
      return this.keyChecker(condition);
  }


  fnChecker(fn: () => boolean): () => Status {
    return () => { return {
        ready: fn(),
        message: ''
      } as Status;
    }
  }

  /**
   * Create a checker which verifies if a key or key-sequence on window exists
   * @param key 
   */
  keyChecker(key: string): () => Status {
    const alwaysTrue = () => true;
    // empty-ish strings - always say it's done
    if (!key) return () => Status.create(true, 'empty key');

    const parts = key.split('.');
    if (parts.length > 0 && parts[0] == 'window')
      parts.shift();

    if (parts.length == 0) return () => Status.create(true, 'no keys except maybe windows found');

    return () => {
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
        if (i == parts.length - 1) return Status.create(true, 'all keys matched'); 
      }
      return Status.create(false, `Not all keys matched yet. So far '${match}' worked.`);
    }
  }
}