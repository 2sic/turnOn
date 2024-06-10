import { ExistsProgress } from '../conditions/exists-progress';
import { ContextData } from './context-data';
import { Progress2Watching, Progress3Running, Progress4Completed, TurnOnConfigInternal } from '../configuration/configuration';
import { ConfigTag } from './config-tag';
import { Status } from '../status/status';
import { log } from '../debug';
import { TurnOnRoot } from '../turnOn/turn-on-root';

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

    // if node not found or it's not a function, stop checking
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
    const data = config.data;
    const contextData: ContextData = { tag: configTag.tag, config: config };
    const fnScopeObject = checkExists.parent as any;

    // New v0.3.0: if we have args, use them
    if (config.args) {
      const fnArgs = mergeArgsWithDataAndContext(config, contextData);
      fnScopeObject[checkExists.lastName](...fnArgs);
    }
    // Classic run with data only
    else {
      fnScopeObject[checkExists.lastName](data, contextData);
    }

    configTag.progress(Progress4Completed);
  });
  return promise;
}

function mergeArgsWithDataAndContext(config: TurnOnConfigInternal, contextData: ContextData): unknown[] {
  const data = config.data;
  let fnArgs = config.args;

  log(`mergeArgsWithDataAndContext`, { config, contextData, data, fnArgs })

  // if we have data, prepend it to the args, optionally mix with context
  if (config.data != undefined) {
    // merge data with context if addContext is set to `data`
    const argsData = config.addContext === 'data' && (data !== null && typeof data === 'object' && !Array.isArray(data))
      ? { ...contextData, ...data }
      : data;
    fnArgs = [argsData, ...fnArgs];
  }

  // with or without data - if we should add context to end, do so
  if (config.addContext === 'end')
    fnArgs = [...fnArgs, contextData];

  return fnArgs;
}