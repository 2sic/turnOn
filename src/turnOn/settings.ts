
// this must be a simple const, otherwise the anotation below with typeof won't work
// https://stackoverflow.com/questions/56263200/how-to-define-string-literal-union-type-from-constants-in-typescript
export const LogError = 'error';
export const LogDebug = 'debug';
export const LogSilent = 'silent';

export const FailSilent = 'silent';
export const FailResolve = 'resolve';
export const FailReject = 'reject';

export class Settings {
  /** the polling interval - defaults to 100 */
  interval: number = 100;

  /** polling attempts, defaults to 100 */
  attempts: number = 50; // 100;
 
  /** What to log into the console */
  log: typeof LogError | typeof LogDebug | typeof LogSilent = LogError;

  /**
   * Failure mode, if by timeout it's not successful
   * - reject (default)= use promise reject (which will throw an error if not handled)
   * - resolve = use promise resolve and give a status back which says it's not complete
   * - silent = don't complete the promise
   */
  failure: typeof FailReject | typeof FailResolve | typeof FailSilent = FailReject;

  /** The name of this turnOn - to better track issues */
  name: string = 'turnOn';
}

export const DefaultSettings = new Settings();