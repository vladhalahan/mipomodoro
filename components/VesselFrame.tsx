import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type Props = {
  width: number;
  height: number;
  floatTranslateY?: Animated.AnimatedInterpolation<number>;
  children: React.ReactNode;
};

/**
 * Wrapper for vessel SVG area; optional float animation.
 */
export function VesselFrame({
  width,
  height,
  floatTranslateY,
  children,
}: Props) {
  const content = <View style={[styles.svgWrap, { width, height }]}>{children}</View>;
  if (floatTranslateY != null) {
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: floatTranslateY }] }]}
      >
        {content}
      </Animated.View>
    );
  }
  return <View style={styles.container}>{content}</View>;
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
