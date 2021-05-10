import { ConfigTag } from '.';
import { log, Status } from '..';
import { Progress2Watching, Progress3Running, Progress4Completed } from '../configuration';
import { TurnOnRoot } from '../turnOn';

/**
 * 
 */
export function convertConfigToTurnOn(root: TurnOnRoot, tag: ConfigTag): Promise<Status> {
  const config = tag.config;
  log('convert to turnon');
  const turnOn = root.new().await(config.await);
  tag.progress(Progress2Watching);

  turnOn.then(() => {
    let key = config.run;
    log('turn on success - will try to run ' + key);
    tag.progress(Progress3Running);
    if(!key.endsWith('()')) 
      tag.error(`run should end with () but doesn't - can't continue`);

    key = key.substr(0, key.length - 2);
    const parts = key.split('.');
    if (parts.length > 0 && parts[0] == 'window')
      parts.shift();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current = window as any;
    let match = 'window';
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      current = current[part];
      // found, so let's add to list of successful matches
      match += '.' + part;

      // if node not found, stop checking
      if (!current) tag.error(`Tried to find object parts for ${match} but didn't get anything.`);
    }
    if(typeof(current) !== 'function') tag.error(`Got ${match} but it's not a function`);

    // now run it!
    current({ ...tag.config, tag: tag });
    tag.progress(Progress4Completed);
  });
  return turnOn;
}