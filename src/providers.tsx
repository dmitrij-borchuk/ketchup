import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import { AppStateContextProvider, StorageContextProvider } from './context'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export const AppProviders: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <StorageContextProvider>
      <AppStateContextProvider>
        {children}
      </AppStateContextProvider>
    </StorageContextProvider>
  </MuiThemeProvider>
)
