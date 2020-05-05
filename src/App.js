import React from 'react';
import { Router } from '@reach/router';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { SignIn } from './sign-in';
import { Provider } from 'mobx-react';
import { participantStore } from './injectables';
import './App.css';

const App = () => (
  <Provider participantStore={participantStore}>
    <Router>
      <IntakeFormPage path='/'/>
      <SignIn path='sign-in'/>
      <Database path='database'/>
    </Router>
  </Provider>
)

export default App;
