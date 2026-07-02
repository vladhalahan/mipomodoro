export const SESSIONS_STORAGE_KEY = '@mipomodoro/sessions_v1';

export interface SessionRecord {
  id: string;
  taskName: string;
  startedAt: number;      // ms timestamp when work phase began
  completedAt: number;    // ms timestamp when rest phase was marked complete
  workDurationSec: number;
  restDurationSec: number;
}

export const MAX_STORED_SESSIONS = 100;
