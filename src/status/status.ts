
const nameNotDefined = 'not set';
export class Status {
  constructor(

    /** Status if the check has been successful */
    public ready: boolean,

    /** Status message if provided */
    public message: string, 
    
    /** name of this status, to better point to which rule failed */
    public name: string = nameNotDefined,
    
    /** result of a check - in some cases needed for next steps */
    public result?: unknown
    ) {
  }

  /** Amount of attempts tried till this  */
  attempts? = 0;

}
