import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Component from './index';
import {
  hideSettings,
  setSettings,
} from '../../actions/app';
import * as timerActions from '../../actions/timer';
import {
  SETTINGS_KEYS,
  INPUT_TYPES,
} from '../../constants';

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

class SettingsContainer extends PureComponent {
  static propTypes = {
    set: PropTypes.func.isRequired,
    setTimer: PropTypes.func.isRequired,
    isTimerFinished: PropTypes.bool.isRequired,
  }

  onSubmit = (data) => {
    const {
      set,
      setTimer,
      isTimerFinished,
      currentSession,
    } = this.props;

    const parsedData = {
      playSound: data.playSound,
      sessions: data.sessions.map(session => ({
        ...session,
        length: parseInt(session.length, 10),
      })),
    };
    const editedCurrentSession = parsedData.sessions.find(
      session => currentSession.id === session.id,
    );

    if (isTimerFinished) {
      const sessionToSet = editedCurrentSession || parsedData.sessions[0];
      setTimer(sessionToSet.length);
    }

    set(parsedData);
  };

  render() {
    const {
      sessions,
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Component
          {...this.props}
          inputs={inputs}
          sessions={sessions}
          onSubmit={this.onSubmit}
        />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ app, timer }) => ({
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
