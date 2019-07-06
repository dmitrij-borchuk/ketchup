import {
  SET_TIMER,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  TimerAction,
} from '../actions/timer';

export interface ITimerState {
  seconds: number
  isStarted: boolean
  isFinished: boolean
}

const defaultState: ITimerState = {
  seconds: 0,
  isStarted: false,
  isFinished: true,
};

export default function (state = defaultState, action: TimerAction) {
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
        isFinished: false,
      };
    case STOP_TIMER:
      return {
        ...state,
        isStarted: false,
      };
    case RESET_TIMER:
      return {
        ...state,
        isStarted: false,
        isFinished: true,
        seconds: action.payload.seconds,
      };
    default:
      return state;
  }
}
