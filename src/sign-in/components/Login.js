import React, { Component } from 'react';
import { navigate } from '@reach/router';
import service from '../../facade/service';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Login.css';

export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.authService = service.getAuthentication();
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: 'test@test.com',
      password: '123123',
    };
  }

  /**
   * handles log in event
   * @param {event: onSubmit event}
   *
   */
  handleLogin(event) {
    event.preventDefault();
    this.authService.logIn(
      this.state.email,
      this.state.password,
      (auth) => {
        console.log(auth.type);
        console.log(auth.additional);
        console.log(auth.email);
        navigate('/database');
      },
      (error) => {
        alert(error.message);
      },
    );
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
                <Link href="#" variant="body2">
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
