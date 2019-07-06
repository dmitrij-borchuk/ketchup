import { playSound } from '../utils/soundManager';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IState } from '../reducers';

const alarmSound = require('../assets/sounds/Twin-bell-alarm-clock-ringing-short.mp3');
let timeout: ReturnType<typeof setTimeout>;

export interface ISetTimerAction {
  type: 'SET_TIMER';
  payload: number;
}
export interface IStartTimerAction {
  type: 'START_TIMER';
}
export interface IStopTimerAction {
  type: 'STOP_TIMER';
}
export interface IResetTimerAction {
  type: 'RESET_TIMER';
  payload: {
    seconds: number,
  };
}
export type TimerAction = ISetTimerAction | IStartTimerAction | IStopTimerAction | IResetTimerAction;

export const SET_TIMER = 'SET_TIMER';
export const setTimer = (seconds: number): ISetTimerAction => ({
  type: SET_TIMER,
  payload: seconds >= 0 ? seconds : 0,
});

export const STOP_TIMER = 'STOP_TIMER';
export const stopTimer = (): IStopTimerAction => {
  clearTimeout(timeout);
  return {
    type: STOP_TIMER,
  };
};

export const RESET_TIMER = 'RESET_TIMER';
export const resetTimer = (): ThunkAction<void, IState, null, AnyAction> => (dispatch, getState): IResetTimerAction => {
  const state = getState();
  const {
    currentSession,
  } = state.app;

  clearTimeout(timeout);
  return dispatch({
    type: RESET_TIMER,
    payload: {
      seconds: currentSession ? currentSession.length : 0,
    },
  });
};

export const START_TIMER = 'START_TIMER';
export const startTimer = (): ThunkAction<void, IState, null, AnyAction> => (dispatch, getState): IStartTimerAction => {
  const msInSec = 1000;
  clearTimeout(timeout);

  function updateTimer() {
    const currentState = getState();
    const newSeconds = currentState.timer.seconds - 1;
    if (newSeconds <= 0) {
      dispatch(stopTimer());
      if (currentState.app.settings.playSound) {
        playSound(alarmSound);
      }
    } else {
      timeout = setTimeout(updateTimer, msInSec);
    }
    dispatch(setTimer(newSeconds));
  }

  const state = getState();
  if (state.timer.seconds === 0) {
    dispatch(resetTimer());
  }
  timeout = setTimeout(updateTimer, msInSec);

  return {
    type: START_TIMER,
  };
};
