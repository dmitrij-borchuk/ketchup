import { DEFAULT_SESSION_LENGTH } from '../constants';
import {
  createDispatch,
  createStoreMock,
  getFirstCallForActionType,
} from '../testHelpers';

import {
  setTimer,
  SET_TIMER,
  RESET_TIMER,
  resetTimer,
  STOP_TIMER,
  startTimer,
  stopTimer,
} from './timer';

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
    const getStateMock = createStoreMock({
      app: {
        settings: {},
        currentSession: {
          length: DEFAULT_SESSION_LENGTH,
        },
      },
    });
    resetTimer()(dispatchMock, getStateMock.getState);
    const actionCall = dispatchMock.mock.calls.filter(call => call[0].type === RESET_TIMER)[0];

    expect(actionCall[0]).toEqual({
      type: RESET_TIMER,
      payload: {
        seconds: DEFAULT_SESSION_LENGTH,
      },
    });
  });
  it('`resetTimer` action should stop timer', () => {
    const dispatchMock = jest.fn();
    const getStateMock = createStoreMock({
      app: {
        settings: {},
        currentSession: {
          length: DEFAULT_SESSION_LENGTH,
        },
      },
    });
    resetTimer()(dispatchMock, getStateMock.getState);
    const actionCall = dispatchMock.mock.calls.filter(call => call[0].type === RESET_TIMER)[0];

    expect(actionCall[0].type).toEqual(RESET_TIMER);
  });
  it('`startTimer` action should set max time for timer if time is 00:00', () => {
    const state = {
      app: {
        settings: {},
        currentSession: {
          length: DEFAULT_SESSION_LENGTH,
        },
      },
      timer: {
        seconds: 0,
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);

    startTimer()(dispatch, () => state);

    const actionCall = getFirstCallForActionType(dispatchMock, RESET_TIMER);
    expect(actionCall[0].payload).toEqual({
      seconds: DEFAULT_SESSION_LENGTH,
    });
  });
  it('if timer is started it should count seconds from max to 0', () => {
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: DEFAULT_SESSION_LENGTH,
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
    expect(actionCall[0].payload).toEqual(DEFAULT_SESSION_LENGTH - skipSeconds);
  });
  it('`stopTimer` should clear timeout', () => {
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: DEFAULT_SESSION_LENGTH,
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
    expect(actionCall[0].payload).toEqual(DEFAULT_SESSION_LENGTH - skipSeconds);
    const callsCount = dispatchMock.mock.calls.length;

    const stopDispatchMock = jest.fn();
    const stopDispatch = createDispatch(state, stopDispatchMock);

    stopDispatch(stopTimer());
    jest.advanceTimersByTime(msInSec * skipSeconds);

    actionCall = getFirstCallForActionType(dispatchMock, SET_TIMER);
    expect(dispatchMock.mock.calls.length).toEqual(callsCount);
  });
  it('after reaching 0 timer should stop', () => {
    const Audio = function Audio() {
      this.play = () => {};
    };
    /* eslint-disable-next-line no-undef */
    window.Audio = Audio;
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: 1,
        isStarted: false,
      },
      app: {
        settings: {},
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

    const dispatchCalls = dispatchMock.mock.calls.length;
    jest.advanceTimersByTime(msInSec * 1);
    expect(dispatchMock.mock.calls.length).toEqual(dispatchCalls);
  });
  it('sound should play if timer reached 0', () => {
    const playMock = jest.fn();
    const Audio = function Audio() {
      this.play = playMock;
    };
    /* eslint-disable-next-line no-undef */
    window.Audio = Audio;
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: 1,
        isStarted: false,
      },
      app: {
        settings: {
          playSound: true,
        },
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);
    const msInSec = 1000;

    startTimer()(dispatch, () => state);
    state.timer.seconds -= 1;
    jest.advanceTimersByTime(msInSec * 1);

    expect(playMock.mock.calls.length).toEqual(1);
  });
  it('sound shouldn\'t play if timer is reset', () => {
    const playMock = jest.fn();
    const Audio = function Audio() {
      this.play = playMock;
    };
    /* eslint-disable-next-line no-undef */
    window.Audio = Audio;
    jest.useFakeTimers();

    const state = {
      timer: {
        seconds: 1,
        isStarted: false,
      },
      app: {
        settings: {},
        currentSession: {
          length: DEFAULT_SESSION_LENGTH,
        },
      },
    };
    const dispatchMock = jest.fn();
    const dispatch = createDispatch(state, dispatchMock);
    const msInSec = 1000;

    startTimer()(dispatch, () => state);
    state.timer.seconds -= 1;
    resetTimer()(dispatch, () => state);
    jest.advanceTimersByTime(msInSec * 1);

    expect(playMock.mock.calls.length).toEqual(0);
  });

  afterEach(() => jest.clearAllTimers());
});
