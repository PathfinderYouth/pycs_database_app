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
      errorEmailStatus: false,
      errorPasswordStatus: false,
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
        this.setState({ errorEmailStatus: true });
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
          (error) => {
            if (error.code === 'auth/wrong-password') {
              this.setState({ errorPasswordStatus: true });
              return;
            }
            this.handleSignUp(this.state.email, this.state.password);
          },
        );
      },
    );
  }

  handleSignUp(userEmail, userPassword) {
    this.authService.signUp(userEmail, userPassword, (user) => {
      this.userService.updateFirstTimeUser(user.email, user.uid, (doc) => {
        let newUser = this.authService.getCurrentUser();
        newUser.updateProfile({ displayName: doc.name }).then(() => {
          window.location.href = './database';
        });
      });
    });
  }

  handlePasswordResetEmail() {
    alert('Please contact your supervisor to reset password');
  }

  handleEmailTextChange(event) {
    this.setState({ email: event.target.value });
    if (event.target.value === '') {
      this.setState({ errorEmailStatus: false });
    }
  }

  handlePasswordTextChange(event) {
    this.setState({ password: event.target.value });
    if (event.target.value === '') {
      this.setState({ errorPasswordStatus: false });
    }
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
              ref="email"
              autoFocus
              error={this.state.errorEmailStatus}
              helperText={
                this.state.errorEmailStatus &&
                'User account not authorized. Please contact Pathfinder Youth Centre Society administration.'
              }
              onChange={(event) => this.handleEmailTextChange(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              id="password"
              ref="password"
              error={this.state.errorPasswordStatus}
              helperText={this.state.errorPasswordStatus && 'Invalid Password.'}
              onChange={(event) => this.handlePasswordTextChange(event)}
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
