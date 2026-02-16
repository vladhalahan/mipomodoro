import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export type FloatLoopConfig = {
  duration?: number;
  distance?: number;
};

const DEFAULT_DURATION = 2000;
const DEFAULT_DISTANCE = 12;

/**
 * Shared hook for gentle floating (bob) animation.
 * Returns interpolated translateY for use in transform.
 */
export function useFloatLoop(config: FloatLoopConfig = {}) {
  const duration = config.duration ?? DEFAULT_DURATION;
  const distance = config.distance ?? DEFAULT_DISTANCE;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim, duration]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -distance],
  });

  return translateY;
}
