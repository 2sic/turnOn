import { windowName } from '..';

export class ExistsProgress {
  constructor(
    public success: boolean,
    public result: unknown,
    public parts: number,
    public partsFound: number,
    public matchedKey?: string,
  ) { }

  static test(key: string): ExistsProgress {
    if(!key) return new ExistsProgress(true, null, 0, 0);

    const parts = key.split('.');
    if(parts[0] !== windowName) throw `Key must start with '${windowName}.' but it's '${key}'`;

    // Only contains window
    if (parts.length == 1) return new ExistsProgress(true, null, 1, 1);

    let current = window as any;
    let match = windowName;
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      current = current[part];
      // found, so let's add to list of successful matches
      match += '.' + part;

      // if node not found, stop checking
      if (!current) return new ExistsProgress(false, null, parts.length, i, match);
    }
    return new ExistsProgress(true, current, parts.length, parts.length);
  }
}