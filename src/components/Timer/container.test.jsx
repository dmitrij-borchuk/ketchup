
import React from 'react';
import { shallow } from 'enzyme';
import { TimerContainer } from './timer.container';

describe('Timer container', () => {
  it('should show time', () => {
    const rendered = shallow(<TimerContainer />);

    expect(rendered.text()).toEqual('<Timer />');
  });
});
