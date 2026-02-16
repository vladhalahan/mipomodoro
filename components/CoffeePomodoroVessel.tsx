import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  G,
} from 'react-native-svg';
import { useFillClipAnimation, AnimatedRect } from '@/hooks/useFillClipAnimation';
import { useFloatLoop } from '@/hooks/useFloatLoop';
import { useLoopAnimation } from '@/hooks/useLoopAnimation';
import { VesselFrame } from './VesselFrame';

const VIEWBOX_WIDTH = 120;
const VIEWBOX_HEIGHT = 140;
const CUP_TOP_Y = 50;
const CUP_BOTTOM_Y = 120;
const LIQUID_HEIGHT = CUP_BOTTOM_Y - CUP_TOP_Y;

type Props = {
  fill: number; // 0..1
};

export function CoffeePomodoroVessel({ fill }: Props) {
  const { animatedProps } = useFillClipAnimation(fill, {
    clipBottomY: CUP_BOTTOM_Y,
    clipHeight: LIQUID_HEIGHT,
    viewBoxWidth: VIEWBOX_WIDTH,
  });

  const floatTranslateY = useFloatLoop({ duration: 2000, distance: 15 });

  const { translateY: steamTranslateY, opacity: steamOpacity } = useLoopAnimation({
    duration: 3000,
    translateY: [0, -40],
    opacity: [0.7, 0.3, 0],
  });

  return (
    <VesselFrame
      width={VIEWBOX_WIDTH}
      height={VIEWBOX_HEIGHT}
      floatTranslateY={floatTranslateY}
    >
      <Svg
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        <Defs>
          {/* Coffee: dark base + lighter surface highlight (gloss) */}
          <LinearGradient id="coffeeGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#8B6914" stopOpacity="1" />
            <Stop offset="25%" stopColor="#6F4E37" stopOpacity="1" />
            <Stop offset="100%" stopColor="#3D2817" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="coffeeSurface" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#A08050" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#6F4E37" stopOpacity="0.95" />
          </LinearGradient>
          {/* Ceramic: warm white with side shadow and highlight */}
          <LinearGradient id="cupGradient" x1="0" y1="0" x2="1" y2="0.5">
            <Stop offset="0%" stopColor="#D8D0C8" stopOpacity="1" />
            <Stop offset="35%" stopColor="#FFFBF7" stopOpacity="1" />
            <Stop offset="65%" stopColor="#FFFEFC" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E8E2DC" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="cupInnerShadow" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#000000" stopOpacity="0.06" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </LinearGradient>
          <ClipPath id="coffeeClip">
            <AnimatedRect
              x={0}
              y={CUP_BOTTOM_Y}
              width={VIEWBOX_WIDTH}
              height={0}
              animatedProps={animatedProps}
            />
          </ClipPath>
        </Defs>

        {/* Ceramic cup body with depth */}
        <Path
          d="M 30 50 L 35 110 Q 35 120 45 120 L 65 120 Q 75 120 75 110 L 80 50 Z"
          fill="url(#cupGradient)"
          stroke="#C4BDB5"
          strokeWidth="1.5"
        />
        {/* Inner shadow for depth */}
        <Path
          d="M 32 52 L 36 108 Q 36 116 45 116 L 65 116 Q 74 116 74 108 L 78 52 Z"
          fill="url(#cupInnerShadow)"
          stroke="none"
        />

        <G clipPath="url(#coffeeClip)">
          <Path
            d="M 30 50 L 35 110 Q 35 120 45 120 L 65 120 Q 75 120 75 110 L 80 50 Z"
            fill="url(#coffeeGradient)"
          />
          {/* Glossy surface ellipse */}
          <Ellipse
            cx="55"
            cy="52"
            rx="26"
            ry="8"
            fill="url(#coffeeSurface)"
          />
        </G>

        {/* Handle with subtle depth */}
        <Path
          d="M 80 60 Q 95 65 95 80 Q 95 95 80 100"
          stroke="#B8B0A8"
          strokeWidth="4"
          fill="none"
          opacity="0.9"
        />
        <Path
          d="M 80 60 Q 95 65 95 80 Q 95 95 80 100"
          stroke="url(#cupGradient)"
          strokeWidth="2.5"
          fill="none"
        />
      </Svg>

      <Animated.View
        style={[
          styles.steamOverlay,
          {
            opacity: steamOpacity ?? 1,
            transform: [{ translateY: steamTranslateY ?? 0 }],
          },
        ]}
        pointerEvents="none"
      >
        <Svg width={VIEWBOX_WIDTH} height={50} viewBox="0 0 120 50">
          <Path
            d="M 42 38 Q 38 28 44 18 Q 46 14 50 12"
            stroke="#E8E4E0"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          <Path
            d="M 52 36 Q 58 22 52 12 Q 50 8 55 6"
            stroke="#E0DCD8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <Path
            d="M 62 38 Q 68 28 62 18 Q 60 14 66 12"
            stroke="#E8E4E0"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          <Path
            d="M 48 40 Q 44 30 48 20"
            stroke="#D8D4D0"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <Path
            d="M 70 36 Q 74 26 70 16"
            stroke="#D8D4D0"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </Svg>
      </Animated.View>
    </VesselFrame>
  );
}

const styles = StyleSheet.create({
  steamOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: VIEWBOX_WIDTH,
    height: 50,
  },
});
