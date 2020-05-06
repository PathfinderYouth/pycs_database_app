import React from 'react';
import { Router } from '@reach/router';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { SignIn } from './sign-in';
import { NotFound } from './404-page';
import './App.css';

const App = () => (
  <>
    <Router>
      <IntakeFormPage path='/'/>
      <SignIn path='sign-in'/>
      <Database path='database'/>
      <NotFound default />
    </Router>
  </>
)

export default App;
