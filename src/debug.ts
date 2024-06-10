
// const debug = true;

import { LogPrefix } from './constants';

export function log(message: string, obj1?: unknown, obj2?: unknown): void {
  if(!window.debugTurnOn) return;
  if(obj2) console.log(LogPrefix + message, obj1, obj2);
  else if(obj1)  console.log(LogPrefix + message, obj1);
  else console.log(LogPrefix + message);
}