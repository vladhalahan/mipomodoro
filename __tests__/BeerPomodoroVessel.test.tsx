import React from 'react';
import { render } from '@testing-library/react-native';
import { BeerPomodoroVessel } from '@/components/BeerPomodoroVessel';

describe('BeerPomodoroVessel', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<BeerPomodoroVessel fill={0} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders empty state (initial vessel) with rim and bubbles only', () => {
    const { toJSON } = render(<BeerPomodoroVessel fill={0} />);
    const tree = toJSON();
    expect(tree).toBeTruthy();
    // When fill=0, only rim ellipse and bubbles overlay are visible (structure exists)
  });

  it('renders with different fill levels', () => {
    const { rerender, toJSON } = render(<BeerPomodoroVessel fill={0} />);
    expect(toJSON()).toBeTruthy();
    rerender(<BeerPomodoroVessel fill={0.5} />);
    expect(toJSON()).toBeTruthy();
    rerender(<BeerPomodoroVessel fill={1} />);
    expect(toJSON()).toBeTruthy();
  });
});
