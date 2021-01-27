import { Settings } from '.';

export class IsLoaded {

  public settings: Settings;

  constructor(checkFunction: () => boolean, settings: Settings) {
    this.innerCheck = checkFunction;
    this.settings = settings;
  }

  public lastCheckResult: boolean = false;
  public attempts = 0;

  /**
   * Dummy innerCheck function - should be replaced in the constructor
   */
  public innerCheck(): boolean { return false } ;

  public check(): boolean {
    if (this.lastCheckResult) return true;

    // check, and safely convert to boolean
    const objCheck = this.innerCheck();
    this.lastCheckResult = objCheck == true;

    return this.lastCheckResult;
  }

  public asPromise(): Promise<boolean> {
    const realThis = this;
    var checkCondition = function(resolve: (value: boolean) => void, reject: (reason: unknown | null) => void) {
      // If the condition is met, we're done! 
      var result = realThis.check();

      // if all is ok (true) then complete the promise
      if(result) resolve(result);

      if(realThis.attempts++ >= realThis.settings.attempts) reject('tried more than max attempts');

      // If the condition isn't met but the timeout hasn't elapsed, go again
      setTimeout(checkCondition, realThis.settings.interval, resolve, reject);
    };

    return new Promise(checkCondition)
  }
}
