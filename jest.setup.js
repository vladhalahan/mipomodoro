// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    createAnimatedComponent: (c) => c,
    useSharedValue: (v) => ({ value: v }),
    useAnimatedProps: (fn) => ({}),
    withTiming: (v) => v,
    Easing: {
      out: (e) => e,
      cubic: {},
    },
    interpolate: (v, i, o) => o[0],
    default: { View },
  };
});

// Silence Reanimated warning in tests
global.__reanimatedWorkletInit = () => {};
