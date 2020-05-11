import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { SignIn } from './sign-in';
import { Provider } from 'mobx-react';
import { AuthProvider } from './sign-in';
import { participantStore } from './injectables';
import { NotFound } from './404-page';
import { theme } from './ui';
import './App.css';

const App = () => (
  <Provider participantStore={participantStore}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <IntakeFormPage path="/" />
          <SignIn path="sign-in" />
          <Database path="database" />
          <NotFound default />
        </Router>
      </AuthProvider>

    </ThemeProvider>
  </Provider>
);

export default App;
