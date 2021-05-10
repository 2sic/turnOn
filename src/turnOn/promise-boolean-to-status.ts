import { Status } from '.';

export function promiseBoolToStatus(boolPromise: Promise<boolean>): Promise<Status> {
  return new Promise<Status>((resolve, reject) => {
    boolPromise
      .then(r => {
        const result = r !== false;
        resolve(new Status(result, 'from promise'));
    })
      .catch(reason => reject(reason));
  });
}
