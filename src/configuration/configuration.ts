import { TurnOnConfigurationRaw } from '..';

export type TurnOnProgres = '1-loaded' | '2-watching' | '3-running' | '4-completed' | '9-cancelled' | '9-failed' ;

export interface TurnOnConfigurationStable {
  awaits: string[];

  run: string;

  progress: TurnOnProgres;

  error?: string;
}

export function stabilizeConfiguration(raw: TurnOnConfigurationRaw): TurnOnConfigurationStable {
  if(!raw) return null;

  if(!raw.run) return null;

  const awaits = Array.isArray(raw.await) 
        ? raw.await
        : raw.await 
          ? [raw.await]
          : [];

  // also always await the run command, but without the () as it shouldn't be called to detect if it's ready
  awaits.push(raw.run.endsWith('()') ? raw.run.substring(0, raw.run.length-2) : raw.run);

  const stable: TurnOnConfigurationStable = {
    awaits: awaits,
    run: raw.run,
    progress: '1-loaded',
  }
  return stable;
}