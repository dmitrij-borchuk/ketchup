import { SECONDS_IN_SESSION } from '../constants';
import { createDispatch } from '../testHelpers';

import {
  setTimer,
  SET_TIMER,
  resetTimer,
  STOP_TIMER,
  startTimer,
  stopTimer,
} from './timer';

function getFirstCallForActionType(mock, type) {
  return mock.mock.calls.filter(call => call[0].type === type)[0];
}

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
  it('`resetTimer` action should set seconds to max value', () => {
    const dispatchMock = jest.fn();
    resetTimer()(dispatchMock);
    const actionCall = dispatchMock.mock.calls.filter(call => call[0].type === SET_TIMER)[0];

    expect(actionCall[0]).toEqual({ type: SET_TIMER, payload: SECONDS_IN_SESSION });
  });
  it('`resetTimer` action should stop timer', () => {
    const dispatchMock = jest.fn();
    resetTimer()(dispatchMock);
    const actionCall = dispatchMock.mock.calls.filter(call => call[0].type === STOP_TIMER)[0];

    expect(actionCall[0]).toEqual({ type: STOP_TIMER });
  });
  it('`startTimer` action should set max time for timer if time is 00:00', () => {
    const state = {
      timer: {
        seconds: 0,
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);

    startTimer()(dispatch, () => state);

    const actionCall = getFirstCallForActionType(dispatchMock, SET_TIMER);
    expect(actionCall[0].payload).toEqual(SECONDS_IN_SESSION);
  });
  it('if timer is started it should count seconds from max to 0', () => {
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: SECONDS_IN_SESSION,
        isStarted: false,
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);
    const skipSeconds = 1;
    const msInSec = 1000;

    startTimer()(dispatch, () => state);
    jest.advanceTimersByTime(msInSec * skipSeconds);

    const actionCall = getFirstCallForActionType(dispatchMock, SET_TIMER);
    expect(actionCall[0].payload).toEqual(SECONDS_IN_SESSION - skipSeconds);
  });
  it('`stopTimer` should clear timeout', () => {
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: SECONDS_IN_SESSION,
        isStarted: false,
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);
    const skipSeconds = 1;
    const msInSec = 1000;

    startTimer()(dispatch, () => state);
    jest.advanceTimersByTime(msInSec * skipSeconds);

    let actionCall = getFirstCallForActionType(dispatchMock, SET_TIMER);
    expect(actionCall[0].payload).toEqual(SECONDS_IN_SESSION - skipSeconds);
    const callsCount = dispatchMock.mock.calls.length;

    const stopDispatchMock = jest.fn();
    const stopDispatch = createDispatch(state, stopDispatchMock);

    stopDispatch(stopTimer());
    jest.advanceTimersByTime(msInSec * skipSeconds);

    actionCall = getFirstCallForActionType(dispatchMock, SET_TIMER);
    expect(dispatchMock.mock.calls.length).toEqual(callsCount);
  });
  it('after reaching 0 timer should stop', () => {
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: 1,
        isStarted: false,
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);
    const msInSec = 1000;

    startTimer()(dispatch, () => state);
    state.timer.seconds -= 1;
    jest.advanceTimersByTime(msInSec * 1);

    const actionCall = getFirstCallForActionType(dispatchMock, STOP_TIMER);
    expect(actionCall).toBeDefined();
  });

  afterEach(() => jest.clearAllTimers());
});
