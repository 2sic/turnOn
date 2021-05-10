import { TurnOnRoot } from './turnOn/turn-on-root';
export {};

declare global {
  interface Window { 
    turnOn?: TurnOnRoot; 
    debugTurnOn?: boolean;
  }
}