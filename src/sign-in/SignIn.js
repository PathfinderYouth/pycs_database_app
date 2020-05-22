import React from 'react';
import { LogIn, NavBar } from './components';
import './SignIn.css';

/**
 * Entry point for the Sign-In interface
 */
export const SignIn = () => (
  <div className="sign-in-container">
    <NavBar />
    <LogIn />
  </div>
);
