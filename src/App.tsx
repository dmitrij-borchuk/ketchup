import React from 'react';
import { connect } from 'react-redux';
import { IState } from './reducers';
import * as appActions from './actions/app';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
// const mapStateToProps = ({ app }: IState) => ({
//   settingsPopupShown: app.settingsPopupShown,
//   sessions: app.settings.sessions,
//   currentSession: app.currentSession,
// });
// const mapDispatchToProps = {
//   showSettings: appActions.showSettings,
//   hideSettings: appActions.hideSettings,
//   restoreSettings: appActions.restoreSettings,
//   setCurrentSession: appActions.setCurrentSession,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(AppContainer);
