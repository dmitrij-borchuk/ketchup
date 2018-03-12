import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TimerControls from '../components/TimerControls';

storiesOf('TimerControls', module)
  .add('default', () => (
    <TimerControls
      onStartClick={action('onStart Clicked')}
      onPauseClick={action('onPause Clicked')}
      onFinishClick={action('onFinish Clicked')}
    />
  ))
  .add('isStarted', () => (
    <TimerControls
      isStarted
      onStartClick={action('onStart Clicked')}
      onPauseClick={action('onPause Clicked')}
      onFinishClick={action('onFinish Clicked')}
    />
  ));
