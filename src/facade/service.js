import * as firebase from 'firebase/app';
import DatabaseManager from './DatabaseManager';
import AuthenticationManager from './AuthenticationManager';
import UserListManager from './UserListManager';

const testCONFIG = {
  apiKey: "AIzaSyBYrEGT3ocS4VIdd_YxC3raWQJ_vf2m2IQ",
  authDomain: "pycs-development-project.firebaseapp.com",
  projectId: "pycs-development-project",
  storageBucket: "pycs-development-project.appspot.com",
  messagingSenderId: "92261316097",
  appId: "1:92261316097:web:d3d19ee1406312d4f4f200"
};

const testCONFIG = {
  apiKey: "AIzaSyBYrEGT3ocS4VIdd_YxC3raWQJ_vf2m2IQ",
  authDomain: "pycs-development-project.firebaseapp.com",
  projectId: "pycs-development-project",
  storageBucket: "pycs-development-project.appspot.com",
  messagingSenderId: "92261316097",
  appId: "1:92261316097:web:d3d19ee1406312d4f4f200"
};

let initialized = false;

/**
 * Helper method to make sure the app only get initialized once.
 */
function init() {
  if (!initialized) {
    firebase.initializeApp(testCONFIG);
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
