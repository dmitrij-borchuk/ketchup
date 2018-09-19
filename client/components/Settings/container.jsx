import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setItem } from '../../utils/storage';
import Component from './index';
import {
  hideSettings,
  setSettings,
} from '../../actions/app';
import * as timerActions from '../../actions/timer';
import {
  LOCAL_STORAGE_KEYS,
  SETTINGS_KEYS,
  INPUT_TYPES,
} from '../../constants';

const inputs = [
  {
    label: 'Session length (sec)',
    type: INPUT_TYPES.NUMBER,
    key: SETTINGS_KEYS.SES_LENGTH,
  },
  {
    label: 'Play sound',
    type: INPUT_TYPES.CHECKBOX,
    key: SETTINGS_KEYS.PLAY_SOUND,
  },
];
const parsers = {
  [INPUT_TYPES.NUMBER]: value => parseInt(value, 10),
  [INPUT_TYPES.CHECKBOX]: value => value,
};

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
    } = this.props;
    const parsedData = inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.key]: parsers[input.type](data[input.key]),
      }),
      {},
    );

    if (isTimerFinished) {
      setTimer(parsedData.sesLength);
    }

    setItem(LOCAL_STORAGE_KEYS.SETTINGS, parsedData);
    set(parsedData);
  };

  render() {
    return (
      <Component
        {...this.props}
        inputs={inputs}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = ({ app, timer }) => ({
  initialValues: app.settings,
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
