
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Container from './container';

describe('Timer controls container', () => {
  it('should show controls', () => {
    const store = createStore(() => {});

    const rendered = shallow(
      <Provider store={store}>
        <Container />
      </Provider>,
    );

    expect(rendered.text()).toEqual('<Connect(TimerControls) />');
  });
});
