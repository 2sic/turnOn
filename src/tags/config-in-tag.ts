import { AddContextLocation } from '../configuration/configuration';
import { Settings } from '../turnOn/settings';

/**
 * Configuration for a turn-on, the way it's added from the public API.
 */
export interface TurnOnConfiguration {
  /**
   * Things to wait for - till v0.1.2 - deprecated
   * @deprecated in v0.2 - use `require` instead
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

  /** 
   * Optional: data to give the function once it starts
   * 
   * If provided together with `args`, then this will be the first argument.
   */
  data?: unknown;

  /**
   * Optional: data as args for the function
   * New in v0.3.0.
   * 
   * When provided together with `data`, data will be prepended.
   */
  args?: unknown[];

  settings?: Partial<Settings>;

  addContext?: AddContextLocation;
}
