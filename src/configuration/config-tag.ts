import { TurnOnConfigurationStable } from '.';
import { attrConfig, attrSkip } from '..';
import { log } from '../debug';


export class ConfigTag {

  constructor(
    public tag: HTMLElement,
    public config: TurnOnConfigurationStable
  ) 
  { }

  syncDom() {
    log('syncDom', this);
    const tag = this.tag;
    // set skip if missing and update json in html if not current
    // Do these checks to avoid to many DOM changes
    if(!tag.getAttribute(attrSkip)) tag.setAttribute(attrSkip, "skip");
    const currentSerialized = JSON.stringify(this.config);
    if(tag.getAttribute(attrConfig) !== currentSerialized)
      tag.setAttribute(attrConfig, currentSerialized);
  }

}