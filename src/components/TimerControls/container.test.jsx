
import React from 'react';
import { shallow } from 'enzyme';
import { TimerControlsContainer } from './container';

describe('Timer controls container', () => {
  it('should show controls', () => {

    const rendered = shallow(<TimerControlsContainer />);

    expect(rendered.text()).toEqual('<TimerControls /><TimerCounter />');
  });
});
