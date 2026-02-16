import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type Props = {
  width: number;
  height: number;
  floatTranslateY: Animated.AnimatedInterpolation<number>;
  children: React.ReactNode;
};

/**
 * Shared wrapper: float animation + positioned SVG area for vessel content and overlays.
 */
export function VesselFrame({
  width,
  height,
  floatTranslateY,
  children,
}: Props) {
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: floatTranslateY }] }]}
    >
      <View style={[styles.svgWrap, { width, height }]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  svgWrap: {
    position: 'relative',
  },
});
