
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';
import Component from './index';
import { createStoreMock } from '../../testHelpers';

describe('Settings component', () => {
  it('should render label text', () => {
    const input = {
      label: 'Session length',
      type: 'number',
      key: 'sesLength',
    };
    const storeMock = createStoreMock({});

    const rendered = render(
      <Provider store={storeMock}>
        <Component
          inputs={[input]}
          initialValues={{
            sesLength: 5,
          }}
        />
      </Provider>,
    );

    const label = rendered.find('label');

    expect(label.text()).toEqual(input.label);
  });
});
