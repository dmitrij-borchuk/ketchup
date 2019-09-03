import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { TimerContainer } from '../Timer/timer.container'
import { SettingsContainer } from '../Settings/settings.container'
import SettingsIcon from '../Icons/settings'
import { TimerControlsContainer } from '../TimerControls'
import appleTouchIcon from '../../assets/favicon/apple-touch-icon.png'
import favicon32x32 from '../../assets/favicon/favicon-32x32.png'
import favicon16x16 from '../../assets/favicon/favicon-16x16.png'
import safariPinnedTab from '../../assets/favicon/safari-pinned-tab.svg'
import {
  AppWrapper,
  Circle,
  Controls,
  SettingsIconWrapper,
} from './styles'
import { ISession } from '../../types'
const webmanifest = require('../../assets/favicon/site.webmanifest')

interface IAppProps {
  showSettings: Function,
  settingsPopupShown: boolean,
  sessions: ISession[],
  currentSession: ISession,
  setCurrentSession: Function,
}
export const App: React.FC<IAppProps> = (props) => {
  const {
    showSettings,
    settingsPopupShown,
    sessions,
    currentSession,
    setCurrentSession,
  } = props
  const showSettingsCb = useCallback(() => showSettings(), [showSettings])

  return (
    <AppWrapper>
      <Helmet>
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
        <link rel="manifest" href={webmanifest} />
        <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      {/* Settings btn */}
      <SettingsIconWrapper>
        <SettingsIcon
          color="#fff"
          onClick={showSettingsCb}
        />
      </SettingsIconWrapper>

      {/* Timer */}
      <Circle>
        <div>
          <span data-testid="session-selector">
            <Select
              value={currentSession.id}
              onChange={
                e => setCurrentSession(sessions.find((ses: any) => ses.id === e.target.value))
              }
              fullWidth
            >
              {sessions.map((session: any) => (
                <MenuItem
                  key={session.id}
                  value={session.id}
                >
                  {session.name}
                </MenuItem>
              ))}
            </Select>
          </span>
          <TimerContainer />
          <Controls>
            <TimerControlsContainer />
          </Controls>
        </div>
      </Circle>

      {/* Settings */ }
      {
        settingsPopupShown
        && <SettingsContainer />
      }

    </AppWrapper>
  )
}
