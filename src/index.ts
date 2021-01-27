import { IsLoaded } from './when-loaded';
import { WhenLoaded } from './when-loaded/when-loaded';

const test = new IsLoaded(() => Math.random() < 0.5);

test.asPromise().then(() => console.log('ok', test.attempts));

(window as any).temp = new WhenLoaded();


new WhenLoaded()
  .ensure("abc")
  .then(() => alert('got here 1'));


new WhenLoaded()
  .ensure(["abc"])
  .then(() => alert('got here [1]'));

new WhenLoaded()
  .ensure(["abc.def"])
  .then(() => alert('got here [1.1]'));

new WhenLoaded()
  .ensure(["abc", "def"])
  .then(() => alert('got here [2]'));


new WhenLoaded()
  .ensure(() => { return (window as any).t2 === 't2' })
  .then(() => alert('got here t2'));