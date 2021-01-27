import { ConditionMaker, Settings, StringOrFn } from '.';
import { IsLoaded } from './is-loaded';

export class Kickstart {

  /** The settings applied to this Kickstart */
  public settings = new Settings();

  /** Constructor with optional settings */
  constructor(settings?: Partial<Settings>) {
    if (settings)
      this.settings = { ...this.settings, ...settings };

    Kickstart.count++;
  }

  new(settings?: Partial<Settings>) {
    return new Kickstart(settings);
  }

  public await(conditions: StringOrFn | StringOrFn[]): Promise<boolean[]> {

    // re-wrap to ensure we always work with an array
    const conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];

    // Get settings and if we've been doing this multiple times, add numbers to the name
    const settings = this.settings;

    // convert conditions to promises
    const loadedCheckers = conditionsArray.map(c => {
      const condition = this._conditionMaker.generate(c);
      var loaded = new IsLoaded(condition, settings);
      return loaded.asPromise();  
    });

    // return a single promise for all inner promises
    const promise = Promise.all(loadedCheckers);
    // if (!settings.silent) 
      promise.catch(() => console.log(`Kickstart #${Kickstart.count} "${settings.name}" couldn't complete because some conditions were not met.`));
    
    return promise;
  }

  private _conditionMaker = new ConditionMaker();

  private static count = 0;
}