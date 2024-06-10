import { TurnOnProgress } from '../configuration/configuration';
import { Settings } from '../turnOn/settings';

export interface TurnOnConfiguration {
  /**
   * Things to wait for - till v0.1.2 - deprecated
   * @deprecated in v0.2
   */
  await?: string | string[];

  /**
   * Things to wait for, new in v0.2.0
   * Replaces `await` as that is a reserved word in C# and can cause trouble
   * 
   * As of now it (or every value if it's an array) must always begin with 'window.'
   */
  require?: string | string[];

  /** 
   * Debug what's happening to the console
   */
  debug?: boolean;

  /** 
   * What to run when everything is available
   */
  run: string;

  progress?: TurnOnProgress;

  data?: unknown;

  settings?: Partial<Settings>
}
