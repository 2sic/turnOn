
const debug = true;

export function log(message: string, obj1?: unknown, obj2?: unknown): void {
  if(!debug) return;
  if(obj2) console.log('turn-on: ' + message, obj1, obj2);
  else if(obj1)  console.log('turn-on: ' + message, obj1);
  else console.log('turn-on: ' + message);
}