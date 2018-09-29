import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import 'normalize.css';
import './styles.css';
import reducers from './reducers';
import App from './components/App/container';
import localStorageMiddleware from './utils/localStorageMiddleware';
// import initServiceWorker from './utils/serviceWorkerInstaller';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(
    thunk,
    localStorageMiddleware,
  )),
);

// eslint-disable-next-line no-undef
const root = document.getElementById('root');
render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  root,
);

// initServiceWorker();
