export interface Time {
  start: Date,
  end: Date,
}

export enum TimeState {
  BEFORE_COMP,
  IN_COMP,
  AFTER_COMP,
}
