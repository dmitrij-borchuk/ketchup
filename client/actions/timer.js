import alarmSound from '../assets/sounds/Twin-bell-alarm-clock-ringing-short.mp3';
import { playSound } from '../utils/soundManager';

let timeout = null;

export const SET_TIMER = 'SET_TIMER';
export const setTimer = seconds => ({
  type: SET_TIMER,
  payload: seconds >= 0 ? seconds : 0,
});

export const STOP_TIMER = 'STOP_TIMER';
export const stopTimer = () => {
  clearTimeout(timeout);
  return {
    type: STOP_TIMER,
  };
};

export const RESET_TIMER = 'RESET_TIMER';
export const resetTimer = () => (dispatch, getState) => {
  const state = getState();
  const {
    currentSession,
  } = state.app;

  clearTimeout(timeout);
  return dispatch({
    type: RESET_TIMER,
    payload: {
      seconds: currentSession.length,
    },
  });
};

export const START_TIMER = 'START_TIMER';
export const startTimer = () => (dispatch, getState) => {
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
  dispatch({
    type: START_TIMER,
  });

  timeout = setTimeout(updateTimer, msInSec);
};
