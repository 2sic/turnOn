import { Condition } from '.';
import { createNameCondition } from './condition-name';
import { createFnCondition } from './condition-function';

/**
 * Create a condition which waits for a function to exist, and then polls it till the result is ok.
 */
export function createFunctionNameCondition(key: string): Condition {
  if(!key.endsWith('()')) throw `Tried to create Function-Name condition but that requires it to end with (), got ${key}`;

  const keyWithoutBrackets = key.substring(0, key.length - 2);
  let fnCondition: Condition;
  const nameCondition = createNameCondition(keyWithoutBrackets);
  return () => {

    // As long as the name doesn't exist, check that and return that status
    // But only do this till we have the fnCondition once, then skip
    if(!fnCondition) {
      const statusOfName = nameCondition();
      if(!statusOfName.ready) return statusOfName;

      // Check if we really got a function - if not, assume all is ok and don't try to call
      if(typeof(statusOfName.result) !== 'function') return statusOfName;
      
      // Create the function-condition to use from now on. 
      fnCondition = createFnCondition(statusOfName.result as () => boolean);
    }

    // once the name exists, try to get the function
    return fnCondition();
  }
}