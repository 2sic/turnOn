import { TurnOnConfiguration } from '../tags/config-in-tag';
import { LogMode, Settings, LogError, LogDebug } from '../turnOn/settings';
import { Progress1Loaded, ProgressError, TurnOnConfigInternal, AddContextLocation } from './configuration';

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
      error: message,
      addContext: false,
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
    // 1. Start with the run command - ensure it's there and correct
    if(!raw) return ConfigHelper.createError('No turn-on config found to process');
    if(!raw.run) return ConfigHelper.createError(`Config didn't contain 'run' - it's required.`);
    if(!raw.run.startsWith('window')) return ConfigHelper.createError(`run command must start with 'window.' but is:` + raw.run);
    if(!raw.run.endsWith('()')) return ConfigHelper.createError(`run must be a function name and end with () but it's:` + raw.run);
  
    // 2. Get the requires/awaits
    const requiresRaw = raw.require ?? raw.await;
    const requires = Array.isArray(requiresRaw) 
          ? requiresRaw
          : requiresRaw
            ? [requiresRaw]
            : [];
  
    // also always await the run command, but without the () as it shouldn't be called to detect if it's ready    
    requires.push(raw.run.substring(0, raw.run.length-2));
  
    // 3. Get the args and ensure it's an array if given
    if(raw.args && !Array.isArray(raw.args))
      return ConfigHelper.createError('args must be an array if given');

    // 4. Get the log mode
    const logMode: LogMode = (raw?.debug ?? false) ? LogDebug : LogError;

    const addContext = raw.addContext != null
      ? raw.addContext
      : raw.args
        ? false
        : true;

    const stable: TurnOnConfigInternal = {
      await: requires,
      debug: raw.debug ?? false,
      run: raw.run,
      progress: Progress1Loaded,
      data: raw.data || { }, // give empty object so a developer can see this would exist as an option
      args: raw.args,
      settings: { ...new Settings(), log: logMode, ...raw.settings },
      addContext,
    }
    return stable;
  }
}