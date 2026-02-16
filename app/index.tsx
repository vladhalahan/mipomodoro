import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FillableVessel } from '@/components/FillableVessel';
import { styles } from './index.styles';
import {
  WORK_DURATION_SEC,
  REST_DURATION_SEC,
  MIN_TASK_NAME_LENGTH,
  type TimerPhase,
} from '@/constants/pomodoro';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PomodoroScreen() {
  const [taskName, setTaskName] = useState('');
  const [phase, setPhase] = useState<TimerPhase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isWork = phase === 'work' || phase === 'paused_work';
  const isRest = phase === 'rest' || phase === 'paused_rest';
  const isRunning = phase === 'work' || phase === 'rest';
  const duration =
    phase === 'idle'
      ? WORK_DURATION_SEC
      : isWork
        ? WORK_DURATION_SEC
        : REST_DURATION_SEC;
  const remaining = duration - elapsed;

  const fill = isWork
    ? elapsed / WORK_DURATION_SEC
    : isRest
      ? 1 - elapsed / REST_DURATION_SEC
      : 0;

  const clearTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTick();
      return;
    }
    tickRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= duration) {
          if (tickRef.current) {
            clearInterval(tickRef.current);
            tickRef.current = null;
          }
          if (phase === 'work') {
            setPhase('rest');
            setElapsed(0);
          } else {
            // Rest ended: start next focus round (cycle until user marks complete)
            setPhase('work');
            setElapsed(0);
          }
          return e;
        }
        return next;
      });
    }, 1000);
    return clearTick;
  }, [isRunning, phase, duration, clearTick]);

  const canStart = taskName.trim().length >= MIN_TASK_NAME_LENGTH;

  const startWork = () => {
    if (!canStart) return;
    setPhase('work');
    setElapsed(0);
    setTaskCompleted(false);
  };

  const pause = () => {
    if (phase === 'work') setPhase('paused_work');
    if (phase === 'rest') setPhase('paused_rest');
    clearTick();
  };

  const resume = () => {
    if (phase === 'paused_work') setPhase('work');
    if (phase === 'paused_rest') setPhase('rest');
  };

  const markComplete = () => {
    setTaskCompleted(true);
    const p = phase;
    if (p === 'work' || p === 'paused_work') {
      clearTick();
      setPhase('rest');
      setElapsed(0);
    } else if (p === 'rest' || p === 'paused_rest') {
      clearTick();
      setPhase('idle');
      setElapsed(0);
    }
  };

  const reset = () => {
    clearTick();
    setPhase('idle');
    setElapsed(0);
  };

  const currentPhaseLabel =
    phase === 'work' || phase === 'paused_work'
      ? 'Focus'
      : phase === 'rest' || phase === 'paused_rest'
        ? 'Rest'
        : '';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={20}
      >
        {/* Vessel (coffee) */}
        <View style={styles.vesselContainer}>
          <FillableVessel
            mode="coffee"
            fill={fill}
            phase={isWork ? 'work' : isRest ? 'rest' : 'idle'}
          />
        </View>

        {/* Timer */}
        <View style={styles.timerBlock}>
          <Text style={styles.timeText}>{formatTime(remaining)}</Text>
          {currentPhaseLabel ? (
            <Text style={styles.phaseLabel}>{currentPhaseLabel}</Text>
          ) : null}
        </View>

        {/* Task name */}
        <TextInput
          style={styles.input}
          placeholder="What are you working on?"
          placeholderTextColor="#888"
          value={taskName}
          onChangeText={setTaskName}
          editable={phase === 'idle'}
        />
        {phase === 'idle' && taskName.trim().length > 0 && taskName.trim().length < MIN_TASK_NAME_LENGTH && (
          <Text style={styles.inputHint}>Enter at least {MIN_TASK_NAME_LENGTH} characters to start</Text>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          {phase === 'idle' && (
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary, !canStart && styles.btnPrimaryDisabled]}
              onPress={startWork}
              activeOpacity={canStart ? 0.8 : 1}
              disabled={!canStart}
            >
              <Text style={[styles.btnPrimaryText, !canStart && styles.btnPrimaryTextDisabled]}>
                Start focus
              </Text>
            </TouchableOpacity>
          )}

          {isRunning && (
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={pause}
              activeOpacity={0.8}
            >
              <Text style={styles.btnSecondaryText}>Pause</Text>
            </TouchableOpacity>
          )}

          {(phase === 'paused_work' || phase === 'paused_rest') && (
            <>
              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary]}
                onPress={resume}
                activeOpacity={0.8}
              >
                <Text style={styles.btnPrimaryText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                onPress={reset}
                activeOpacity={0.8}
              >
                <Text style={styles.btnSecondaryText}>Reset</Text>
              </TouchableOpacity>
            </>
          )}

          {(phase !== 'idle') && (
            <TouchableOpacity
              style={[styles.btn, styles.btnComplete, taskCompleted && styles.btnCompleteDone]}
              onPress={markComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.btnCompleteText}>
                {taskCompleted ? '✓ Done' : 'Mark complete'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
