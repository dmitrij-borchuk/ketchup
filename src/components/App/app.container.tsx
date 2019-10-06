import React, { useEffect, useContext, useCallback } from 'react'
import shortid from 'shortid'
import { App } from './app.component'
import { AppStateContext, ACTIONS, StorageContext } from '../../context'
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
  const { settings: { sessions }, currentSession, settingsPopupShown } = state
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

      dispatch({
        type: ACTIONS.TIMER_SET_TIME,
        payload: sessionToSet.length,
      })
    },
    [dispatch, getItem],
  )

  if (!currentSession) {
    return null
  }

  return (
    <App
      showSettings={showSettings}
      settingsPopupShown={settingsPopupShown}
      sessions={sessions}
      currentSession={currentSession}
      setCurrentSession={setCurrentSession}
    />
  )
}
