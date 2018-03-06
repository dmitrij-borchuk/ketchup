import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Hello from '../components/hello';

storiesOf('Hello', module)
  .add('with name', () => (
    <Hello name="TestName" />
  ));
