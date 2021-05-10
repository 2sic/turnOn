import { ConfigTagManager, log } from '..';
import { TurnOnRoot } from '../turnOn';

/**
 * Options for the observer (which mutations to observe)
 */
const config : MutationObserverInit = { 
  attributes: false, 
  childList: true, 
  subtree: true 
};

/**
 * In charge of loading all turn-on tags from the DOM, both at first load as well as on DOM changes
 */
export class TurnOnLoader {

  constructor(public root: TurnOnRoot, public tagManager: ConfigTagManager) {
    this.scanExistingDom();
  }

  public scanExistingDom(): void {
    log('scanExistingDom');
    const tags = document.querySelectorAll(`[turn-on]`);
    log('tags:', tags);
    tags.forEach((t: HTMLElement) => this.tagManager.tryToLoadTag(t));
  }

  public activateObserver(): void {
    log('load');
  
    const observer = new MutationObserver((mutations) => {
      log('turnOn mutation');
      // Loop through each changed item, check if it's something we want to initialize
      mutations.forEach((m) => {
        // Nodes added - let's check if it is a turn-on
        if(m.type != 'childList') return;
        log('hit children');

        m.addedNodes.forEach((node: HTMLElement) => this.tagManager.tryToLoadTag(node));
      });
    });
  
    // observe document for tags which include this. ATM don't observe header
    observer.observe(document.documentElement, config);
  }

}
