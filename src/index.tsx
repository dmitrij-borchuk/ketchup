import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './components/App/app.container';
import reducers from './reducers';
import localStorageMiddleware from './utils/localStorageMiddleware';
import './index.css';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(
    thunk,
    localStorageMiddleware,
  )),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
