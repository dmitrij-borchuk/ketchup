import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'normalize.css';
import './styles.css';
import reducers from './reducers';
import App from './components/App/container';
// import initServiceWorker from './utils/serviceWorkerInstaller';

const store = createStore(
  reducers,
  // TODO: remove "composeWithDevTools" on production
  composeWithDevTools(applyMiddleware(thunk)),
);

// eslint-disable-next-line no-undef
const root = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);

// initServiceWorker();
