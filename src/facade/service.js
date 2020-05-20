import * as firebase from 'firebase/app';
import DatabaseManager from './DatabaseManager';
import AuthenticationManager from './AuthenticationManager';
import UserListManager from './UserListManager';

const CONFIG = {
  apiKey: 'AIzaSyDDYYHzgfZh5XCBLgEaPSHaI1RnBYAanrw',
  authDomain: 'pycs-database-app.firebaseapp.com',
  databaseURL: 'https://pycs-database-app.firebaseio.com',
  projectId: 'pycs-database-app',
  storageBucket: 'pycs-database-app.appspot.com',
  messagingSenderId: '431213152640',
  appId: '1:431213152640:web:8783ba86ce18995a9e5965',
  measurementId: 'G-MHTVV1X9ZH',
};

let initialized = false;

/**
 * Helper method to make sure the app only get initialized once.
 */
function init() {
  if (!initialized) {
    firebase.initializeApp(CONFIG);
    initialized = true;
  }
}

/**
 * Get an instance of DatabaseManager.
 * @returns {DatabaseManager}
 *  Instance of DatabaseManager
 */
export function getDatabase() {
  init();
  return DatabaseManager.getInstance();
}

/**
 * Get an instance of AuthenticationManager.
 * @returns {AuthenticationManager}
 *  Instance of AuthenticationManager
 */
export function getAuthentication() {
  init();
  return AuthenticationManager.getInstance();
}

/**
 * Get an instance of UserListManager.
 * @returns {UserListManager}
 *  Instance of UserListManager
 */
export function getUserList() {
  init();
  return UserListManager.getInstance();
}

export default {
  getDatabase: getDatabase,
  getAuthentication: getAuthentication,
  getUserList: getUserList,
};
