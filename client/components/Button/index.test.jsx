
import React from 'react';
import { shallow, render } from 'enzyme';
import Component from './index';

describe('Button component', () => {
  it('should render text', () => {
    const text = 'ButtonText';

    const rendered = render(
      <Component>
        {text}
      </Component>,
    );

    expect(rendered.text()).toEqual(text);
  });
  it('should have `onClick` event', () => {
    const cb = jest.fn();

    const rendered = shallow(
      <Component onClick={cb}>
        text
      </Component>,
    );
    rendered.simulate('click');

    expect(cb.mock.calls.length).toEqual(1);
  });
});
