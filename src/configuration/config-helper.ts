import { Progress1Loaded, ProgressError, TurnOnConfigInternal } from '.';
import { TurnOnConfiguration } from '..';
import { LogMode, Settings, LogError, LogDebug } from '../turnOn/settings';

export class ConfigHelper {

  /**
   * Create a configuration object which just contains an error
   */
  static createError(message: string): TurnOnConfigInternal {
    const result: TurnOnConfigInternal = {
      await: [],
      debug: false,
      run: '',
      progress: ProgressError,
      error: message
    };
    return result;
  }

  /**
   * Load a configuration from a string usually from an Html attribute
   */
  static load(value: string): TurnOnConfigInternal {
    let pretyped: TurnOnConfiguration;
    try {
      pretyped = JSON.parse(value);
    }
    catch (ex) {
      return ConfigHelper.createError(`detected configuration but cannot parse to json.`);
    }
    let configuration: TurnOnConfigInternal;
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
  private static stabilize(raw: TurnOnConfiguration): TurnOnConfigInternal {
    if(!raw) return ConfigHelper.createError('No config data found to process');
    if(!raw.run) return ConfigHelper.createError(`Config didn't contain 'run' - it's required.`);
    if(!raw.run.startsWith('window')) return ConfigHelper.createError(`run command must start with 'window.' but is:` + raw.run);
    if(!raw.run.endsWith('()')) return ConfigHelper.createError(`run must be a function name and end with () but it's:` + raw.run);
  
    const requires = raw.require ?? raw.await;
    const awaits = Array.isArray(requires) 
          ? requires
          : requires 
            ? [requires]
            : [];
  
    // also always await the run command, but without the () as it shouldn't be called to detect if it's ready    
    awaits.push(raw.run.substring(0, raw.run.length-2));
  
    const logMode: LogMode = (raw?.debug ?? false) ? LogDebug : LogError;

    const stable: TurnOnConfigInternal = {
      await: awaits,
      debug: raw.debug ?? false,
      run: raw.run,
      progress: Progress1Loaded,
      data: raw.data || { }, // give empty object so a developer can see this would exist as an option
      settings: { ...new Settings(), log: logMode, ...raw.settings }
    }
    return stable;
  }
}