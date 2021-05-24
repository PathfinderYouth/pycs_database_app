import * as firebase from 'firebase/app';
import DatabaseManager from './DatabaseManager';
import AuthenticationManager from './AuthenticationManager';
import UserListManager from './UserListManager';
import StorageManager from './StorageManager';

/*
 * Config for the real firebase used by PYCS.
 * It is best not to make submissions when using this config or Pathfinder staff will see them, even when running on localhost.
 */
const CONFIG = {
  apiKey: "AIzaSyDDYYHzgfZh5XCBLgEaPSHaI1RnBYAanrw",
  authDomain: "pycs-database-app.firebaseapp.com",
  databaseURL: "https://pycs-database-app.firebaseio.com",
  projectId: "pycs-database-app",
  storageBucket: "pycs-database-app.appspot.com",
  messagingSenderId: "431213152640",
  appId: "1:431213152640:web:8783ba86ce18995a9e5965",
  measurementId: "G-MHTVV1X9ZH"
};

/*
 * Dummy firebase set up for testing purposes. No measurementId is setup so Statistics is unavailable.
 */
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

/**
 * Gets an instance of StorageManager
 * @returns {StorageManager}
 * Instance of StorageManager
 */
export function getStorage() {
  init();
  return StorageManager.getInstance();
}

export default {
  getDatabase: getDatabase,
  getAuthentication: getAuthentication,
  getUserList: getUserList,
  getStorage: getStorage,
};
