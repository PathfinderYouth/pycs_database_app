import React from 'react';
import { Router } from '@reach/router';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { SignIn } from './sign-in';
import { Provider } from 'mobx-react';
import { participantStore } from './injectables';
import { NotFound } from './404-page';
import './App.css';

const App = () => (
  <Provider participantStore={participantStore}>
    <Router>
      <IntakeFormPage path="/" />
      <SignIn path="sign-in" />
      <Database path="database" />
      <NotFound default />
    </Router>
  </Provider>
);

export default App;
