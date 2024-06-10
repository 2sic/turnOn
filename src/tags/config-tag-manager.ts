import { ConfigHelper } from '../configuration/config-helper';
import { ProgressError, TurnOnConfigInternal } from '../configuration/configuration';
import { AttributeSkip, AttributeTurnOn } from '../constants';
import { ConfigTag } from './config-tag';
import { log } from '../debug';
import { convertConfigToTurnOn } from './config-to-turn-on';
import { TurnOnRoot } from '../turnOn/turn-on-root';


export class ConfigTagManager {
  
  public tags = new Array<ConfigTag>();

  constructor(public root: TurnOnRoot) {}


  tryToLoadTag(node: HTMLElement): void {
    // Get config and skip if not relevant, or skip if already marked as in the queue
    const attr = node?.getAttribute?.(AttributeTurnOn);
    if(!attr) return;
    const skip = node?.getAttribute?.(AttributeSkip);
    log('skip', skip);
    if(skip) return log('skip');

    log('attr', attr);
    const config = ConfigHelper.load(attr);
    if(config.progress === ProgressError) {
      console.error(config.error, node, attr);
      return;
    }
    log('stable config')
    this.add(node, config);
  }
  
  /**
   * 
   */
  add(node: HTMLElement, config: TurnOnConfigInternal): void {
    log('add', node, config);
    const tag = new ConfigTag(node, config);
    this.tags.push(tag);
    convertConfigToTurnOn(this.root, tag);
  }

  updateTags(): void {
    log(`updateTags: ${this.tags.length}`);
    this.tags.forEach((t) => t.syncDom())
  }

}