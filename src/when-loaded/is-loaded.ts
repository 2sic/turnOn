
export class IsLoaded {

  static DefaultInterval = 100;
  static MaxAttempts = 100;

  constructor(checkFunction: () => boolean) {
    this.innerCheck = checkFunction;
  }

  public lastCheckResult: boolean = false;
  public attempts = 0;

  public innerCheck(): boolean { return false } ;

  public check(): boolean {
    if (this.lastCheckResult) return true;

    // check, and safely convert to boolean
    const objCheck = this.innerCheck();
    this.lastCheckResult = objCheck == true;

    return this.lastCheckResult;
  }

  public asPromise(maxAttempts = IsLoaded.MaxAttempts, interval = IsLoaded.DefaultInterval): Promise<boolean> {
      
    const parent = this;
    var checkCondition = function(resolve: (value: boolean) => void, reject: (reason: unknown | null) => void) {
      // If the condition is met, we're done! 
      var result = parent.check();
      if(result) {
          resolve(result);
      }

      if(parent.attempts++ >= maxAttempts) reject('tried more than max attempts');

      // If the condition isn't met but the timeout hasn't elapsed, go again
        setTimeout(checkCondition, interval, resolve, reject);
    };

    return new Promise(checkCondition)
  }
}