import { Settings, Status } from '.';

export class IsLoaded {

  public settings: Settings;

  constructor(checkFunction: () => Status, settings: Settings) {
    this.innerCheck = checkFunction;
    this.settings = settings;
  }

  public lastStatus: Status = Status.create(false, 'condition not checked yet');
  public attempts = 0;

  /**
   * Dummy innerCheck function - should be replaced in the constructor
   */
  public innerCheck(): Status { return Status.create(true, 'no condition defined') } ;

  public check(): Status {
    if (this.lastStatus.ready) return this.lastStatus;

    // check and store
    this.lastStatus = this.innerCheck();

    return this.lastStatus;
  }

  public asPromise(): Promise<Status> {
    const parent = this;
    var checkCondition = function(resolve: (value: Status) => void, reject: (reason: unknown | null) => void) {
      // If the condition is met, we're done! 
      var result = parent.check();

      // if all is ok (true) then complete the promise
      if(result.ready) resolve(result);

      if(parent.attempts++ >= parent.settings.attempts) reject('tried more than max attempts');

      // If the condition isn't met but the timeout hasn't elapsed, go again
      setTimeout(checkCondition, parent.settings.interval, resolve, reject);
    };

    return new Promise(checkCondition)
  }
}
