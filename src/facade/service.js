import * as firebase from 'firebase/app';
import Operation from './operation';
import Authentication from './authentication';

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
export function operation() {
  init();
  return Operation.getInstance();
}

/**
 * Get an instance of Authentication.
 * @returns {Authentication}
 *  Instance of Authentication
 */
export function authentication() {
  init();
  return Authentication.getInstance();
}

export default {
  operation: operation,
  authentication: authentication,
};
