
export * from './constants';
export * from './debug';

export * from './status';
export * from './conditions';
export * from './tags';
export * from './watch-promise';

import { TurnOnRoot } from './turnOn';

const win = window as any;
if (!win.turnOn) win.turnOn = new TurnOnRoot();
const turnOn = win.turnOn as TurnOnRoot;

turnOn.loader.activateObserver();
