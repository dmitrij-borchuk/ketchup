
import React from 'react';
import { shallow } from 'enzyme';
import Component from './index';

describe('Circular progress', () => {
  xit('should render content', () => {
    const text = 'ButtonText';
    const item = <React.Component />;

    const rendered = shallow(
      <Component>
        {text}
      </Component>,
    );
    const renderedWithDiv = shallow(
      <Component>
        {item}
      </Component>,
    );

    expect(rendered.text()).toEqual(text);
    expect(renderedWithDiv.text()).toEqual('<Component />');
  });
  // it('should have `onClick` event', () => {
  //   const cb = jest.fn();

  //   const rendered = shallow(
  //     <Component onClick={cb}>
  //       text
  //     </Component>,
  //   );
  //   rendered.simulate('click');

  //   expect(cb.mock.calls.length).toEqual(1);
  // });
});
