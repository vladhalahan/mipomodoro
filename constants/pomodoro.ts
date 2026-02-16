export const WORK_DURATION_SEC = 1 * 60; // 40 min
export const REST_DURATION_SEC = 0.5 * 60; // 20 min

export const MIN_TASK_NAME_LENGTH = 3;

export type VesselMode = 'coffee' | 'beer';

export type TimerPhase = 'idle' | 'work' | 'rest' | 'paused_work' | 'paused_rest';
