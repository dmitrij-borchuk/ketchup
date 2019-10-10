import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import CircularProgress from '../components/CircularProgress';

storiesOf('CircularProgress', module)
  .add('default', () => (
    <CircularProgress>
      Content
    </CircularProgress>
  )).add('with size', () => (
    <CircularProgress size="90vmin">
      Content
    </CircularProgress>
  )).add('with progress', () => (
    <CircularProgress
      size="90vmin"
      progress={30}
    >
      Content
    </CircularProgress>
  ));
