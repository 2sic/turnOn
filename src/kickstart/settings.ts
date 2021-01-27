
export class Settings {
  /** the polling interval - defaults to 100 */
  interval: number = 100;

  /** polling attempts, defaults to 100 */
  attempts: number = 10; // 100;

  /** if it should fail silently, defaults to false */
  silent: boolean = false;

  /** The name of this kickstart - to better track issues */
  name: string = 'kickstart';
}

export const DefaultSettings = new Settings();