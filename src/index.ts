
import { Kickstart } from './kickstart';


const win = window as any;
if (!win.kickstart) win.kickstart = new Kickstart();


new Kickstart()
  .await("abc")
  .then(() => alert('got here 1'));


new Kickstart()
  .await(["abc"])
  .then(() => alert('got here [1]'));

new Kickstart()
  .await(["abc.def"])
  .then(() => alert('got here [1.1]'));

new Kickstart()
  .await(["abc", "def"])
  .then(() => alert('got here [2]'));


new Kickstart()
  .await(() => { return (window as any).t2 === 't2' })
  .then(() => alert('got here t2'));