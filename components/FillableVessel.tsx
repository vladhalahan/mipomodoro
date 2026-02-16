import React from 'react';
import type { VesselMode } from '@/constants/pomodoro';
import { CoffeePomodoroVessel } from './CoffeePomodoroVessel';
import { BeerPomodoroVessel } from './BeerPomodoroVessel';

type Props = {
  mode: VesselMode;
  fill: number; // 0..1
  phase: 'work' | 'rest' | 'idle';
};

export function FillableVessel({ mode, fill, phase }: Props) {
  if (mode === 'coffee') {
    return <CoffeePomodoroVessel fill={fill} />;
  }
  return <BeerPomodoroVessel fill={fill} />;
}
