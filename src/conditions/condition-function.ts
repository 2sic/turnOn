import { Condition } from '.';
import { Status } from '..';

/**
 * Create a condition based on a function which will be polled till it returns truthy
 */
export function createFnCondition(fn: () => boolean): Condition {
  let name = fn.toString();
  if (name && name.length > 25) name = name.substr(0, 25);
  return () => { 
    return {
      name,
      ready: fn(),
      message: ''
    } as Status;
  }
}