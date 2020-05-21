import React, { useEffect, useState } from 'react';
import service from '../../facade/service';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import './AuthContext.css';

// get firebase authentication service
const authService = service.getAuthentication();

// create authcontext to pass current user state into React component tree
export const AuthContext = React.createContext();

/**
 * Provider component stores authentication status
 * @param {children: child React.Component}
 * child React components associated with current user
 * @returns {AuthContext Provider}
 * pass current user of firebase on auth state change
 *
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  /**
   * use Firebase authentication onAuthStateChanged real time listener
   * as an observer on Auth object to get current user
   */
  useEffect(() => {
    authService.authen.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div className="auth-context-progress">
        <img className="auth-context-logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
