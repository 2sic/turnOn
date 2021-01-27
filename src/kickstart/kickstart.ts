import { ConditionMaker, Settings, Status, StringOrFn } from '.';
import { IsLoaded } from './is-loaded';
import { DefaultSettings } from './settings';

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

  public await(conditions: StringOrFn | StringOrFn[]): Promise<boolean> {

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

    // keep the real object for reference in methods
    const kickstart = this;

    // keep count as it was on start, to ensure it doesn't change any more till we log the error
    const instanceCount = Kickstart.count;

    // return a single promise for all inner promises
    const promise = Promise.all(loadedCheckers);

    let flattened = new Promise<boolean>((resolve, reject) => { 
      promise.then(list => {
        // verify all are ok
        if (list.filter(stat => stat.ready).length == list.length) {
          resolve(true);
          return;
        }

        // by default, log details about what failed
        if (!settings.silent) kickstart.logStatusList(instanceCount, settings, list);

        // depending on the need, either reject/error (default) or resolve with false
        if (settings.reject)
          reject(list);
        else
          resolve(false);
      })
    });
      
    return flattened;
  }

  public logStatusList(id: number, settings: Settings, statusList: Status[]) {
    console.log(`Kickstart #${id} `
    + (settings.name !== DefaultSettings.name ? `"${settings.name}" ` : '')
    + `couldn't complete because some conditions were not met. See details: `, statusList);
  }

  private _conditionMaker = new ConditionMaker();

  private static count = 0;
}