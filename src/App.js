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

const App = () => (
  <AuthProvider>
    <Provider participantStore={participantStore} userStore={userStore} uiStore={uiStore}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  </AuthProvider>
);

export default App;
