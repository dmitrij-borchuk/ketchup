import { SET_TIMER } from '../actions/timer';

const defaultState = {
  seconds: 65,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        seconds: action.payload,
      };
    default:
      return state;
  }
}
