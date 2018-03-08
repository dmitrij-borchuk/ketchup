import { setTimer, SET_TIMER } from './timer';

describe('Timer actions', () => {
  it('setTimer ', () => {
    const seconds = 50;
    const action = setTimer(seconds);

    expect(action).toEqual({ type: SET_TIMER, payload: seconds });
  });
  it('`setTimer` action should not count less than 0 minutes or seconds ', () => {
    const seconds = -50;
    const action = setTimer(seconds);

    expect(action).toEqual({ type: SET_TIMER, payload: 0 });
  });
});
