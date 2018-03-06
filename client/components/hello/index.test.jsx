import React from 'react';
import renderer from 'react-test-renderer';
import Component from './index';

describe('Hellp component', () => {
  it('should match snapshot', () => {
    const component = renderer.create(
      <Component name="TestName" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
