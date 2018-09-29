
import React from 'react';
import { shallow } from 'enzyme';
import Component from './index';

jest.mock('../Settings/container');

describe('App component', () => {
  it('should render application', () => {
    const rendered = shallow(
      <Component
        showSettings={() => {}}
        settingsPopupShown={false}
        sessions={[]}
      />,
    );

    expect(rendered.length).toEqual(1);
  });
});
