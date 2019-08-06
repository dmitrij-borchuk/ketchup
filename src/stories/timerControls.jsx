import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import TimerControls from '../components/TimerControls';

const Container = styled.div`
  background: red;
  padding: 20px;
`;

storiesOf('TimerControls (need to add bg)', module)
  .add('default', () => (
    <Container>
      <TimerControls
        onStartClick={action('onStart Clicked')}
        onPauseClick={action('onPause Clicked')}
        onFinishClick={action('onFinish Clicked')}
      />
    </Container>
  ))
  .add('isStarted', () => (
    <Container>
      <TimerControls
        isStarted
        onStartClick={action('onStart Clicked')}
        onPauseClick={action('onPause Clicked')}
        onFinishClick={action('onFinish Clicked')}
      />
    </Container>
  ));
