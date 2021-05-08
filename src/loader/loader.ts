import { ConfigTag, loadConfigurationFromString } from '../configuration';
import { TurnOnConfigurationStable } from '../configuration/configuration';
import { attrConfig, attrSkip, log } from '..';

/**
 * Options for the observer (which mutations to observe)
 */
const config : MutationObserverInit = { 
  attributes: false, 
  childList: true, 
  subtree: true 
};

class TurnOnObserver {

  public tags = new Array<ConfigTag>();

  public load() {
    log('load');
  
    const observer = new MutationObserver((mutations) => {
      log('turnOn mutation');
      // Loop through each changed item, check if it's something we want to initialize
      mutations.forEach((m) => {
        // Nodes added - let's check if it is a turn-on
        if(m.type != 'childList') return;
        log('hit children');

        m.addedNodes.forEach((node: HTMLElement) => {
          // Get config and skip if not relevant, or skip if already marked as in the queue
          const attr = node?.getAttribute?.(attrConfig);
          if(!attr) return;
          const skip = node?.getAttribute?.(attrSkip);
          log(skip);
          if(skip) return log('skip');

          log('attr', attr);
          const configOrError = loadConfigurationFromString(attr);
          if(typeof(configOrError) === 'string') {
            console.error(configOrError, node, attr);
            return;
          }
          log('stable config')
          this.add(node, configOrError);
        });
      });
      this.updateTags();
    });
  
    // observe document for tags which include this. ATM don't observe header
    observer.observe(document.documentElement, config);
  }

  add(node: HTMLElement, config: TurnOnConfigurationStable){
    log('add', node, config);
    this.tags.push(new ConfigTag(node, config));
  }


  updateTags() {
    log(`updateTags: ${this.tags.length}`);
    this.tags.forEach((t) => t.syncDom())
  }
}

export const turnOnObserver = new TurnOnObserver();