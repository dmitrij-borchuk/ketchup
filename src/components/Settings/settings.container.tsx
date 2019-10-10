import React, { useContext, useCallback } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import Component from './settings.component'
import { ISettings } from '../../types/settings.interface'
import { AppStateContext, ACTIONS, StorageContext } from '../../context'
import { LOCAL_STORAGE_KEYS } from '../../constants';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

export interface ISettingsContainerProps {
}

export const SettingsContainer: React.FC<ISettingsContainerProps> = () => {
  const { state, dispatch } = useContext(AppStateContext)
  const { setItem } = useContext(StorageContext)
  const { timer: { isFinished }, currentSession, settings } = state
  const hideSettings = useCallback(
    () => dispatch({
      type: ACTIONS.SET_SETTINGS_VISIBILITY,
      payload: false,
    }),
    [dispatch],
  )
  const onSubmit = useCallback(
    (data: ISettings) => {
      const parsedData: ISettings = {
        playSound: data.playSound,
        sessions: data.sessions.map(session => ({
          ...session,
          length: session.length,
        })),
      }
      const editedCurrentSession = currentSession && parsedData.sessions.find(
        session => currentSession.id === session.id,
      )

      if (isFinished) {
        const sessionToSet = editedCurrentSession || parsedData.sessions[0]
        dispatch({
          type: ACTIONS.TIMER_SET_TIME,
          payload: sessionToSet.length,
        })
      }

      setItem(LOCAL_STORAGE_KEYS.SETTINGS, parsedData)
      dispatch({
        type: ACTIONS.SET_SETTINGS,
        payload: parsedData,
      })
    },
    [dispatch, currentSession, isFinished, setItem],
  )

  return (
    <MuiThemeProvider theme={theme}>
      <Component
        settings={settings}
        hideSettings={hideSettings}
        onSubmit={onSubmit}
      />
    </MuiThemeProvider>
  )
}
