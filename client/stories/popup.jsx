import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Popup from '../components/Popup';

storiesOf('Popup', module)
  .add('default', () => (
    <Popup>
      PopupContent
    </Popup>
  ));
