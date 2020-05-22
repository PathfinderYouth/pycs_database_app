import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import { Database } from './database';
import { IntakeForm } from './intake-form';
import { NotFound } from './404-page';
import { AuthProvider, SignIn } from './sign-in';
import { participantStore, uiStore, userStore } from './injectables';
import { theme } from './ui';
import './App.css';

/**
 * Entry point of the app and routing components
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Provider participantStore={participantStore} userStore={userStore} uiStore={uiStore}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Router>
            <IntakeForm path="/" />
            <SignIn path="sign-in" />
            <Database path="database" />
            <NotFound default />
          </Router>
        </SnackbarProvider>
      </Provider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
