import { TurnOnConfigurationStable } from '../configuration';
import { attrConfig, attrSkip, log } from '..';
import { TurnOnRoot } from '../turnOn';
import { ConfigTag, loadConfigurationFromString } from '.';

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
  
  /**
   * 
   */
  add(node: HTMLElement, config: TurnOnConfigurationStable): void {
    log('add', node, config);
    const tag = new ConfigTag(node, config);
    this.tags.push(tag);
    this.convertConfigToTurnOn(tag);
  }

  private convertConfigToTurnOn(tag: ConfigTag) {
    const config = tag.config;
    log('convert to turnon');
    const turnOn = this.root.new().await(config.await);
    tag.progress('2-watching');

    turnOn.then(() => {
      let key = config.run;
      log('turn on success - will try to run ' + key);
      tag.progress('3-running');
      if(!key.endsWith('()')) 
        tag.error(`run should end with () but doesn't - can't continue`);

      key = key.substr(0, key.length - 2);
      const parts = key.split('.');
      if (parts.length > 0 && parts[0] == 'window')
        parts.shift();
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current = window as any;
      let match = 'window';
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        current = current[part];
        // found, so let's add to list of successful matches
        match += '.' + part;

        // if node not found, stop checking
        if (!current) tag.error(`Tried to find object parts for ${match} but didn't get anything.`);
      }
      if(typeof(current) != 'function') tag.error(`Got ${match} but it's not a function`);

      // now run it!
      current();
      tag.progress('4-completed');
      
    });
    return turnOn;
  }


  updateTags(): void {
    log(`updateTags: ${this.tags.length}`);
    this.tags.forEach((t) => t.syncDom())
  }

}