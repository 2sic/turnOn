import { ConfigTag, loadConfigurationFromString, TurnOnConfigurationStable } from '.';
import { attrConfig, attrSkip, log } from '..';
import { TurnOnRoot } from '../turnOn';

export class ConfigTagManager {
  
  public tags = new Array<ConfigTag>();

  constructor(public root: TurnOnRoot) {
    
  }


  tryToLoadTag(node: HTMLElement): void {
    // Get config and skip if not relevant, or skip if already marked as in the queue
    const attr = node?.getAttribute?.(attrConfig);
    if(!attr) return;
    const skip = node?.getAttribute?.(attrSkip);
    log('skip', skip);
    if(skip) return log('skip');

    log('attr', attr);
    const configOrError = loadConfigurationFromString(attr);
    if(typeof(configOrError) === 'string') {
      console.error(configOrError, node, attr);
      return;
    }
    log('stable config')
    this.add(node, configOrError);
  }
  
  add(node: HTMLElement, config: TurnOnConfigurationStable): void {
    log('add', node, config);
    this.tags.push(new ConfigTag(node, config));
  }


  updateTags(): void {
    log(`updateTags: ${this.tags.length}`);
    this.tags.forEach((t) => t.syncDom())
  }

}