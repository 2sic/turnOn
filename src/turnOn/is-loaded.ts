import { Settings, Status } from '.';

export class ConditionAsPromise {

  public settings: Settings;

  constructor(checkFunction: () => Status, settings: Settings) {
    this.innerCheck = checkFunction;
    this.settings = settings;
  }

  public lastStatus: Status = new Status(false, 'condition not checked yet');
  public attempts = 0;

  /**
   * Dummy innerCheck function - should be replaced in the constructor
   */
  public innerCheck(): Status { return new Status(true, 'no condition defined') } ;

  public check(): Status {
    if (this.lastStatus.ready) return this.lastStatus;

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
      if(result.ready) {
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
