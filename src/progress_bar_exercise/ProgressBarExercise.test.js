import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom'
import ProgressBarExercise from './ProgressBarExercise';

afterEach(cleanup);

it('ProgressBarExercise render correctly', () => {
  const {queryByTestId} = render(
    <ProgressBarExercise />,
  );
  expect(queryByTestId("progressBar")).toBeVisible();
  expect(queryByTestId("progressDone")).toHaveStyle("width: 0%");
});