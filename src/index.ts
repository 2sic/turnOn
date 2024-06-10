import { TurnOnRoot } from './turnOn/turn-on-root';

// export * from './constants';
// export * from './debug';

// export * from './status';
// export * from './conditions';
// export * from './tags';
// export * from './watch-promise';


export * from './window';

if (!window.turnOn) window.turnOn = new TurnOnRoot();
// const turnOn = window.turnOn as TurnOnRoot;

// turnOn.loader.activateObserver();
