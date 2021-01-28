import { Status } from '.';

export function booleanToStatusPromise(boolPromise: Promise<boolean>): Promise<Status> {
  return new Promise<Status>((resolve, reject) => {
    boolPromise
      .then(r => {
        let result = r !== false;
        resolve(new Status(result, 'from promise'));
    })
      .catch(reason => reject(reason));
  });
}
