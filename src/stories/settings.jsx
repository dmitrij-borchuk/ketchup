import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Settings from '../components/Settings';

const inputs = [
  {
    label: 'Session length',
    type: 'number',
    key: 'sesLength',
  }, {
    label: 'Some other very very very very very very very very long prop',
    type: 'string',
    key: 'longProp',
  },
];
const values = {
  sesLength: 25,
  longProp: 'Long Prop Value',
};

storiesOf('Settings', module)
  .add('default', () => (
    <Settings
      inputs={inputs}
      onChange={(key, val) => action(`Key: ${key}, value: ${val}`)()}
    />
  )).add('filled', () => (
    <Settings
      inputs={inputs}
      values={values}
    />
  ));
