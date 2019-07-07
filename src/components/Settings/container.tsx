import * as React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Component from './index';
import {
  hideSettings,
  setSettings,
} from '../../actions/app';
import * as timerActions from '../../actions/timer';
// import {
//   SETTINGS_KEYS,
//   // INPUT_TYPES,
// } from '../../constants';
import { ISession } from '../../types/session.interface';
import { ISettings, ISettingsForm } from '../../types/settings.interface';
import { IState } from '../../reducers';
import { INPUT_TYPES } from '../../types/inputTypes.enum';
import { SETTINGS_KEYS } from '../../types/settingsKeys.enum';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const inputs = [
  {
    label: 'Play sound',
    type: INPUT_TYPES.CHECKBOX,
    key: SETTINGS_KEYS.PLAY_SOUND,
  },
];

export interface ISettingsContainerProps {
  set: Function
  setTimer: Function
  isTimerFinished: boolean
  currentSession?: ISession
  sessions: ISession[]
}

function SettingsContainer(props: ISettingsContainerProps) {
  // const onSubmit = (data: ISettingsForm) => {
  //   const {
  //     set,
  //     setTimer,
  //     isTimerFinished,
  //     currentSession,
  //   } = props;

  //   const parsedData: ISettings = {
  //     playSound: data.playSound,
  //     sessions: data.sessions.map(session => ({
  //       ...session,
  //       length: parseInt(session.length, 10),
  //     })),
  //   };
  //   const editedCurrentSession = currentSession && parsedData.sessions.find(
  //     session => currentSession.id === session.id,
  //   );

  //   if (isTimerFinished) {
  //     const sessionToSet = editedCurrentSession || parsedData.sessions[0];
  //     setTimer(sessionToSet.length);
  //   }

  //   set(parsedData);
  // };
  // const {
  //   sessions,
  // } = props;

  // return (
  //   <MuiThemeProvider theme={theme}>
  //     <Component
  //       {...props}
  //       inputs={inputs}
  //       sessions={sessions}
  //       onSubmit={onSubmit}
  //     />
  //   </MuiThemeProvider>
  // );
  return <div>Settings</div>
}

const mapStateToProps = ({ app, timer }: IState) => ({
  initialValues: app.settings,
  sessions: app.settings.sessions,
  currentSession: app.currentSession,
  isTimerFinished: timer.isFinished,
});
const mapDispatchToProps = {
  hideSettings,
  set: setSettings,
  setTimer: timerActions.setTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
