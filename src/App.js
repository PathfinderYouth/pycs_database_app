import React from 'react';
import { Router } from '@reach/router';
import { Database } from './database';
import { IntakeFormPage } from './intake-form';
import { SignIn } from './sign-in';
import './App.css';
import { AuthProvider, PrivateRoute } from "./facade/authentication"
import { BrowserRouter as Router, Route } from "react-router-dom";
import DatabaseHome from "./facade/authComponents/DatabaseHome";
import Login from "./facade/authComponents/Login";
import SignUp from "./facade/authComponents/SignUp";

const App = () => (
  <>
    <Router>
      <IntakeFormPage path='/'/>
      <SignIn path='sign-in'/>
      <Database path='database'/>
    </Router>
  </>
)

export default App;
