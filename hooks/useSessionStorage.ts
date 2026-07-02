import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SESSIONS_STORAGE_KEY,
  MAX_STORED_SESSIONS,
  type SessionRecord,
} from '@/constants/storage';

export function useSessionStorage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SESSIONS_STORAGE_KEY)
      .then((raw) => {
        if (raw) setSessions(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saveSession = useCallback(async (record: SessionRecord) => {
    setSessions((prev) => {
      const next = [record, ...prev].slice(0, MAX_STORED_SESSIONS);
      AsyncStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return { sessions, loading, saveSession };
}
