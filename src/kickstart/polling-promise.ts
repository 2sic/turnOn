import { Status } from './status';

export class PollingPromise extends Promise<Status[]> {
  constructor(aspects: (resolve: (value: Status[]) => void, reject: (reason: unknown | null) => void) => void) {
    super(aspects);
  }

}