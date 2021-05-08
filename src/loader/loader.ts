import { TurnOnConfigurationRaw, TurnOnConfigurationStable, stabilizeConfiguration } from '../configuration/configuration';

export const turnOnAttributeName = 'turn-on';

/**
 * Options for the observer (which mutations to observe)
 */
const config : MutationObserverInit = { 
  attributes: false, 
  childList: true, 
  subtree: true 
};

const debug = true;


class TurnOnObserver {


  public load() {
    if(debug) console.log('load');
  
    const observer = new MutationObserver((mutations) => {
      // console.log('turnOn mutation');
      // Loop through each changed item, check if it's something we want to initialize
      mutations.forEach((m) => {
        // Nodes added - let's check if it is a turn-on
        if(m.type != 'childList') return;
        if(debug) console.log('hit children');

        m.addedNodes.forEach((node: HTMLElement) => {
          const attr = node?.getAttribute?.(turnOnAttributeName);
          if(!attr) return;
          if(debug) console.log('attr', attr);
          const configOrError = this.loadConfigurationFromAttribute(attr);
          if(typeof(configOrError) === 'string')
            console.error(configOrError, node, attr);


          // let pretyped: TurnOnConfigurationRaw;
          // try {
          //   pretyped = JSON.parse(attr);
          // }
          // catch (ex) {
          //   console.error(`turnOn detected configuration but cannot parse to json. Source: `, node, attr);
          //   return;
          // }
          // let configuration: TurnOnConfigurationStable;
          // try {
          //   configuration = stabilizeConfiguration(pretyped);
          // }
          // catch (ex) { configuration = null; }

          // if(configuration == null) {
          //   console.error(`turnOn loaded configuration but couldn't make sense of it. Source: `, node, pretyped);
          //   return;
          // }
        });
      });
    });
  
    // observe document
    observer.observe(document.documentElement, config);
    
    // observe header?
  
  }

  private loadConfigurationFromAttribute(attr: string): TurnOnConfigurationStable | string {
    if(debug) console.log('attr', attr);
    let pretyped: TurnOnConfigurationRaw;
    try {
      pretyped = JSON.parse(attr);
    }
    catch (ex) {
      // console.error(`turnOn detected configuration but cannot parse to json. Source: `, node, attr);
      return `turnOn detected configuration but cannot parse to json.`;
    }
    let configuration: TurnOnConfigurationStable;
    try {
      configuration = stabilizeConfiguration(pretyped);
    }
    catch (ex) { configuration = null; }

    if(configuration == null) {
      return `turnOn loaded configuration but couldn't make sense of it.`;
      // console.error(`turnOn loaded configuration but couldn't make sense of it. Source: `, node, pretyped);
      // return;
    }
    return configuration;
  }

}

export const turnOnObserver = new TurnOnObserver();