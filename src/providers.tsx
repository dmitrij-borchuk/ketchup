import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
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
