import React, { Component } from 'react';
import service from '../../facade/service';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.authService = service.getAuthentication();
    this.handleLogin = this.handleLogin.bind(this);
  }

  /**
   * handles log in event
   * @param {event: onSubmit event}
   *
   */
  handleLogin(event) {
    event.preventDefault();
    // let { email, password } = event.target.elements;
    let email = this.email.value;
    let password = this.password.value;
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
  

  useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  
  render() {
    const classes = this.useStyles;
    return (
      <Container component="main" maxWidth="xs" >
        <div className={classes.paper} >
          <Typography component="h1" variant="h5">
            PYCS Staff Login Portal
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              ref={x => this.email = x}
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
              ref={x => this.password = x}
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
              className={classes.submit}
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
    // TODO create Login UI
    // return (
    //   <div>
    //     <h1>Log in</h1>
    //     <form onSubmit={this.handleLogin}>
    //       <label>
    //         Email
    //         <input name="email" type="email" placeholder="Email" />
    //       </label>
    //       <label>
    //         Password
    //         <input
    //           name="password"
    //           type="password"
    //           placeholder="Password"
    //         />
    //       </label>
    //       <button type="submit">Log in</button>
    //     </form>
    //   </div>
    // );
  }
}

export default LogIn;