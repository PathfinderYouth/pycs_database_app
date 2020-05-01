import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider, PrivateRoute } from "./facade/authentication"
import { BrowserRouter as Router, Route } from "react-router-dom";
import DatabaseHome from "./facade/authComponents/DatabaseHome";
import Login from "./facade/authComponents/Login";
import SignUp from "./facade/authComponents/SignUp";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    // TODO connect routes to login UI
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={DatabaseHome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
