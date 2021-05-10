import { TurnOnProgres } from '../configuration';

export interface TurnOnConfigurationRaw {
  /** Things to wait for */
  await?: string | string[];

  /** What to run when everything is available */
  run: string;

  progress?: TurnOnProgres;

  data?: unknown;
}
