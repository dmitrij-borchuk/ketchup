
import React from 'react';
import { render } from 'enzyme';
import Component from './index';

const secondsInMinute = 60;

describe('Timer component', () => {
  it('should show time', () => {
    const minutes = 23;
    const seconds = 59;
    const allSeconds = (minutes * secondsInMinute) + seconds;

    const rendered = render(
      <Component
        seconds={allSeconds}
      />,
    );

    expect(rendered.text()).toEqual(`${minutes}:${seconds}`);
  });
  it('should show minutes less than 10 with preceding 0', () => {
    const minutes = 1;
    const seconds = 59;
    const allSeconds = (minutes * secondsInMinute) + seconds;

    const rendered = render(
      <Component
        seconds={allSeconds}
      />,
    );

    expect(rendered.text()).toEqual(`0${minutes}:${seconds}`);
  });
  it('should show seconds less than 10 with preceding 0', () => {
    const minutes = 10;
    const seconds = 1;
    const allSeconds = (minutes * secondsInMinute) + seconds;

    const rendered = render(
      <Component
        seconds={allSeconds}
      />,
    );

    expect(rendered.text()).toEqual(`${minutes}:0${seconds}`);
  });
});
