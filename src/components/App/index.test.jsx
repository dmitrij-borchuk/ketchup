
import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app.component';

jest.mock('../Settings/settings.container');

describe('App component', () => {
  it('should render application', () => {
    const rendered = shallow(
      <App
        showSettings={() => {}}
        settingsPopupShown={false}
        sessions={[]}
        setCurrentSession={() => {}}
        currentSession={{
          id: 'id',
          name: 'name',
          length: 300,
        }}
      />,
    );

    expect(rendered.length).toEqual(1);
  });
});
