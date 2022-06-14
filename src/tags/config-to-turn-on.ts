import { ConfigTag } from '.';
import { log, Status } from '..';
import { Progress2Watching, Progress3Running, Progress4Completed } from '../configuration';
import { TurnOnRoot } from '../turnOn';
import { ExistsProgress } from '../conditions/exists-progress';
import { ContextData } from './context-data';

/**
 * 
 */
export function convertConfigToTurnOn(root: TurnOnRoot, configTag: ConfigTag): Promise<Status> {
  const config = configTag.config;
  log('convert to turnon');
  const turnOn = root.new(config.settings);
  config.settings = turnOn.settings;
  const promise = turnOn.await(config.await);
  configTag.progress(Progress2Watching);

  promise.then(() => {
    const run = config.run;
    log('turn on success - will try to run ' + run);
    configTag.progress(Progress3Running);
    if(!run.endsWith('()')) {
      configTag.error(`run should end with () but doesn't - can't continue`);
      return;
    }

    // check exists without trailing "()""
    const checkExists = ExistsProgress.test(run.substr(0, run.length - 2));

    // if node not found, stop checking
    if (!checkExists.success) {
      configTag.error(`Tried to find object parts for ${checkExists.matchedKey} but didn't get anything.`);
      return;
    }
    if (typeof(checkExists.result) !== 'function') {
      configTag.error(`Got ${checkExists.partsFound} but it's not a function`);
      return;
    }

    // now run it!
    // Special: we can't just run the function we got back
    // because that loses the `this`. So we must run it as a property of the parent
    const fnScopeObject = checkExists.parent as any;
    fnScopeObject[checkExists.lastName](config.data, configTag as ContextData);
    // const fn = checkExists.result as (x: unknown) => unknown;
    // fn({ ...config, tag: tag });
    configTag.progress(Progress4Completed);
  });
  return promise;
}
