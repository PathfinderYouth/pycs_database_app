import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import service from '../facade/service';

/**
 * Create login UI and use callback to handle login event
 * @param {history: History}
 * a reference to the History object for routing context manipulating the browser session history
 * @returns {React.Component}
 * interactive login component
 */

class Login extends Component {
  constructor(props) {
    super();
    this.authenticationService = service.authentication();
    this.handleLogin = useCallback(
      async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await authenticationService
            .login(email.value, password.value, (auth) => {
              console.log(auth.operationType);
              console.log(auth.additionalUserInfo);
              console.log(auth.displayName);
              console.log(auth.email);
            }, (error) => {
              alert(error);
            });
          history.push('/');
        } catch (error) {
          alert(error);
        }
      },
      [history],
    );
    this.currentUser = this.useContext(AuthContext);
  }

  render() {
    // TODO to be replaced
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
            />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
