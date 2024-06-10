import { Settings, LogDebug, LogSilent } from '.';
import { DefaultName, FailReject, FailResolve, FailSilent } from './settings';
import { promiseBoolToStatus } from '../watch-promise/promise-boolean-as-promise';
import { ConditionAsPromise, ConditionMaker, ConditionRaw, Status, StatusSummary } from '..';
import { logPrefix } from '../constants';

export class TurnOn {

  /** 
   * The settings for this turnOn
   */
  public settings;

  /**
   * Constructor with optional settings
   */
  constructor(nameOrSettings?: Partial<Settings> | string) {
    // Handle case where only a name is provided
    if (typeof nameOrSettings === 'string') {
      nameOrSettings = {
        name: nameOrSettings
      } as Partial<Settings>;
    }

    // merge settings with default settings ??? not sure why
    if (nameOrSettings)
      this.settings = { ...new Settings(), ...nameOrSettings };

    TurnOn.count++;
  }

  /**
   * Create a new turnOn object.
   * Mainly useful in global scenarios, to give it a separate name
   */
  new(nameOrSettings?: Partial<Settings>): TurnOn {
    return new TurnOn(nameOrSettings);
  }

  /**
   * Old call, renamed to `require` in v0.2
   * @param conditions 
   * @returns 
   * @deprecated in v0.2, but will probably remain forever, just not documented any more.
   */
  public await(conditions: ConditionRaw | ConditionRaw[]): Promise<Status> { 
    return this.require(conditions);
  }

  /**
   * Require a set of conditions to be met before executing run.
   * @param conditions 
   * @returns 
   */
  public require(conditions: ConditionRaw | ConditionRaw[]): Promise<Status> {

    // re-wrap to ensure we always work with an array
    const conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];

    // convert conditions to promises
    const loadedCheckers = conditionsArray.map(c => {
      // do this for non-promise conditions
      if (Promise.resolve(c as unknown) === c) {
        return promiseBoolToStatus(c);
      } else {
        const condition = this._conditionMaker.make(c);
        const loaded = new ConditionAsPromise(condition, this.settings);
        return loaded.asPromise();  
      }
    });

    // keep the current turnOn-object for reference in methods
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisKs = this;

    // keep count as it was on start, to ensure it doesn't change any more till we log the error
    const instanceCount = TurnOn.count;

    const flattened = new Promise<StatusSummary>((resolve, reject) => { 
      // return a single promise for all inner promises which either fail or resolve
      Promise.all(loadedCheckers).then(list => {

        // get summary of all details infos
        const summary = new StatusSummary(list);

        // by default, log details about what failed
        if (window.debugTurnOn || thisKs.settings.log === LogDebug || (!summary.ready && thisKs.settings.log !== LogSilent))
          thisKs.logStatusList(summary.ready, instanceCount, thisKs.settings, list);

        // if all is ok, resolve now
        if (summary.ready === true) {
          resolve(new StatusSummary(list));
          return;
        }

        // depending on the need, either reject/error (default) or resolve with false
        switch (thisKs.settings.failure){
          case FailReject: reject(summary); break;
          case FailResolve: resolve(summary); break;
          case FailSilent: return;
        }
      })
    });
      
    return flattened;
  }

  public logStatusList(success: boolean, id: number, settings: Settings, statusList: Status[]): void {
    console.log(logPrefix + `#${id} `
    + (settings.name !== DefaultName ? `"${settings.name}" ` : '')
    + (success ? 'success!' : `couldn't complete because some conditions were not met. See details: `),
     statusList);
  }

  private _conditionMaker = new ConditionMaker();

  private static count = 0;
}