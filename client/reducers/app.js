import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  SET_SETTINGS,
  SETTINGS_SET_CURRENT_SESSION,
} from '../actions/app';

const defaultState = {
  settings: {
    sesLength: true,
    sessions: [],
  },
  // Here is `undefined` instead of `null`
  // because default prop will be applied only if value is `undefined`
  currentSession: undefined,
  settingsPopupShown: false,
};

export default function (state = defaultState, action) {
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
