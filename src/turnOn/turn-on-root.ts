import { Settings, TurnOn } from '.';
import { TagLoader } from '..';
import { ConfigTagManager } from '../tags/config-tag-manager';

export class TurnOnRoot {
  
  tagManager: ConfigTagManager;

  loader: TagLoader;

  constructor()
  {
    this.tagManager = new ConfigTagManager(this);
    this.loader = new TagLoader(this.tagManager);
    console.log('turnOn v0.3.0 active - it will help boot scripts when ready - set window.debugTurnOn = true for debugging')
  }

  /**
   * Create a new turnOn object.
   * Mainly useful in global scenarios, to give it a separate name
   */
  new(nameOrSettings?: Partial<Settings>): TurnOn {
    return new TurnOn(nameOrSettings);
  }
}