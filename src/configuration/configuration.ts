import { Settings } from '../turnOn/settings';
export const Progress1Loaded = '1-loaded';
export const Progress2Watching = '2-watching';
export const Progress3Running = '3-running';
export const Progress4Completed = '4-completed';
export const Progress9Cancelled = '9-cancelled';
export const ProgressError = '9-error';

export type TurnOnProgress = typeof Progress1Loaded | typeof Progress2Watching  | typeof Progress3Running | typeof Progress4Completed | typeof Progress9Cancelled | typeof ProgressError ;

export interface TurnOnConfigInternal {
  /** Things to wait for - names on window (or sub-objects) or functions on window or sub-objects */
  await: string[];

  /** Special flag to log everything that's happening for extensive debugging */
  debug: boolean;

  /**
   * What to run when all awaits have succeeded. 
   * The system will also wait for this to exist before it runs it. 
   */
  run: string;

  /** Information how far processing of this configuration has commenced */
  progress: TurnOnProgress;

  /** Possible error information */
  error?: string;

  /** Optional data to give the function once it starts */
  data?: unknown;

  /** Settings used for this turn-on */
  settings?: Settings
}
