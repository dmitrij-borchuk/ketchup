
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Container from './container';

describe('Timer container', () => {
  it('should show time', () => {
    const store = createStore(() => {});

    const rendered = shallow(
      <Provider store={store}>
        <Container />
      </Provider>,
    );

    expect(rendered.text()).toEqual('<Connect(Timer) />');
  });
});
