import { WindowName } from '../constants';


/**
 * Internal Class which will check if a object path like `window.something.other` exists and report back how much of it works.
 */
export class ExistsProgress {
  constructor(
    /** true/false if it succeeded till the end */
    public success: boolean,

    /** resulting object or method it would call */
    public result: unknown,

    /** The parent of the resulting object - in case the result was a method which needs to be rebound */
    public parent: unknown,

    /** name of the last element found - important if the last thing is a function*/
    public lastName: string,

    /** Amount of parts in the full identifier */
    public parts: number,

    /** Amount of parts found */
    public partsFound: number,

    /** Part-path which already worked */
    public matchedKey: string,
  ) { }

  static test(key: string): ExistsProgress {
    if(!key) return new ExistsProgress(true, null, null, null, 0, 0, "");

    const parts = key.split('.');
    if(parts[0] !== WindowName) throw `Key must start with '${WindowName}.' but it's '${key}'`;

    // Only contains window, stop here
    if (parts.length == 1) return new ExistsProgress(true, window, null, WindowName, 1, 1, WindowName);

    let current = window as any;
    let parent = null as any;
    let match = WindowName;
    let partName: string;
    for (let i = 1; i < parts.length; i++) {
      partName = parts[i];
      parent = current;
      current = current[partName];
      // found, so let's add to list of successful matches
      match += '.' + partName;

      // if node not found, stop checking
      if (!current) return new ExistsProgress(false, null, parent, partName, parts.length, i, match);
    }
    return new ExistsProgress(true, current, parent, partName, parts.length, parts.length, match);
  }
}