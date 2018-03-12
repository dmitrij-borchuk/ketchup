import { SECONDS_IN_SESSION } from '../constants';

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

export const resetTimer = () => (dispatch) => {
  dispatch(stopTimer());
  dispatch(setTimer(SECONDS_IN_SESSION));
  clearTimeout(timeout);
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
    }
    dispatch(setTimer(newSeconds));
    timeout = setTimeout(updateTimer, msInSec);
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
