
import { TurnOn } from './turnOn';

const win = window as any;
if (!win.turnOn) win.turnOn = new TurnOn();
