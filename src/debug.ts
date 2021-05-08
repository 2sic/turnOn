
const debug = true;

export function log(message: string, obj1?: any, obj2?: any) {
  if(!debug) return;
  if(obj2) return console.log('turn-on: ' + message, obj1, obj2);
  if(obj1) return console.log('turn-on: ' + message, obj1);
  console.log('turn-on: ' + message);
}