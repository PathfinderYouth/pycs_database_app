import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useEffect, useState, useCallback, useContext } from "react";
// import { withRouter, Redirect } from "react-router";
import { Route, Redirect } from "react-router-dom";

const CONFIG = {
  apiKey: "AIzaSyDDYYHzgfZh5XCBLgEaPSHaI1RnBYAanrw",
  authDomain: "pycs-database-app.firebaseapp.com",
  databaseURL: "https://pycs-database-app.firebaseio.com",
  projectId: "pycs-database-app",
  storageBucket: "pycs-database-app.appspot.com",
  messagingSenderId: "431213152640",
  appId: "1:431213152640:web:8783ba86ce18995a9e5965",
  measurementId: "G-MHTVV1X9ZH",
};

export class Authentication {
  static instance;

  /**
   * Get an instance of Authentication.
   * @returns {Authentication}
   *  Instance of Authentication
   */
  static getInstance() {
    if (!Authentication.instance) {
      Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

  constructor() {
    if (Authentication.instance) {
      throw new Error("Authentication is a singleton class");
    }
    this.authen = firebase.auth();
  }
}

// TODO use service to initialize app
firebase.initializeApp(CONFIG);
const authen = firebase.auth();
export default authen;

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

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

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
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
