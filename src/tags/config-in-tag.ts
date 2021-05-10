import { TurnOnProgres } from '../configuration';
import { Settings } from '../turnOn/settings';

export interface TurnOnConfigurationRaw {
  /** Things to wait for */
  await?: string | string[];

  /** Debug what's happening */
  debug?: boolean;

  /** What to run when everything is available */
  run: string;

  progress?: TurnOnProgres;

  data?: unknown;

  settings?: Partial<Settings>
}
