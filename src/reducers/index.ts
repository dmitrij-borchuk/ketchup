import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import app, { IAppState } from './app';
import timer, { ITimerState } from './timer';

export interface IState {
  app: IAppState
  timer: ITimerState
}

export default combineReducers<IState>({
  app,
  timer,
  // form: formReducer,
});
