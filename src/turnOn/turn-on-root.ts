import { Settings, TurnOn } from '.';
import { TurnOnLoader } from '..';
import { ConfigTagManager } from '../config-tags/config-tag-manager';

export class TurnOnRoot {
  
  tagManager: ConfigTagManager;

  loader: TurnOnLoader;

  constructor()
  {
    this.tagManager = new ConfigTagManager(this);
    this.loader = new TurnOnLoader(this, this.tagManager);
  }

  /**
   * Create a new turnOn object.
   * Mainly usefuly in global scenarios, to give it a separate name
   */
  new(nameOrSettings?: Partial<Settings>): TurnOn {
    return new TurnOn(nameOrSettings);
  }
}