import { Status } from './status';

export class PollingPromise extends Promise<Status[]> {
  constructor(resolve: (value: Status[]) => void, reject: (reason: unknown | null) => void) {
    super((resolve, reject) => {
      
    });
  }

}