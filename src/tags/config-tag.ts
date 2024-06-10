import { log } from '../debug';
import { TurnOn } from '../turnOn/turn-on';
import { ProgressError, TurnOnConfigInternal, TurnOnProgress } from '../configuration/configuration';
import { AttributeSkip, AttributeTurnOn } from '../constants';


export class ConfigTag {

  constructor(
    public tag: HTMLElement,
    public config: TurnOnConfigInternal,
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
    if(!tag.getAttribute(AttributeSkip)) tag.setAttribute(AttributeSkip, "skip");
    const currentSerialized = JSON.stringify(this.config);
    if(tag.getAttribute(AttributeTurnOn) !== currentSerialized)
      tag.setAttribute(AttributeTurnOn, currentSerialized);
  }

  progress(prog: TurnOnProgress): void {
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