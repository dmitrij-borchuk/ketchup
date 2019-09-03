
// import React from 'react';
// import { render, shallow } from 'enzyme';
// import Component from './index';

// describe('Timer controls', () => {
//   const startText = 'Start';
//   const pauseText = 'Pause';
//   const finishText = 'Finish';

//   it('should render Start button', () => {
//     const rendered = render(
//       <Component />,
//     );

//     expect(rendered.text().search(startText)).not.toEqual(-1);
//   });
//   it('should render Pause button', () => {
//     const rendered = render(
//       <Component isStarted />,
//     );

//     expect(rendered.text().search(pauseText)).not.toEqual(-1);
//   });
//   it('should render Finish button', () => {
//     const rendered = render(
//       <Component />,
//     );

//     expect(rendered.text().search(finishText)).not.toEqual(-1);
//   });
//   it('Start and Pause buttons shouldn\'t be shoun at once', () => {
//     let rendered = render(
//       <Component />,
//     );
//     let hasStart = rendered.text().search(startText) >= 0;
//     let hasPause = rendered.text().search(pauseText) >= 0;
//     expect(hasStart && hasPause).not.toEqual(true);

//     rendered = render(
//       <Component isStarted />,
//     );
//     hasStart = rendered.text().search(startText) >= 0;
//     hasPause = rendered.text().search(pauseText) >= 0;
//     expect(hasStart && hasPause).not.toEqual(true);
//   });
//   it('should have `onClick` event on Start button', () => {
//     const cb = jest.fn();

//     const rendered = shallow(
//       <Component onStartClick={cb} />,
//     );
//     const button = rendered.find('Button').filterWhere(wrap => wrap.props().children === startText);
//     expect(button.length).toEqual(1);
//     button.props().onClick();

//     expect(cb.mock.calls.length).toEqual(1);
//   });
//   it('should have `onClick` event on Pause button', () => {
//     const cb = jest.fn();

//     const rendered = shallow(
//       <Component
//         onPauseClick={cb}
//         isStarted
//       />,
//     );
//     const button = rendered.find('Button').filterWhere(wrap => wrap.props().children === pauseText);
//     expect(button.length).toEqual(1);
//     button.props().onClick();

//     expect(cb.mock.calls.length).toEqual(1);
//   });
//   it('should have `onClick` event on Finish button', () => {
//     const cb = jest.fn();

//     const rendered = shallow(
//       <Component onFinishClick={cb} />,
//     );
//     const button = rendered.find('Button').filterWhere(wrap => wrap.props().children === finishText);
//     expect(button.length).toEqual(1);
//     button.props().onClick();

//     expect(cb.mock.calls.length).toEqual(1);
//   });
// });
