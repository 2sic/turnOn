
const nameNotDefired = 'not set';
export class Status {

  /** name of this status, to better point to which rule failed */
  name = nameNotDefired;

  /** Status if the check has been successful */
  ready: boolean = false;

  /** Status message if provided */
  message: string = '';

  /** Amount of attempts tried till this  */
  attempts? = 0;

  public static create(ready: boolean, message: string, name?: string) {
    return {
      ready, message, name: name ?? nameNotDefired
    } as Status;
  }
}
