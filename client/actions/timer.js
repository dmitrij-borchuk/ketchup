export const SET_TIMER = 'SET_TIMER';
export const setTimer = seconds => ({
  type: SET_TIMER,
  payload: seconds >= 0 ? seconds : 0,
});
