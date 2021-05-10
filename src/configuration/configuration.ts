export const Progress1Loaded = '1-loaded';
export const Progress2Watching = '2-watching';
export const Progress3Running = '3-running';
export const Progress4Completed = '4-completed';
export const Progress9Cancelled = '9-cancelled';
export const ProgressError = '9-error';

export type TurnOnProgres = typeof Progress1Loaded | typeof Progress2Watching  | typeof Progress3Running | typeof Progress4Completed | typeof Progress9Cancelled | typeof ProgressError ;

export interface TurnOnConfiguration {
  await: string[];

  run: string;

  progress: TurnOnProgres;

  error?: string;

  data?: unknown;
}
