import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AppComponent from './app.component';
import * as appActions from '../../actions/app';
import { IState } from '../../reducers';

export interface IAppContainerProps {
  showSettings: Function,
  settingsPopupShown: boolean,
  restoreSettings: Function,
}

function AppContainer(props: IAppContainerProps) {
  const {
    restoreSettings,
  } = props;

  useEffect(() => {
    restoreSettings();
  }, [restoreSettings]);
  return (
    <AppComponent
      {...props}
    />
  );
}

const mapStateToProps = ({ app }: IState) => ({
  settingsPopupShown: app.settingsPopupShown,
  sessions: app.settings.sessions,
  currentSession: app.currentSession,
});
const mapDispatchToProps = {
  showSettings: appActions.showSettings,
  hideSettings: appActions.hideSettings,
  restoreSettings: appActions.restoreSettings,
  setCurrentSession: appActions.setCurrentSession,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
