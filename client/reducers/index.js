import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import timer from './timer';

export default combineReducers({
  app,
  timer,
  form: formReducer,
});
