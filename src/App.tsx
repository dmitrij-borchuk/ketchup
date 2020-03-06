import React from 'react'
import 'normalize.css'
import AppContainer from './components/App/app.container'
import { AppProviders } from './providers'
import './index.css'

const App = () => {
  return (
    <AppProviders>
      <AppContainer />
    </AppProviders>
  )
}

export default App
