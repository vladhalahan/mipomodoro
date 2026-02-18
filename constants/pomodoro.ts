/** 40 min in prod (real devices), 1 min in __DEV__ (local/Expo Go) */
export const WORK_DURATION_SEC = __DEV__ ? 1 * 60 : 40 * 60;
/** 20 min in prod, 0.5 min in __DEV__ */
export const REST_DURATION_SEC = __DEV__ ? 0.5 * 60 : 20 * 60;

export const MIN_TASK_NAME_LENGTH = 3;

/** Fraction of phase time left below which we show the transition notice (e.g. 0.2 = last 20%) */
export const NOTICE_THRESHOLD = 0.2;

export type VesselMode = 'coffee' | 'beer';

export type TimerPhase = 'idle' | 'work' | 'rest' | 'paused_work' | 'paused_rest';
