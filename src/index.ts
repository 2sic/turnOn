
export * from './constants';
export * from './debug';

export * from './status';
export * from './conditions';
export * from './tags';
export * from './watch-promise';

import { TurnOnRoot } from './turnOn';
export * from './window';

if (!window.turnOn) window.turnOn = new TurnOnRoot();
const turnOn = window.turnOn as TurnOnRoot;

turnOn.loader.activateObserver();
