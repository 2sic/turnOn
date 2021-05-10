import { Status } from '..';
import { Settings } from '../turnOn';

const promiseType = 'promise';
export class ConditionAsPromise {

  public settings: Settings;

  constructor(checkFunction: () => Status, settings: Settings) {
    this.innerCheck = checkFunction;
    this.settings = settings;
  }

  public lastStatus: Status = new Status(promiseType, false, 'condition not checked yet');
  public attempts = 0;

  /**
   * Dummy innerCheck function - should be replaced in the constructor
   */
  public innerCheck(): Status { return new Status(promiseType, true, 'no condition defined') }

  public check(): Status {
    if (this.lastStatus.ready === true) return this.lastStatus;

    // check and store
    this.lastStatus = this.innerCheck();

    return this.lastStatus;
  }

  public asPromise(): Promise<Status> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const parent = this;
    const checkCondition = function(resolve: (value: Status) => void, reject: (reason: unknown | null) => void) {
      // If the condition is met, we're done! 
      const result = parent.check();

      // if all is ok (true) then complete the promise
      if(result.ready === true) {
        resolve( { ...result, attempts: parent.attempts });
        return;
      }

      if(parent.attempts++ >= parent.settings.attempts) {
        resolve({ ...result, message: 'tried up to max attempts: ' + result.message, attempts: parent.attempts });
        return;
      }

      // If the condition isn't met but the timeout hasn't elapsed, go again
      setTimeout(checkCondition, parent.settings.interval, resolve, reject);
    };

    return new Promise(checkCondition)
  }
}
