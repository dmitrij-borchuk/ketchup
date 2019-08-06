import * as shortid from 'shortid';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  STORAGE_GET,
  STORAGE_SET,
} from '../utils/localStorageMiddleware';
import {
  LOCAL_STORAGE_KEYS,
  DEFAULT_SESSION_LENGTH,
  DEFAULT_SESSION_NAME,
} from '../constants';
import { ISettings } from '../types/settings.interface';
import { ISession } from '../types/session.interface';
import { IState } from '../reducers';
import { setTimer } from './timer';

// export const SEND_MESSAGE = 'SEND_MESSAGE'
// export const DELETE_MESSAGE = 'DELETE_MESSAGE'

// interface SendMessageAction {
//   type: typeof SEND_MESSAGE
//   payload: Message
// }

// interface DeleteMessageAction {
//   type: typeof DELETE_MESSAGE
//   meta: {
//     timestamp: number
//   }
// }

export const SHOW_SETTINGS = 'SHOW_SETTINGS';
interface IShowSettingsAction {
  type: typeof SHOW_SETTINGS
}
export const showSettings = (): IShowSettingsAction => ({
  type: SHOW_SETTINGS,
});

export const HIDE_SETTINGS = 'HIDE_SETTINGS';
interface IHideSettingsAction {
  type: typeof HIDE_SETTINGS
}
export const hideSettings = (): IHideSettingsAction => ({
  type: HIDE_SETTINGS,
});

export const SET_SETTINGS = 'SET_SETTINGS';
interface ISetSettingsAction {
  type: typeof SET_SETTINGS
  payload: ISettings
}
export const setSettings = (data: ISettings): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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
  }
};

export const SETTINGS_SET_CURRENT_SESSION = 'SETTINGS_SET_CURRENT_SESSION';
interface ISetCurrentSessionAction {
  type: typeof SETTINGS_SET_CURRENT_SESSION
  payload: ISession
}
export const setCurrentSession = (session: ISession): ThunkAction<ISetCurrentSessionAction, IState, {}, AnyAction> => {
  return (dispatch, getState): ISetCurrentSessionAction => {
    const state = getState();

    dispatch({
      type: STORAGE_SET,
      payload: {
        key: LOCAL_STORAGE_KEYS.LAST_SESSION_ID,
        data: session.id,
      },
    });

    if (state.timer.isFinished) {
      dispatch(setTimer(session.length));
    }

    return dispatch({
      type: SETTINGS_SET_CURRENT_SESSION,
      payload: session,
    });
  }
};

const processSessions = (sessions: ISession[] = []) => {
  const defaultSession = {
    id: shortid.generate(),
    length: DEFAULT_SESSION_LENGTH,
    name: DEFAULT_SESSION_NAME,
  };

  return sessions.length ? sessions : [defaultSession];
};
export const SETTINGS_RESTORE = 'SETTINGS_RESTORE';
interface IRestoreSettingsAction {
  type: typeof SETTINGS_RESTORE
  payload: ISession
}
export const restoreSettings = (): ThunkAction<ISetCurrentSessionAction, IState, {}, AnyAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: STORAGE_GET,
      payload: LOCAL_STORAGE_KEYS.SETTINGS,
    });
    const settings = getState().app.settings;
    // const settings = dispatch({
    //   type: STORAGE_GET,
    //   payload: LOCAL_STORAGE_KEYS.SETTINGS,
    // }) || {};
    const lastSessionId: any = dispatch({
      type: STORAGE_GET,
      payload: LOCAL_STORAGE_KEYS.LAST_SESSION_ID,
    });
    const processedSessions = processSessions(settings.sessions);
    const defaultSession = processedSessions[0];
    const lastSession = processedSessions.find(ses => ses.id === lastSessionId);
    dispatch(setSettings({
      ...settings,
      sessions: processedSessions,
    }));
    return dispatch(setCurrentSession(lastSession || defaultSession));
  }
};

export type ChatActionTypes = 
  IShowSettingsAction |
  ISetSettingsAction |
  ISetCurrentSessionAction |
  IHideSettingsAction;
