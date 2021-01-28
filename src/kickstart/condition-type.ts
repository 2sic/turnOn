import { Status } from '.';

export type Condition = () => Status;

export type ConditionRaw = string | (() => boolean);

