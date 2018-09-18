import {
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  SET_SETTINGS,
} from '../actions/app';
import {
  SETTINGS_KEYS,
  SECONDS_IN_SESSION,
} from '../constants';

const defaultState = {
  settings: {
    [SETTINGS_KEYS.SES_LENGTH]: SECONDS_IN_SESSION,
    [SETTINGS_KEYS.PLAY_SOUND]: true,
  },
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
    default:
      return state;
  }
}