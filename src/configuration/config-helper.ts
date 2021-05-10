import { Progress1Loaded, ProgressError, TurnOnConfiguration } from '.';
import { TurnOnConfigurationRaw } from '..';

export class ConfigHelper {

  /**
   * Create a configuration object which just contains an error
   */
  static createError(message: string): TurnOnConfiguration {
    const result: TurnOnConfiguration = {
      await: [],
      run: '',
      progress: ProgressError,
      error: message
    };
    return result;
  }

  /**
   * Load a configuration from a string usually from an Html attribute
   */
  static load(value: string): TurnOnConfiguration {
    let pretyped: TurnOnConfigurationRaw;
    try {
      pretyped = JSON.parse(value);
    }
    catch (ex) {
      return ConfigHelper.createError(`detected configuration but cannot parse to json.`);
    }
    let configuration: TurnOnConfiguration;
    try {
      configuration = ConfigHelper.stabilize(pretyped);
    }
    catch (ex) { 
      return ConfigHelper.createError(`Error loading configuration, reason unknown.`)
    }
  
    return configuration;
  }

  /**
   * Import a raw configuration and make sure it's fully compliant
   */
  private static stabilize(raw: TurnOnConfigurationRaw): TurnOnConfiguration {
    if(!raw) return ConfigHelper.createError('No data found to process');
  
    if(!raw.run) return ConfigHelper.createError(`Configuration didn't contain run - that's the minimum required.`);
  
    if(!raw.run.endsWith('()')) return ConfigHelper.createError('raw must be a function name and end with ()');
  
    const awaits = Array.isArray(raw.await) 
          ? raw.await
          : raw.await 
            ? [raw.await]
            : [];
  
    // also always await the run command, but without the () as it shouldn't be called to detect if it's ready
    
    awaits.push(raw.run.substring(0, raw.run.length-2));
  
    const stable: TurnOnConfiguration = {
      await: awaits,
      run: raw.run,
      progress: Progress1Loaded,
      data: raw.data,
    }
    return stable;
  }
}