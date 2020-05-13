import React, { useEffect, useState } from 'react';
import service from '../../facade/service';
import CircularProgress from '@material-ui/core/CircularProgress';
import './AuthContext.css';

// get firebase authentication service
const authService = service.getAuthentication();

// create authcontext to poplute data into React component tree
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

  useEffect(() => {
    authService.authen.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div className="pendingProgress">
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
