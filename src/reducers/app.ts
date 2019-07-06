import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  SET_SETTINGS,
  SETTINGS_SET_CURRENT_SESSION,
  ChatActionTypes,
} from '../actions/app';
import { ISettings } from '../types/settings.interface';
import { ISession } from '../types/session.interface';

export interface IAppState {
  settings: ISettings
  currentSession?: ISession
  settingsPopupShown: boolean
}

const defaultState: IAppState = {
  settings: {
    sessions: [],
    playSound: false,
  },
  // Here is `undefined` instead of `null`
  // because default prop will be applied only if value is `undefined`
  currentSession: undefined,
  settingsPopupShown: false,
};

export default function (state = defaultState, action: ChatActionTypes) {
  switch (action.type) {
    case SHOW_SETTINGS:
      return {
        ...state,
        settingsPopupShown: true,
      };
    case HIDE_SETTINGS:
      return {
        ...state,
        settingsPopupShown: false,
      };
    case SET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case SETTINGS_SET_CURRENT_SESSION:
      return {
        ...state,
        currentSession: action.payload,
      };
    default:
      return state;
  }
}
