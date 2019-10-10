import React, { createContext, useReducer } from 'react'
import { ISettings } from '../types/settings.interface'
import { ISession } from '../types/session.interface'

export interface ITimerState {
  seconds: number
  isRunning: boolean
  isFinished: boolean
  endTime: number
}

const defaultTimerState: ITimerState = {
  seconds: 0,
  isRunning: false,
  isFinished: true,
  endTime: 0,
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
  timer: defaultTimerState,
}

interface IAppStateContextValue {
  state: IAppState
  dispatch: React.Dispatch<Action>
}
export const AppStateContext = createContext<IAppStateContextValue>({
  state: defaultState,
  dispatch: () => {},
})

export interface IAppState {
  settings: ISettings
  currentSession?: ISession
  settingsPopupShown: boolean
  timer: ITimerState
}

export enum ACTIONS {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_TIMER_STATE = 'SET_TIMER_STATE',
  SET_CURRENT_SESSION = 'SET_CURRENT_SESSION',
  SET_SETTINGS_VISIBILITY = 'SET_SETTINGS_VISIBILITY',
  TIMER_SET_TIME = 'TIMER_SET_TIME',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER',
  RESET_TIMER = 'RESET_TIMER',
  DECREASE_TIMER = 'DECREASE_TIMER',
}
export type Action =
  | { type: ACTIONS.SET_SETTINGS, payload: ISettings }
  | { type: ACTIONS.SET_TIMER_STATE, payload: ITimerState }
  | { type: ACTIONS.SET_CURRENT_SESSION, payload: ISession }
  | { type: ACTIONS.SET_SETTINGS_VISIBILITY, payload: boolean }
  | { type: ACTIONS.TIMER_SET_TIME, payload: number }
  | { type: ACTIONS.START_TIMER }
  | { type: ACTIONS.STOP_TIMER }
  | { type: ACTIONS.RESET_TIMER }
  | { type: ACTIONS.DECREASE_TIMER }

function reducer(state: IAppState, action: Action): IAppState {
  const now = Date.now()

  switch (action.type) {
    case ACTIONS.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      }
    case ACTIONS.SET_TIMER_STATE:
      return {
        ...state,
        timer: {
          ...state.timer,
          ...action.payload,
        },
      }
    case ACTIONS.SET_CURRENT_SESSION:
      if (state.timer.isFinished) {
        return {
          ...state,
          currentSession: action.payload,
          timer: {
            ...state.timer,
            seconds: action.payload.length,
          },
        }
      }
      return {
        ...state,
        currentSession: action.payload,
      }
    case ACTIONS.SET_SETTINGS_VISIBILITY:
      return {
        ...state,
        settingsPopupShown: action.payload,
      }
    case ACTIONS.TIMER_SET_TIME:
      return {
        ...state,
        timer: {
          ...state.timer,
          seconds: action.payload,
        },
      }
    case ACTIONS.START_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true,
          isFinished: false,
          endTime: now + (state.timer.seconds * 1000),
        },
      }
    case ACTIONS.STOP_TIMER:
      const { endTime } = state.timer
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          endTime: 0,
        },
      }
    case ACTIONS.RESET_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          isFinished: true,
          seconds: state.currentSession ? state.currentSession.length : 0,
        },
      }
    case ACTIONS.DECREASE_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          seconds: state.timer.seconds - 1,
        },
      }
    default:
      return state
  }
}

interface IAppStateContextProviderProps {
  value?: IAppState
}
export const AppStateContextProvider: React.FC<IAppStateContextProviderProps> = (props) => {
  const { children, value } = props
  const [state, dispatch] = useReducer(reducer, value || defaultState)
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}
