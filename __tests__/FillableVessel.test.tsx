/// <reference types="jest" />
import React from 'react';
import { render } from '@testing-library/react-native';
import { FillableVessel } from '@/components/FillableVessel';

describe('FillableVessel', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <FillableVessel mode="coffee" fill={0} phase="idle" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders coffee vessel when mode is coffee', () => {
    const { toJSON } = render(
      <FillableVessel mode="coffee" fill={0.5} phase="work" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders beer vessel when mode is beer', () => {
    const { toJSON } = render(
      <FillableVessel mode="beer" fill={0} phase="idle" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('accepts fill and phase props', () => {
    const { rerender, toJSON } = render(
      <FillableVessel mode="coffee" fill={0} phase="idle" />
    );
    expect(toJSON()).toBeTruthy();
    rerender(
      <FillableVessel mode="coffee" fill={1} phase="work" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
