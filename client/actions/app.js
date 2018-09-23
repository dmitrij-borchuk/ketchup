import { STORAGE_GET } from '../utils/localStorageMiddleware';
import { LOCAL_STORAGE_KEYS, SECONDS_IN_SESSION } from '../constants';
import { setTimer } from './timer';

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

export const SETTINGS_RESTORE = 'SETTINGS_RESTORE';
export const restoreSettings = () => (dispatch) => {
  const settings = dispatch({
    type: STORAGE_GET,
    payload: LOCAL_STORAGE_KEYS.SETTINGS,
  });
  dispatch(setSettings(settings || {}));
  return dispatch(
    setTimer(settings.sesLength || SECONDS_IN_SESSION),
  );
};
