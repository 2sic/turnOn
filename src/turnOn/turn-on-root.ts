import { TurnOn } from '.';
import { TurnOnLoader } from '..';
import { ConfigTagManager } from '../config-tags/config-tag-manager';

export class TurnOnRoot extends TurnOn {
  
  tagManager: ConfigTagManager;

  loader: TurnOnLoader;

  constructor()
  {
    super();
    this.tagManager = new ConfigTagManager(this);
    this.loader = new TurnOnLoader(this, this.tagManager);
  }

}