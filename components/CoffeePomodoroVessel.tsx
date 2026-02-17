import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { VesselFrame } from './VesselFrame';

// Mug dimensions: wider than tall, ~20% narrower than original reference
const CUP_WIDTH = 160;
const CUP_HEIGHT = 180;
const DISPLAY_SCALE = 1.3;
const PADDING = 4;
const MAX_FILL_HEIGHT = CUP_HEIGHT - PADDING * 2 - 8; // fill to near top, no foam
const R = 20 * DISPLAY_SCALE; // border radius scaled for display

type Props = {
  fill: number; // 0..1
};

export function CoffeePomodoroVessel({ fill }: Props) {
  const fillAnim = useRef(new Animated.Value(fill)).current;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: fill,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [fill, fillAnim]);

  const fillHeight = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_FILL_HEIGHT],
  });

  const w = CUP_WIDTH * DISPLAY_SCALE;
  const h = CUP_HEIGHT * DISPLAY_SCALE;

  return (
    <VesselFrame width={w} height={h}>
      <View style={[styles.cupContainer, { width: w, height: h }]}>
        {/* Coffee fill – rises from bottom */}
        <Animated.View
          style={[
            styles.coffeeFill,
            {
              height: fillHeight,
            },
          ]}
        />

        {/* Cup body – white, bold black outline, rounded (clearly a mug) */}
        <View style={styles.cup}>
          <View style={styles.handle} />
          <View style={styles.face}>
            <View style={styles.eyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View style={styles.cheeks}>
              <View style={styles.cheek} />
              <View style={styles.cheek} />
            </View>
            <View style={styles.smile} />
          </View>
        </View>
      </View>
    </VesselFrame>
  );
}

const styles = StyleSheet.create({
  cupContainer: {
    position: 'relative',
  },
  cup: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: R,
    overflow: 'visible',
  },
  coffeeFill: {
    position: 'absolute',
    bottom: PADDING,
    left: PADDING,
    right: PADDING,
    backgroundColor: '#6B4423',
    borderBottomLeftRadius: R - 4,
    borderBottomRightRadius: R - 4,
    zIndex: 1,
  },
  handle: {
    position: 'absolute',
    right: -32,
    top: 50,
    width: 44,
    height: 60,
    borderWidth: 4,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopRightRadius: R + 2,
    borderBottomRightRadius: R + 2,
    backgroundColor: '#fff',
  },
  face: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 36,
    marginBottom: 8,
  },
  eye: {
    width: 12,
    height: 18,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  cheeks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 72,
    marginBottom: 8,
  },
  cheek: {
    width: 18,
    height: 10,
    backgroundColor: '#FF6B7A',
    borderRadius: 2,
  },
  smile: {
    width: 52,
    height: 6,
    backgroundColor: '#000',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
});
