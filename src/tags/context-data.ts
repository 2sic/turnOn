import { TurnOnConfigInternal } from '../configuration/configuration';

/**
 * Data passed as the second parameter of the `run` function.
 */
export interface ContextData {
  tag: HTMLElement;
  config: TurnOnConfigInternal
}