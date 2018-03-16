import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'normalize.css';
import './styles.css';
import reducers from './reducers';
import App from './components/App';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

// eslint-disable-next-line no-undef
const root = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
