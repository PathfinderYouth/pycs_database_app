
import React, { useEffect, useState, useContext } from "react";
// import { withRouter, Redirect } from "react-router";
import { Route, Redirect } from "react-router-dom";


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

  // React hook to signup changes to firebase object
  useEffect(() => {
    authen.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
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

/**
 * a wrapper for regular route
 * @param {component: RouteComponent}
 * a regular Route component
 * @returns {currentUser?: RouteComponent: Redirect}
 * returns Route component if a user is logged in, redirects to login ui otherwise
 */
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  // useContext hook accepts AuthContext
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};
