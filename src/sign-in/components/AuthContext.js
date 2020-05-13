import React, { useEffect, useState } from 'react';
import service from '../../facade/service';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// get firebase authentication service
const authService = service.getAuthentication();

// create authcontext to poplute data into React component tree
export const AuthContext = React.createContext();

const useStyles = makeStyles(() => ({
  pendingProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

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
  const classes = useStyles();

  useEffect(() => {
    authService.authen.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div className={`${classes.pendingProgress} pendingProgress`}>
        <CircularProgress />
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
