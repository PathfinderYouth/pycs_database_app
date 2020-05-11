import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { NotFound } from './404-page';
import { SignIn } from './sign-in';
import { participantStore } from './injectables';
import { theme } from './ui';
import './App.css';

const App = () => (
  <Provider participantStore={participantStore}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Router>
          <IntakeFormPage path="/" />
          <SignIn path="sign-in" />
          <Database path="database" />
          <NotFound default />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
