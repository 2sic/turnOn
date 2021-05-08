
export type TurnOnProgres = '1-loaded' | '2-watching' | '3-running' | '4-completed' | '9-cancelled' | '9-failed' ;

export interface TurnOnConfigurationRaw {
  /** Things to wait for */
  await?: string | string[];

  /** What to run when everything is available */
  run: string;

  progress?: TurnOnProgres;
}


export interface TurnOnConfigurationStable {
  await: any[];

  run: string;

  progress: TurnOnProgres;
}

export function stabilizeConfiguration(raw: TurnOnConfigurationRaw) {
  if(!raw) return null;

  if(!raw.run) return null;

  const stable: TurnOnConfigurationStable = {
    await: Array.isArray(raw.await) 
        ? raw.await
        : raw.await 
          ? [raw.await]
          : [],
    run: raw.run,
    progress: '1-loaded',
  }
  return stable;
}