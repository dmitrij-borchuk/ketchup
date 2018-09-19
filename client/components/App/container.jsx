import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItem } from '../../utils/storage';
import Component from './index';
import * as appActions from '../../actions/app';
import * as timerActions from '../../actions/timer';
import {
  LOCAL_STORAGE_KEYS,
  SECONDS_IN_SESSION,
} from '../../constants';

class AppContainer extends PureComponent {
  static propTypes = {
    showSettings: PropTypes.func.isRequired,
    settingsPopupShown: PropTypes.bool.isRequired,
    setSettings: PropTypes.func.isRequired,
    setTimer: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      setSettings,
      setTimer,
    } = this.props;
    const settings = getItem(LOCAL_STORAGE_KEYS.SETTINGS) || {};
    setSettings(settings);
    setTimer(settings.sesLength || SECONDS_IN_SESSION);
  }

  render() {
    return (
      <Component
        {...this.props}
      />
    );
  }
}
const mapStateToProps = ({ app }) => ({
  settingsPopupShown: app.settingsPopupShown,
});
const mapDispatchToProps = {
  showSettings: appActions.showSettings,
  hideSettings: appActions.hideSettings,
  setSettings: appActions.setSettings,
  setTimer: timerActions.setTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
