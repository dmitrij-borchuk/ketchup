
import React from 'react';
import { render } from 'enzyme';
import Component from './index';

describe('Settings component', () => {
  it('should render label text', () => {
    const input = {
      label: 'Session length',
      type: 'number',
      key: 'sesLength',
    };

    const rendered = render(
      <Component
        inputs={[input]}
        values={{
          sesLength: 5,
        }}
      />,
    );

    expect(rendered.text()).toEqual(input.label);
  });
});
