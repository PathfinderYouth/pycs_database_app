import React, { Component } from 'react';
import service from '../../facade/service';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Login.css';

export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.authService = service.getAuthentication();
    this.userService = service.getUserList();
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePasswordResetEmail = this.handlePasswordResetEmail.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    if (this.authService.getCurrentUser()) {
      window.location.href = './database';
    }
  }

  /**
   * handles log in event
   * @param {event: onSubmit event}
   *
   */
  handleLogin(event) {
    event.preventDefault();

    this.userService.checkEmailNotExist(
      null,
      this.state.email.toLocaleLowerCase(),
      // if email doesn't exist in user collection
      () => {
        alert('The email has not been authorized.');
      },
      // if email exists in user collection
      () => {
        this.authService.logIn(
          this.state.email,
          this.state.password,
          () => {
            window.location.href = './database';
          },
          // perform sign-up if login fails
          () => {
            this.authService.signUp(this.state.email, this.state.password, (user) => {
              this.userService.updateFirstTimeUser(user.email, user.uid, (doc) => {
                let newUser = this.authService.getCurrentUser();
                newUser.updateProfile({ displayName: doc.name }).then(() => {
                  window.location.href = './database';
                });
              });
            });
          },
        );
      },
    );
  }

  handlePasswordResetEmail() {
    alert('Please contact your supervisor to reset password');
  }

  /**
   * handles email and password TextFields text change event
   * @param {event: TextField onChange}
   */
  handleTextChange(event) {
    let newText = event.target.value;
    let newState = {};
    newState[event.target.name] = newText;
    this.setState(newState);
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className={`paperStyle`}>
          <Typography variant="h5">PYCS Staff Login Portal</Typography>
          <form className="maxWidth" noValidate onSubmit={this.handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => this.handleTextChange(event)}
              ref="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              ref="password"
              onChange={(event) => this.handleTextChange(event)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={(event) => {
                    event.preventDefault();
                    this.handlePasswordResetEmail();
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
