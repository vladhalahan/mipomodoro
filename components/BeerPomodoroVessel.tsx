import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
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
const VIEWBOX_HEIGHT = 170;
const GLASS_TOP_Y = 28;
const GLASS_BOTTOM_Y = 138;
const LIQUID_HEIGHT = GLASS_BOTTOM_Y - GLASS_TOP_Y;

// Reference style: bold outline, white bubbles with subtle outline
const GLASS_STROKE = 'rgba(255,255,255,0.7)';
const GLASS_STROKE_WIDTH = 2.2;
const BUBBLE_FILL = 'rgba(255,255,255,0.9)';
const BUBBLE_STROKE = 'rgba(0,0,0,0.15)';

type Props = {
  fill: number; // 0..1
};

export function BeerPomodoroVessel({ fill }: Props) {
  const { animatedProps } = useFillClipAnimation(fill, {
    clipBottomY: GLASS_BOTTOM_Y,
    clipHeight: LIQUID_HEIGHT,
    viewBoxWidth: VIEWBOX_WIDTH,
  });

  const floatTranslateY = useFloatLoop({ duration: 2500, distance: 12 });

  const { translateY: bubblesTranslateY, opacity: bubblesOpacity } =
    useLoopAnimation({
      duration: 4000,
      translateY: [0, -60],
      opacity: [0.8, 0.4, 0],
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
          {/* Beer: amber/gold, lighter near foam */}
          <LinearGradient id="beerGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#E8B84A" stopOpacity="0.95" />
            <Stop offset="30%" stopColor="#D4A02C" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#B8860B" stopOpacity="0.9" />
          </LinearGradient>
          {/* Glass highlight (left edge) */}
          <LinearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <Stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
          {/* Foam: creamy with slight depth (grey-blue tint in shadows) */}
          <LinearGradient id="foamGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFFEF8" stopOpacity="1" />
            <Stop offset="70%" stopColor="#F5EDE0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E8E4DC" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="foamShadow" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#D0D4D8" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#D0D4D8" stopOpacity="0" />
          </LinearGradient>
          {/* Empty glass: subtle fill so frame is visible when fill=0 */}
          <LinearGradient id="emptyGlassFill" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
          </LinearGradient>
          <ClipPath id="beerClip">
            <AnimatedRect
              x={0}
              y={GLASS_BOTTOM_Y}
              width={VIEWBOX_WIDTH}
              height={0}
              animatedProps={animatedProps}
            />
          </ClipPath>
        </Defs>

        {/* Base shadow (grounding) */}
        <Ellipse
          cx="55"
          cy="156"
          rx="32"
          ry="4"
          fill="rgba(0,0,0,0.2)"
        />

        {/* Glass frame: body + thick base, bold outline (reference style) */}
        <Path
          d="M 38 28 L 32 136 Q 30 140 28 144 L 26 148 Q 55 153 84 148 L 82 144 Q 80 140 78 136 L 82 28 Z"
          fill="url(#emptyGlassFill)"
          stroke={GLASS_STROKE}
          strokeWidth={GLASS_STROKE_WIDTH}
        />

        {/* Base top highlight (thick glass lip) */}
        <Path
          d="M 32 136 Q 30 140 28 144 L 26 148 Q 55 153 84 148 L 82 144 Q 80 140 78 136 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.2"
        />

        {/* Liquid + foam (clipped by fill) */}
        <G clipPath="url(#beerClip)">
          {/* Beer body */}
          <Path
            d="M 38 28 L 32 136 Q 30 140 28 144 L 26 148 Q 55 153 84 148 L 82 144 Q 80 140 78 136 L 82 28 Z"
            fill="url(#beerGradient)"
          />
          {/* Glass shine (vertical highlight on left) */}
          <Path
            d="M 39 30 L 33 130 Q 33 134 38 134 L 44 134 Q 46 134 46 130 L 48 30 Z"
            fill="url(#glassShine)"
          />
          {/* Foam head */}
          <Ellipse cx="55" cy="30" rx="20" ry="9" fill="url(#foamGradient)" />
          <Circle cx="42" cy="28" r="5" fill="url(#foamGradient)" opacity="0.95" />
          <Circle cx="55" cy="26" r="6" fill="url(#foamGradient)" opacity="0.98" />
          <Circle cx="68" cy="28" r="5" fill="url(#foamGradient)" opacity="0.95" />
          <Circle cx="50" cy="22" r="4" fill="#FFFEF8" opacity="0.9" />
          <Circle cx="62" cy="22" r="3.5" fill="#FFFEF8" opacity="0.9" />
          {/* Overflow foam cascade (when full - reference: cascading down front) */}
          <Path
            d="M 45 26 Q 55 38 65 26 Q 58 32 55 28 Q 52 32 45 26 Z"
            fill="url(#foamGradient)"
            opacity="0.95"
          />
          <Path
            d="M 50 30 L 55 42 L 60 30 Q 55 34 50 30 Z"
            fill="url(#foamShadow)"
          />
        </G>

        {/* Rim: bold highlight (reference: brighter white oval on top) */}
        <Ellipse
          cx="55"
          cy="30"
          rx="19"
          ry="8"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.8"
        />
      </Svg>

      <Animated.View
        style={[
          styles.bubblesOverlay,
          {
            opacity: bubblesOpacity ?? 1,
            transform: [{ translateY: bubblesTranslateY ?? 0 }],
          },
        ]}
        pointerEvents="none"
      >
        <Svg
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        >
          {/* Bubbles: white with thin outline (reference), more towards top */}
          <Circle cx="44" cy="112" r="2" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.4" opacity="0.6" />
          <Circle cx="52" cy="98" r="2.5" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.35" opacity="0.7" />
          <Circle cx="60" cy="105" r="1.8" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.3" opacity="0.55" />
          <Circle cx="48" cy="85" r="1.5" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.3" opacity="0.65" />
          <Circle cx="56" cy="78" r="2" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.35" opacity="0.75" />
          <Circle cx="64" cy="90" r="1.2" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.25" opacity="0.5" />
          <Circle cx="42" cy="72" r="1.6" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.3" opacity="0.6" />
          <Circle cx="68" cy="82" r="1.4" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.28" opacity="0.55" />
          <Circle cx="50" cy="62" r="2.2" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.4" opacity="0.7" />
          <Circle cx="58" cy="55" r="1.5" fill={BUBBLE_FILL} stroke={BUBBLE_STROKE} strokeWidth="0.3" opacity="0.65" />
        </Svg>
      </Animated.View>
    </VesselFrame>
  );
}

const styles = StyleSheet.create({
  bubblesOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: VIEWBOX_WIDTH,
    height: VIEWBOX_HEIGHT,
  },
});
