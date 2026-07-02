# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android

# Run tests
npm test

# Run a single test file
npx jest __tests__/FillableVessel.test.tsx

# Watch mode
npm run test:watch

# Lint
npm run lint
```

## Architecture

This is a single-screen React Native (Expo) pomodoro timer app using **expo-router** (file-based routing). The app has one route: `app/index.tsx`.

**Timer state machine** (`app/index.tsx`): All timer logic lives in `PomodoroScreen`. The `TimerPhase` type (`constants/pomodoro.ts`) drives the UI: `idle -> work <-> paused_work`, `work -> rest <-> paused_rest`. The `elapsed` counter increments via `setInterval`; `remaining = duration - elapsed`.

**Fill animation**: During work, the vessel fills up (`fill = elapsed / WORK_DURATION_SEC`). During rest, it empties (`fill = 1 - elapsed / REST_DURATION_SEC`).

**Vessel components** (`components/`):
- `FillableVessel` — dispatcher that picks coffee vs beer vessel by `mode` prop
- `CoffeePomodoroVessel` — React Native `Animated.View`-based fill (no SVG)
- `BeerPomodoroVessel` — SVG-based fill using `react-native-svg` + `react-native-reanimated`
- `VesselFrame` — layout wrapper with optional float animation

**Hooks** (`hooks/`):
- `useFillClipAnimation` — shared Reanimated hook for SVG ClipPath liquid fill animation (used by beer vessel)
- `useFloatLoop` / `useLoopAnimation` — looping float animation utilities

**Constants** (`constants/pomodoro.ts`): Durations auto-shorten in `__DEV__` (40min work -> 1min, 20min rest -> 30s). `NOTICE_THRESHOLD = 0.2` controls when the "Coffee Break" / "Back to work" local notification fires (last 20% of each phase).

**Notifications**: `expo-notifications` fires an immediate local notification when entering the last 20% of each phase. Android requires a channel (`pomodoro`). The layout (`app/_layout.tsx`) sets foreground notification handler to show banners.

**Keep awake**: `expo-keep-awake` prevents screen lock while the timer is actively running (not paused/idle).

**Styling**: Each screen has a co-located `*.styles.ts` file. Dark theme throughout (`#1a1a2e` background).

**Tests** (`__tests__/`): Component smoke tests using `@testing-library/react-native` + `jest-expo`.
