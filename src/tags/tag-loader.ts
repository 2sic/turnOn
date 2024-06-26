import { AttributeSkip, AttributeTurnOn } from '../constants';
import { log } from '../debug';
import { ConfigTagManager } from './config-tag-manager';

/** Query to find all tags that are not processed yet; processed will be marked with turn-on-skip */
const queryForUnprocessedTags = `[${AttributeTurnOn}]:not([${AttributeSkip}])`;

const ELEMENT_NODE = 1; // see https://developer.mozilla.org/en-US/docs/Web/API/Node

/**
 * In charge of loading all turn-on tags from the DOM, both at first load as well as on DOM changes
 */
export class TagLoader {
  /** Options for the observer (which mutations to observe) */
  private config: MutationObserverInit = {
    attributes: false,
    childList: true,
    subtree: true,
  };

  /** The observer, in case we need to debug */
  public observer: MutationObserver;

  constructor(public tagManager: ConfigTagManager) {
    this.scanInitialDom();
    this.activateObserver();
  }

  /** Scan initial dom */
  private scanInitialDom(): void {
    log('scanInitialDom');
    if (document.documentElement)
      this.checkAndLoadChildren(document.documentElement);
  }

  private checkAndLoadChildren(parent: HTMLElement) {
    log('checkAndLoadChildren', parent);
    if (!parent?.children?.length) return;
    const tags = parent.querySelectorAll(queryForUnprocessedTags);
    tags.forEach((t: HTMLElement) => this.tagManager.tryToLoadTag(t));
  }

  public activateObserver(): void {
    log('activateObserver');

    this.observer = new MutationObserver((mutations) => {
      // const additions = true;
      // const changes = (window as any).turnOnWatchChanges ?? false;
      // log(`mutations detected, processing additions=${additions} and window.turnOnWatchChanges=${changes}`, mutations);
      log(`mutations detected`, mutations);

      // Loop through each changed item, check if it's something we want to initialize
      mutations.forEach((m) => {
        // Nodes added - let's check if it is a turn-on
        if (m.type != 'childList') return;
        log('childList changes');

        // if (additions)
        Array.from(m.addedNodes)
          // nodes can contain text and stuff as well, so we must filter first
          .filter((n) => n.nodeType === ELEMENT_NODE)
          .forEach((node: HTMLElement) => {
            if (node?.getAttribute?.(AttributeTurnOn))
              this.tagManager.tryToLoadTag(node);
            else this.checkAndLoadChildren(node);
          });

        // if (changes)
        //   Array.from(m.addedNodes)
        //     // nodes can contain text and stuff as well, so we must filter first
        //     .filter((n) => n.nodeType === ELEMENT_NODE)
        //     .forEach((node: HTMLElement) => {
        //       if (node?.getAttribute?.(AttributeTurnOn))
        //         this.tagManager.tryToLoadTag(node);
        //       else this.checkAndLoadChildren(node);
        //     });
      });
    });

    // observe document for tags which include this. ATM don't observe header
    this.observer.observe(document.documentElement, this.config);
  }
}
