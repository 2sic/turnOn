
import { Kickstart } from './kickstart';


const win = window as any;
if (!win.kickstart) win.kickstart = new Kickstart();
