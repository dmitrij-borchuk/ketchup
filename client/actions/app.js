export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const showSettings = () => ({
  type: SHOW_SETTINGS,
});

export const HIDE_SETTINGS = 'HIDE_SETTINGS';
export const hideSettings = () => ({
  type: HIDE_SETTINGS,
});

export const SET_SETTINGS = 'SET_SETTINGS';
export const setSettings = data => ({
  type: SET_SETTINGS,
  payload: data,
});
