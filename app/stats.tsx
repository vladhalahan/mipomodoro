import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import type { SessionRecord } from '@/constants/storage';
import { styles } from './stats.styles';

function startOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function formatRelativeDate(ms: number): string {
  const now = Date.now();
  const diffMin = Math.round((now - ms) / 60000);
  if (diffMin < 60) return diffMin <= 1 ? 'Just now' : `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;
  return new Date(ms).toLocaleDateString();
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function SessionItem({ item }: { item: SessionRecord }) {
  return (
    <View style={styles.sessionRow}>
      <Text style={styles.sessionTask} numberOfLines={1}>
        {item.taskName}
      </Text>
      <Text style={styles.sessionMeta}>
        {formatRelativeDate(item.completedAt)} · {formatDuration(item.workDurationSec)} focus · {formatDuration(item.restDurationSec)} rest
      </Text>
    </View>
  );
}

export default function StatsScreen() {
  const router = useRouter();
  const { sessions, loading } = useSessionStorage();

  const { todayCount, weekCount } = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000;
    let todayCount = 0;
    let weekCount = 0;
    for (const s of sessions) {
      if (s.completedAt >= todayStart) todayCount++;
      if (s.completedAt >= weekStart) weekCount++;
    }
    return { todayCount, weekCount };
  }, [sessions]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{todayCount}</Text>
          <Text style={styles.summaryLabel}>Today</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{weekCount}</Text>
          <Text style={styles.summaryLabel}>This Week</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{sessions.length}</Text>
          <Text style={styles.summaryLabel}>All Time</Text>
        </View>
      </View>

      {!loading && sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bar-chart-outline" size={48} color="#333" />
          <Text style={styles.emptyText}>No sessions yet. Complete a pomodoro to see your history here.</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SessionItem item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}
