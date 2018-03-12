import {
  SET_TIMER,
  START_TIMER,
  STOP_TIMER,
} from '../actions/timer';
import { SECONDS_IN_SESSION } from '../constants';

const defaultState = {
  seconds: SECONDS_IN_SESSION,
  isStarted: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        seconds: action.payload,
      };
    case START_TIMER:
      return {
        ...state,
        isStarted: true,
      };
    case STOP_TIMER:
      return {
        ...state,
        isStarted: false,
      };
    default:
      return state;
  }
}
