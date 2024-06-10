import { Status } from '../status/status';


export function promiseBoolToStatus(boolPromise: Promise<boolean>): Promise<Status> {
  return new Promise<Status>((resolve, reject) => {
    boolPromise
      .then(r => {
        const result = r !== false;
        resolve(new Status('bool-promise', result, 'from promise'));
    })
      .catch(reason => reject(reason));
  });
}
