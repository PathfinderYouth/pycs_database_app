import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class Authentication {
  static instance;

  /**
   * Get an instance of Authentication.
   * @returns {Authentication}
   *  Instance of Authentication
   */
  static getInstance() {
    if (!Authentication.instance) {
      Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

  constructor() {
    if (Authentication.instance) {
      throw new Error('Authentication is a singleton class');
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
        if (onSucess) {
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
  signUp(email, password, onSucess, onError) {
    this.authen
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (onSucess) {
          let authObj = {
            type: userCred.opertionType,
            additional: userCred.additionalUserInfo,
            userName: userCred.user.displayName,
            email: userCred.email,
          };
          onSucess(authObj);
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
