import React, { Component } from 'react';
import service from '../../facade/service';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.authService = service.authentication();
    this.handleLogin = this.handleLogin.bind(this);
  }

  /**
   * handles log in event
   * @param {event: onSubmit event}
   *
   */
  handleLogin(event) {
    event.preventDefault();
    let { email, password } = event.target.elements;
    email = email.value;
    password = password.value;
    this.authService.logIn(
      email,
      password,
      (auth) => {
        console.log(auth.type);
        console.log(auth.additional);
        console.log(auth.email);
        // TODO redirect to '/database' when success
        alert('success');
      },
      (error) => {
        console.log(error);
        alert(error);
      },
    );
  }

  render() {
    // TODO create Login UI
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleLogin}>
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

export default LogIn;