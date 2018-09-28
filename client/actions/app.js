import shortid from 'shortid';
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

export const SETTINGS_SET_CURRENT_SESSION = 'SETTINGS_SET_CURRENT_SESSION';
export const setCurrentSession = session => ({
  type: SETTINGS_SET_CURRENT_SESSION,
  payload: session,
});

const processSessions = (sessions = []) => {
  const defaultSession = {
    id: shortid.generate(),
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
  const processedSessions = processSessions(settings.sessions);
  const defaultSession = processedSessions[0];
  dispatch(setSettings({
    ...settings,
    sessions: processedSessions,
  }));
  dispatch(setCurrentSession(defaultSession));
  return dispatch(
    setTimer(defaultSession.length),
  );
};
