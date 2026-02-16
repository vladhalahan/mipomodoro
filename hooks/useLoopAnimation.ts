import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export type LoopAnimationConfig = {
  duration: number;
  translateY?: [number, number];
  /** 2 or 3 values; 3 values use inputRange [0, 0.5, 1] */
  opacity?: [number, number] | [number, number, number];
};

/**
 * Shared hook for a single looping animation (e.g. steam, bubbles).
 * Returns { translateY, opacity } as Animated.AnimatedInterpolation<number>.
 */
export function useLoopAnimation(config: LoopAnimationConfig) {
  const { duration, translateY: translateYRange, opacity: opacityRange } = config;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ).start();
  }, [anim, duration]);

  const translateY =
    translateYRange &&
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: translateYRange,
    });

  const opacity =
    opacityRange &&
    anim.interpolate({
      inputRange: opacityRange.length === 3 ? [0, 0.5, 1] : [0, 1],
      outputRange: opacityRange,
    });

  return { translateY, opacity };
}
