import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Timer from '../components/Timer';

storiesOf('Timer', module)
  .add('default', () => (
    <Timer />
  ))
  .add('01:01', () => (
    <Timer seconds={61} />
  ))
  .add('10:10', () => (
    <Timer seconds={610} />
  ));
