import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Component from './index';
import * as appActions from '../../actions/app';

class AppContainer extends PureComponent {
  static propTypes = {
    showSettings: PropTypes.func.isRequired,
    settingsPopupShown: PropTypes.bool.isRequired,
    restoreSettings: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      restoreSettings,
    } = this.props;
    restoreSettings();
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
  restoreSettings: appActions.restoreSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
