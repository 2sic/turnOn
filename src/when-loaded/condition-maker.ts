import { StringOrFn } from '.';


export class ConditionMaker {

  public generate(condition: StringOrFn) {
    if (typeof(condition) === 'function')
      return this.fnChecker(condition);
    
    if (typeof(condition) === 'string')
      return this.keyChecker(condition);
  }


  fnChecker(fn: () => boolean): () => boolean {
    return fn;
  }

  /**
   * Create a checker which verifies if a key or key-sequence on window exists
   * @param key 
   */
  keyChecker(key: string): () => boolean {
    const alwaysTrue = () => true;
    // empty-ish strings - always say it's done
    if (!key) return alwaysTrue;

    const parts = key.split('.');
    if (parts.length > 0 && parts[0] == 'window')
      parts.shift();

    if (parts.length == 0) return alwaysTrue;

    return () => {
      let parent = window as any;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        parent = parent[part];
        // if node not found, stop checking
        if (!parent) break; 

        // if we got to the end, it's good
        if (i == parts.length - 1) return true; 
      }
      return false;
    }
  }
}