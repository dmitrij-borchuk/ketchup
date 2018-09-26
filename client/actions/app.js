import {
  STORAGE_GET,
  STORAGE_SET,
} from '../utils/localStorageMiddleware';
import {
  LOCAL_STORAGE_KEYS,
  DEFAULT_SESSION_LENGTH,
  DEFAULT_SESSION_NAME,
} from '../constants';
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
export const setSettings = data => (dispatch) => {
  dispatch({
    type: STORAGE_SET,
    payload: {
      key: LOCAL_STORAGE_KEYS.SETTINGS,
      data,
    },
  });
  dispatch({
    type: SET_SETTINGS,
    payload: data,
  });
};

const processSessions = (sessions = []) => {
  const defaultSession = {
    length: DEFAULT_SESSION_LENGTH,
    name: DEFAULT_SESSION_NAME,
  };

  return sessions.length ? sessions : [defaultSession];
};
export const SETTINGS_RESTORE = 'SETTINGS_RESTORE';
export const restoreSettings = () => (dispatch) => {
  const settings = dispatch({
    type: STORAGE_GET,
    payload: LOCAL_STORAGE_KEYS.SETTINGS,
  }) || {};
  dispatch(setSettings({
    ...settings,
    sessions: processSessions(settings.sessions),
  }));
  return dispatch(
    setTimer(settings.sesLength || DEFAULT_SESSION_LENGTH),
  );
};
