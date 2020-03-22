import React, { useEffect, useContext, useCallback } from 'react'
import shortid from 'shortid'
import { hot } from 'react-hot-loader'
import { App } from './app.component'
import { AppStateContext, ACTIONS, StorageContext, ITimerState } from '../../context'
import {
  LOCAL_STORAGE_KEYS,
  DEFAULT_SESSION_LENGTH,
  DEFAULT_SESSION_NAME,
} from '../../constants'
import { ISettings, ISession } from '../../types'

const processSessions = (sessions: ISession[] = []) => {
  const defaultSession = {
    id: shortid.generate(),
    length: DEFAULT_SESSION_LENGTH,
    name: DEFAULT_SESSION_NAME,
  }

  return sessions.length ? sessions : [defaultSession]
}

const defaultSettings: ISettings = {
  sessions: [],
  playSound: false,
}

export interface IAppContainerProps {
}
export const AppContainer: React.FC<IAppContainerProps> = () => {
  const { state, dispatch } = useContext(AppStateContext)
  const { settings: { sessions }, currentSession, timer } = state
  const { endTime, seconds, isFinished, isRunning } = timer
  const { getItem, setItem } = useContext(StorageContext)
  const showSettings = useCallback(
    () => {
      dispatch({
        type: ACTIONS.SET_SETTINGS_VISIBILITY,
        payload: true,
      })
    },
    [dispatch],
  )
  const setCurrentSession = useCallback(
    (session: ISession) => {
      dispatch({
        type: ACTIONS.SET_CURRENT_SESSION,
        payload: session,
      })
      setItem(LOCAL_STORAGE_KEYS.LAST_SESSION_ID, session.id)
    },
    [dispatch, setItem],
  )

  useEffect(
    () => {
      const settings = getItem<ISettings>(LOCAL_STORAGE_KEYS.SETTINGS) || defaultSettings
      const lastSessionId = getItem<string>(LOCAL_STORAGE_KEYS.LAST_SESSION_ID)
      const timerState = getItem<ITimerState>(LOCAL_STORAGE_KEYS.TIMER_STATE)
      const processedSessions = processSessions(settings.sessions)
      const defaultSession = processedSessions[0]
      const lastSession = processedSessions.find(ses => ses.id === lastSessionId)

      const sessionToSet = lastSession || defaultSession
      dispatch({
        type: ACTIONS.SET_SETTINGS,
        payload: {
          ...settings,
          sessions: processedSessions,
        },
      })
      dispatch({
        type: ACTIONS.SET_CURRENT_SESSION,
        payload: sessionToSet,
      })
      if (timerState) {
        const now = Date.now()
        const timerSeconds = timerState.isRunning
        ? Math.round((timerState.endTime - now) / 1000)
        : timerState.seconds
        const timerStateToSet = {
          isRunning: false,
          isFinished: true,
          ...(timerState || {}),
          seconds: timerSeconds >= 0 ? timerSeconds : 0,
        }
        dispatch({
          type: ACTIONS.SET_TIMER_STATE,
          payload: {
            ...timer,
            ...timerStateToSet,
          },
        })
      } else {
        dispatch({
          type: ACTIONS.TIMER_SET_TIME,
          payload: sessionToSet.length,
        })
      }

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, getItem],
  )

  useEffect(
    () => setItem(LOCAL_STORAGE_KEYS.TIMER_STATE, timer),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endTime, seconds, isFinished, isRunning],
  )

  if (!currentSession) {
    return null
  }

  return (
    <App
      showSettings={showSettings}
      sessions={sessions}
      currentSession={currentSession}
      setCurrentSession={setCurrentSession}
    />
  )
}

export default hot(module)(AppContainer)
