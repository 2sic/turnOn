import { ConfigTag } from '.';
import { log, Status } from '..';
import { Progress2Watching, Progress3Running, Progress4Completed } from '../configuration';
import { TurnOnRoot } from '../turnOn';
import { ExistsProgress } from '../conditions/exists-progress';

/**
 * 
 */
export function convertConfigToTurnOn(root: TurnOnRoot, tag: ConfigTag): Promise<Status> {
  const config = tag.config;
  log('convert to turnon');
  const turnOn = root.new(config.settings);
  config.settings = turnOn.settings;
  const promise = turnOn.await(config.await);
  tag.progress(Progress2Watching);

  promise.then(() => {
    const run = config.run;
    log('turn on success - will try to run ' + run);
    tag.progress(Progress3Running);
    if(!run.endsWith('()')) {
      tag.error(`run should end with () but doesn't - can't continue`);
      return;
    }

    // check exists without trailing "()""
    const checkExists = ExistsProgress.test(run.substr(0, run.length - 2));

    // if node not found, stop checking
    if (!checkExists.success) {
      tag.error(`Tried to find object parts for ${checkExists.matchedKey} but didn't get anything.`);
      return;
    }
    if(typeof(checkExists.result) !== 'function') {
      tag.error(`Got ${checkExists.partsFound} but it's not a function`);
      return;
    }

    // now run it!
    // Special: we can't just run the function we got back
    // because that loses the `this`. So we must run it as a property of the parent
    const fnScopeObject = checkExists.parent as any;
    fnScopeObject[checkExists.lastName](config.data, { ...config, tag: tag });
    // const fn = checkExists.result as (x: unknown) => unknown;
    // fn({ ...config, tag: tag });
    tag.progress(Progress4Completed);
  });
  return promise;
}
