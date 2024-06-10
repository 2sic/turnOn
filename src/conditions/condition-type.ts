import { Status } from '../status/status';


export type Condition = () => Status;

export type ConditionRaw = string | (() => boolean) | Promise<boolean>;
