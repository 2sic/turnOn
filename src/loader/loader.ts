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

  constructor() {
    this.scanExistingDom();
  }

  public tags = new Array<ConfigTag>();

  public scanExistingDom() {
    log('scanExistingDom');
    const tags = document.querySelectorAll(`[turn-on]`);
    log('tags:', tags);
    tags.forEach((t: HTMLElement) => this.tryToLoadTag(t));
  }

  public activateObserver() {
    log('load');
  
    const observer = new MutationObserver((mutations) => {
      log('turnOn mutation');
      // Loop through each changed item, check if it's something we want to initialize
      mutations.forEach((m) => {
        // Nodes added - let's check if it is a turn-on
        if(m.type != 'childList') return;
        log('hit children');

        m.addedNodes.forEach((node: HTMLElement) => this.tryToLoadTag(node));
      });
    });
  
    // observe document for tags which include this. ATM don't observe header
    observer.observe(document.documentElement, config);
  }

  tryToLoadTag(node: HTMLElement) {
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

  add(node: HTMLElement, config: TurnOnConfigurationStable) {
    log('add', node, config);
    this.tags.push(new ConfigTag(node, config));
  }


  updateTags() {
    log(`updateTags: ${this.tags.length}`);
    this.tags.forEach((t) => t.syncDom())
  }
}

// Ensure it's only loaded once
const winAny = window as any;
if(!winAny.$turnOn) winAny.$turnOn = new TurnOnObserver();
export const turnOnObserver = winAny.$turnOn;
