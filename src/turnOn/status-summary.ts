import { Status } from '.';

export class StatusSummary extends Status {

  constructor(details: Status[]) {
    // no details provided, then assume ok
    if (!details) details = [];

    const ready = detectIfAllOk(details);

    const message = details.length === 0
      ? 'no conditions provided'
      : ready
        ? 'all ok'
        : 'some conditions did not complete';
    super(ready, message, 'Summary');
    this.details = details;
  }

  /** Details of each of the status received */
  details: Status[]
}

function detectIfAllOk(details: Status[]) {
  // some kind of error appeared, shouldn't be ok
  if (!Array.isArray(details)) return false;

  // count if all details have a ready-state
  return (details.filter(stat => stat.ready).length == details.length)
}