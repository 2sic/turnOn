import { TurnOnConfiguration, TurnOnProgres } from '../configuration';
import { attrConfig, attrSkip } from '..';
import { log } from '../debug';
import { TurnOn } from '../turnOn/turn-on';
import { ProgressError } from '../configuration/configuration';


export class ConfigTag {

  constructor(
    public tag: HTMLElement,
    public config: TurnOnConfiguration,
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

  error(message: string): void {
    this.config.progress = ProgressError;
    this.config.error = message;
    this.syncDom();
    throw this.config.error;
  }
}