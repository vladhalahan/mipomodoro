import { useEffect } from 'react';
import {
  createAnimatedComponent,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Rect } from 'react-native-svg';

export const AnimatedRect = createAnimatedComponent(Rect);

export type FillClipConfig = {
  clipBottomY: number;
  clipHeight: number;
  viewBoxWidth: number;
};

/**
 * Shared hook for liquid fill clip animation.
 * Returns fillValue and animatedProps for an AnimatedRect used as ClipPath content.
 */
export function useFillClipAnimation(fill: number, config: FillClipConfig) {
  const { clipBottomY, clipHeight } = config;
  const fillValue = useSharedValue(fill);

  useEffect(() => {
    fillValue.value = withTiming(fill, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [fill, fillValue]);

  const animatedProps = useAnimatedProps(() => {
    const h = interpolate(fillValue.value, [0, 1], [0, clipHeight]);
    const y = clipBottomY - h;
    return { y, height: h };
  });

  return { fillValue, animatedProps };
}
