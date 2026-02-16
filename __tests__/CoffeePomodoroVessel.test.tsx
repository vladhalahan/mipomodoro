import React from 'react';
import { render } from '@testing-library/react-native';
import { CoffeePomodoroVessel } from '@/components/CoffeePomodoroVessel';

describe('CoffeePomodoroVessel', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<CoffeePomodoroVessel fill={0} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with different fill levels', () => {
    const { rerender, toJSON } = render(<CoffeePomodoroVessel fill={0} />);
    expect(toJSON()).toBeTruthy();
    rerender(<CoffeePomodoroVessel fill={0.5} />);
    expect(toJSON()).toBeTruthy();
    rerender(<CoffeePomodoroVessel fill={1} />);
    expect(toJSON()).toBeTruthy();
  });
});
