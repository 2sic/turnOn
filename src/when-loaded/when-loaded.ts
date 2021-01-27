import { ConditionMaker, StringOrFn } from '.';
import { IsLoaded } from './is-loaded';

export class WhenLoaded {

  public ensure(conditions: StringOrFn | StringOrFn[]): Promise<boolean[]> {

    const conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];

    const loadedCheckers = conditionsArray.map(c => {
      const condition = this.conditionMaker.generate(c);
      var loaded = new IsLoaded(condition);
      return loaded.asPromise();  
    })
    // const condition = this.conditionMaker.generate(conditions);
    // var loaded = new IsLoaded(condition);
    // return loaded.asPromise();
    return Promise.all(loadedCheckers);
  }

  public conditionMaker = new ConditionMaker();
}