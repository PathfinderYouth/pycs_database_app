import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthenticationManager {
  static instance;

  /**
   * Get an instance of AuthenticationManager.
   * @returns {AuthenticationManager}
   *  Instance of AuthenticationManager
   */
  static getInstance() {
    if (!AuthenticationManager.instance) {
      AuthenticationManager.instance = new AuthenticationManager();
    }
    return AuthenticationManager.instance;
  }

  constructor() {
    if (AuthenticationManager.instance) {
      throw new Error('AuthenticationManager is a singleton class');
    }
    this.authen = firebase.auth();
  }

  /**
   * log in an account with provided email and password
   * @param {email: string}
   * existing user's email
   * @param {password: string}
   * existing user's password
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  logIn(email, password, onSuccess, onError) {
    this.authen
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (onSuccess) {
          let authObj = {
            type: userCred.operationType,
            additional: userCred.additionalUserInfo,
            userName: userCred.user.displayName,
            email: userCred.email,
          };
          onSuccess(authObj);
        }
      })
      .catch(onError);
  }

  /**
   * sign up an account with provided email and password
   * @param {email: string}
   * new user's email
   * @param {password: string}
   * new user's password
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  signUp(email, password, onSuccess, onError) {
    this.authen
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (onSuccess) {
          onSuccess(userCred.user);
        }
      })
      .catch(onError);
  }

  /**
   * set up firebase authentication sign in session
   * if the environment supports session persistence, auth state is persisted
   * in current session only. Closing the window would clear any existing state
   * even if a user forgets to sign out.
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  setAuthPersistence(onSuccess, onError) {
    this.authen
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * sign out the current user
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  signOut(onSuccess, onError) {
    this.authen.signOut().then(onSuccess).catch(onError);
  }

  /**
   * get the user of current session
   */
  getCurrentUser() {
    return this.authen.currentUser;
  }

  /**
   * send password reset email to the staff's email address (admin privilege)
   * @param {email: string}
   * email of a user account to reset
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   *
   */
  resetPassword(email, onSuccess, onError) {
    this.authen.sendPasswordResetEmail(email).then(onSuccess).catch(onError);
  }
}
