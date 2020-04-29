import React from 'react';
import { Router } from '@reach/router';
import { Database } from './database';
import { IntakeForm } from './intake-form';
import { SignIn } from './sign-in';
import Typography from '@material-ui/core/Typography'

const App = () => (
  <>
    <Router>
      <IntakeForm path='/'/>
      <SignIn path='sign-in'/>
      <Database path='database'/>
    </Router>
  </>
)

export default App;
