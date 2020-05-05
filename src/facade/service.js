import * as firebase from 'firebase/app';
import DatabaseManager from './DatabaseManager';
import AuthenticationManager from './AuthenticationManager';

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
function init() {
  if (!initialized) {
    firebase.initializeApp(CONFIG);
    initialized = true;
  }
}

/**
 * Get an instance of Operation.
 * @returns {Operation}
 *  Instance of Operation
 */
export function getDatabase() {
  init();
  return DatabaseManager.getInstance();
}

/**
 * Get an instance of Authentication.
 * @returns {Authentication}
 *  Instance of Authentication
 */
export function getAuthentication() {
  init();
  return AuthenticationManager.getInstance();
}

export default {
  getDatabase: getDatabase,
  getAuthentication: getAuthentication,
};