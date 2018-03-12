import { SET_TIMER } from '../actions/timer';
import reducer from './timer';

describe('Timer reducer', () => {
  it('should set default state', () => {
    const newState = reducer(undefined, { type: null });
    const keys = Object.keys(newState);

    expect(keys).toContain('seconds');
  });
  it('seconds', () => {
    const state = { seconds: 100 };
    const newState = reducer(state, { type: SET_TIMER, payload: 500 });

    expect(newState).toEqual({ seconds: 500 });
  });
});
