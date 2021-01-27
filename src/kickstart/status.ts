
export class Status {
  /** Status if the check has been successful */
  ready: boolean = false;

  /** Status message if provided */
  message: string = '';

  public static create(ready: boolean, message: string) {
    return {
      ready, message
    } as Status;
  }
}

export class StatusWithAttempts extends Status {
  /** Amount of attempts tried till this  */
  attempts = 0;
}