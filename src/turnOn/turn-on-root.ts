import { ConfigTagManager } from '../tags/config-tag-manager';
import { TagLoader } from '../tags/tag-loader';
import { Settings } from './settings';
import { TurnOn } from './turn-on';

export class TurnOnRoot {
  
  tagManager: ConfigTagManager;

  loader: TagLoader;

  constructor()
  {
    this.tagManager = new ConfigTagManager(this);
    this.loader = new TagLoader(this.tagManager);
    console.log('turnOn v0.3.0 active. It helps boot scripts when ready. Set window.debugTurnOn = true for debugging. https://go.2sxc.org/turnon')
  }

  /**
   * Create a new turnOn object.
   * Mainly useful in global scenarios, to give it a separate name
   */
  new(nameOrSettings?: Partial<Settings>): TurnOn {
    return new TurnOn(nameOrSettings);
  }

  /**
   * Basic debug
   * @param args 
   */
  dump(...args: any): void {
    console.log(`turnOn dump() - total args: ${args?.length} - args dump:`, args);
  }
}