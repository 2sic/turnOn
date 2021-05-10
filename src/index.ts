
export * from './constants';
export * from './debug';

export * from './conditions';
export * from './config-tags';
export * from './loader';

import { TurnOnRoot } from './turnOn';

const win = window as any;
if (!win.turnOn) win.turnOn = new TurnOnRoot();
const turnOn = win.turnOn as TurnOnRoot;

turnOn.loader.activateObserver();
