
export * from './constants';
export * from './debug';

import { TurnOn } from './turnOn';
import { turnOnObserver} from './loader/loader';

// import { MiniTestTest } from './mini';

const win = window as any;
if (!win.turnOn) win.turnOn = new TurnOn();


turnOnObserver.load();