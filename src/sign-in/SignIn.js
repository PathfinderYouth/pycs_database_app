import React from 'react';
import { LogIn, NavBar } from './components';
import './SignIn.css';


// container that holds all sign in page UI objects
export const SignIn = () => (
  <div className='sign-in-container'>
    <NavBar />
    <LogIn />
  </div>
);
