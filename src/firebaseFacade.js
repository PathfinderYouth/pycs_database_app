import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

const PARTICIPANTS = "participants";
const PENDING = "pending";

export default class FirebaseFacade {
  static instance;
  
  /**
   * Get an instance of FirebaseFacade.
   * @returns {FirebaseFacade} instance of FirebaseFacade
   */
  static getInstance() {
    if (!FirebaseFacade.instance) {
      FirebaseFacade.instance = new FirebaseFacade();
    }
    return FirebaseFacade.instance;
  }
  
  constructor(brand) {
    if (FirebaseFacade.instance) {
      throw new Error("FirebaseFacade is a singleton class");
    }
    
    firebase.initializeApp(CONFIG);
    this.db = firebase.firestore();
  }
  
  /**
   * Add a new participant document into pending collection
   * @param {object} participant Javascript object containing participant info
   * @param {function (DocumentReference)} onSuccess Callback function when
   *  success
   * @param {function (Error)} onFail Callback function when fail
   */
  addPending(participant, onSuccess, onFail) {
    // TODO: using sin as key => docRef.set(optional merge)
    this.db.collection(PENDING)
      .add(participant)
      .then((docRef) => {
        if (onSuccess) {
          // TODO: create object instead of providing a DocumentReference
          onSuccess(docRef);
        }
        
        // TODO: Log creation action
      })
      .catch((error) => {
        if (onFail) {
          onFail(error);
        }
      });
  }
  
  /**
   * Get a participant document from pending collection
   * @param {string} sin SIN number
   */
  getPending(sin) {
    // TODO: implement
  }
  
  /**
   * Get all participant documents from pending collection
   * @param {function (QuerySnapshot)} onSuccess Callback function when success
   * @param {function (error)} onFail Callback function when fail
   */
  getPendingList(onSuccess, onFail) {
    this.db.collection(PENDING).get()
      .then((querySnapshot) => {
        if (onSuccess) {
          // TODO: create list of objects instead of providing a querySnapshot
          onSuccess(querySnapshot);
        }
      })
      .catch((error) => {
        if (onFail) {
          onFail(error);
        }
      });
  }
  
  /**
   * Update a participant document in pending collection
   * @param {string} sin SIN number
   * @param {object} partialData Javascript object containing updated values
   * @param {function ()} onSuccess Callback function when success
   * @param {function (error)} onFail Callback function when fail
   */
  updatePending(sin, partialData, onSuccess, onFail) {
    this.db.doc(`${PENDING}/${sin}`)
      .update(partialData)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
        
        // TODO: Log update action
      })
      .catch(() => {
        if (onFail) {
          onFail(error);
        }
      });
  }
  
  /**
   * Delete a participant document from pending collection
   */
  deletePending() {
    // TODO: implement
  }
}
