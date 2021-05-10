import { Condition } from '.';
import { Status } from '..';


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