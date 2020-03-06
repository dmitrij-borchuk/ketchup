import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root')
ReactDOM.render(
  <App />,
  rootEl,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
