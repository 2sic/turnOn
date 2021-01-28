
import { TurnOn } from './kickstart';

const win = window as any;
if (!win.turnOn) win.turnOn = new TurnOn();
