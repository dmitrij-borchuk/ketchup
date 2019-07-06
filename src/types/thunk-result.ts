import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IState } from '../reducers';

type ExtraArg = undefined;
export type ThunkResult<R> = ThunkAction<R, IState, ExtraArg, Action>;
