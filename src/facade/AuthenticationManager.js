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
   * @param {onError?: () => void}
   *  Callback function when fail
   */
  logIn(email, password, onSuccess, onError) {
    this.authen
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (onSuccess) {
          let authObj = {
            type: userCred.opertionType,
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
   * admin privillege
   * @param {email: string}
   * new user's email
   * @param {password: string}
   * new user's password
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: () => void}
   *  Callback function when fail
   */
  signUp(email, password, onSuccess, onError) {
    this.authen
      .createUserWithEmailAndPassword(email, password)
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
   * sign out the current user
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: () => void}
   *  Callback function when fail
   */
  signOut(onSuccess, onError) {
    this.authen.signOut().then(onSuccess).catch(onError);
  }
}
