import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button';

storiesOf('Button', module)
  .add('default', () => (
    <Button />
  ))
  .add('With text', () => (
    <Button>
      Button text
    </Button>
  ))
  .add('With callback', () => (
    <Button onClick={action('Clicked')}>
      Button text
    </Button>
  ))
  .add('with very long', () => (
    <Button>
      {/* eslint-disable-next-line max-len */}
      Button with very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text
    </Button>
  ));
