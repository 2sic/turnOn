import { createFnCondition } from './condition-function';
import { createFunctionNameCondition } from './condition-function-name';
import { createNameCondition } from './condition-name';
import { Condition, ConditionRaw } from './condition-type';

/**
 * Internal class to generate is-it-ready checkers
 */
export class ConditionMaker {

  /**
   * Make a new condition checker
   */
  public make(condition: ConditionRaw): Condition {
    if (typeof(condition) === 'function')
      return createFnCondition(condition);
    
    if (typeof(condition) === 'string')
      return condition.endsWith('()')
        ? createFunctionNameCondition(condition)
        : createNameCondition(condition);
  }
}