
import React from 'react';
import { shallow } from 'enzyme';
import Component from './index';

describe('App component', () => {
  it('should render application', () => {
    const rendered = shallow(
      <Component />,
    );

    expect(rendered.length).toEqual(1);
  });
});
