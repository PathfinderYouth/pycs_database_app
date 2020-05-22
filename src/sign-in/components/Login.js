import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import service from '../../facade/service';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import './Login.css';

export const LogIn = () => {
  const authService = service.getAuthentication();
  const userService = service.getUserList();
  const [passwordResetClicked, setPasswordResetClicked] = useState(false);
  const [passwordVisible, togglePasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Please enter a valid email address'),
    password: yup.string().required('Password is required'),
  });

  /**
   * navigate to database ui if current authentication state is persisted.
   */
  useEffect(() => {
    if (authService.getCurrentUser()) {
      window.location.href = './database';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * handle sign up when email is authorized but user has not yet set a password
   * @param {string} userEmail
   * @param {string} userPassword
   */
  const handleSignUp = (userEmail, userPassword) => {
    authService.signUp(userEmail, userPassword, (user) => {
      userService.updateFirstTimeUser(user.email, user.uid, (doc) => {
        let newUser = authService.getCurrentUser();
        newUser.updateProfile({ displayName: doc.name }).then(() => {
          window.location.href = './database';
        });
      });
    });
  };

  /**
   * handle sign in when email is authorized
   * @param {string} userEmail
   * @param {string} userPassword
   * @param {function} setSubmitting
   */
  const handleSignIn = (userEmail, userPassword, setSubmitting) => {
    authService.logIn(
      userEmail,
      userPassword,
      () => {
        // login was successful
        setSubmitting(false);
        window.location.href = './database';
      },
      // perform sign-up if login fails
      (error) => {
        if (error.code === 'auth/wrong-password') {
          setSubmitting(false);
          setErrorMessage('Incorrect password');
          return;
        }
        handleSignUp(userEmail, userPassword);
      },
    );
  };

  /**
   * Handles log in event
   * @param {Object} values form values
   * @param {function} setSubmitting
   */
  const handleLoginSession = (values, setSubmitting) => {
    const { email, password } = values;
    userService.checkEmailNotExist(
      null,
      email.toLocaleLowerCase(),
      // if email doesn't exist in user collection
      () => {
        // delete account if account exists in firebase auth user list
        authService.logIn(
          email,
          password,
          () => {
            authService.getCurrentUser().delete();
            setSubmitting(false);
            setErrorMessage('User account does not exist.');
          },
          () => {
            setSubmitting(false);
            setErrorMessage(
              'User account not authorized. Please contact Pathfinder administration.',
            );
          },
        );
      },
      // if email exists in user collection
      () => {
        authService.setAuthPersistence(
          () => {
            // auth state is persisted in current session only
            handleSignIn(email, password, setSubmitting);
          },
          () => {
            // if the current environment doesn't support session persistence
            // allow login with a warning
            alert(
              'Remember to log out when you finish your current session.\r\n' +
                'Switch to the latest version of Chrome or Firefox to remove this message.',
            );
            handleSignIn(email, password);
          },
        );
      },
    );
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img className="login-logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <Typography align="center" variant="h5">
          Staff Login Portal
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setErrorMessage('');
            handleLoginSession(values, setSubmitting);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, submitForm }) => (
            <div className="login-form-contents">
              <div className="login-form-field">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email address"
                  name="email"
                  type="email"
                  value={values.email}
                  error={!!errors.email && !!touched.email}
                  helperText={!!errors.email && !!touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="login-form-field">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  error={!!errors.password && !!touched.password}
                  helperText={!!errors.password && !!touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button fullWidth variant="contained" color="primary" onClick={submitForm}>
                Sign In
              </Button>
              <div className="login-bottom-links">
                <Link
                  href="#"
                  variant="body2"
                  display="inline"
                  onClick={(event) => {
                    event.preventDefault();
                    togglePasswordVisible(!passwordVisible);
                  }}
                >
                  {passwordVisible ? 'Hide password' : 'Show password'}
                </Link>
                <Link
                  href="#"
                  variant="body2"
                  display="inline"
                  onClick={(event) => {
                    event.preventDefault();
                    setPasswordResetClicked(true);
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="login-form-info">
                {!!errorMessage && (
                  <Typography gutterBottom variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
                {passwordResetClicked && (
                  <Typography variant="body2" color="textSecondary">
                    Please contact Pathfinder administration to reset your password.
                  </Typography>
                )}
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};
