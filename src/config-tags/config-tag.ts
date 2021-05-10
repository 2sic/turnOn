import { TurnOnConfigurationStable, TurnOnProgres } from '../configuration';
import { attrConfig, attrSkip } from '..';
import { log } from '../debug';
import { TurnOn } from '../turnOn/turn-on';


export class ConfigTag {

  constructor(
    public tag: HTMLElement,
    public config: TurnOnConfigurationStable,
    public turnOn?: TurnOn
  ) 
  { 
    this.syncDom();
  }

  syncDom(): void {
    log('syncDom', this);
    const tag = this.tag;
    // set skip if missing and update json in html if not current
    // Do these checks to avoid to many DOM changes
    if(!tag.getAttribute(attrSkip)) tag.setAttribute(attrSkip, "skip");
    const currentSerialized = JSON.stringify(this.config);
    if(tag.getAttribute(attrConfig) !== currentSerialized)
      tag.setAttribute(attrConfig, currentSerialized);
  }

  progress(prog: TurnOnProgres): void {
    this.config.progress = prog;
    this.syncDom();
  }

  error(err: string): void {
    this.config.progress = '9-failed';
    this.config.error = err;
    this.syncDom();
    throw this.config.error;
  }
}