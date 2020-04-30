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

const FieldValue = firebase.firestore.FieldValue;
const Timestamp = firebase.firestore.Timestamp;

// TODO: converter, query, order, limit, paging, indices, cached

export default class FirebaseFacade {
  static instance;
  
  /**
   * Get an instance of FirebaseFacade.
   * @returns {FirebaseFacade}
   *  Instance of FirebaseFacade
   */
  static getInstance() {
    if (!FirebaseFacade.instance) {
      FirebaseFacade.instance = new FirebaseFacade();
    }
    return FirebaseFacade.instance;
  }
  
  constructor() {
    if (FirebaseFacade.instance) {
      throw new Error("FirebaseFacade is a singleton class");
    }
    
    firebase.initializeApp(CONFIG);
    this.db = firebase.firestore();
    this.permanentRef = this.db.collection("participants");
    this.pendingRef = this.db.collection("pending");
  }
  
  /**
   * Add a new participant document into pending collection
   * @param {participant: object}
   *  Object containing participant info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addPending(participant, onSuccess, onError) {
    let document = Object.assign({}, participant, {
      status: "Pending",
      history: FieldValue.arrayUnion({
        user: "System",
        event: "Received registration data from paticipant.",
        timestamp: Timestamp.now()
      })
    });
    
    this.pendingRef.add(document)
      .then((docRef) => {
        if (onSuccess) {
          // Could use docRef.data() to get doc content instead
          onSuccess(docRef.id);
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
  
  /**
   * Get a participant document from pending collection
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Document) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPending(docId, onNext, onError) {
    return this.pendingRef.doc(docId)
      .onSnapshot({
        next: (docSnap) => {
          let doc = docSnap.data();
          if (doc) {
            onNext(doc);
            return;
          }
          if (onError) {
            onError(new Error("Document not exist"));
          }
        },
        error: (error) =>{
          if (onError) {
            onError(error);
          }
        }
      });
  }
  
  /**
   * Get all participant documents from pending collection
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPendingList(onChildNext, onError) {
    return this.pendingRef
      .onSnapshot({
        next: (querySnap) => {
          querySnap.docChanges().forEach((docChg) => {
            let doc = docChg.doc.data();
            onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
          });
        },
        error: (error) => {
          if (onError) {
            onError(error);
          }
        }
      });
  }
  
  /**
   * Update a participant document in pending collection
   * @param {docId: string}
   *  Document id
   * @param {data: object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updatePending(docId, data, onSuccess, onError) {
    let document = Object.assign({}, data, {
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO",
        timestamp: Timestamp.now()
      })
    });
    
    this.pendingRef.doc(docId).update(document)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
  
  /**
   * Delete a participant document from pending collection
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deletePending(docId, onSuccess, onError) {
    this.pendingRef.doc(docId).delete()
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
  
  /**
   * Add a new participant document into permanent collection
   * @param {participant: object}
   *  Object containing participant info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addPermanent(participant, onSuccess, onError) {
    let document = Object.assign({}, participant, {
      status: "Approved",
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Created",
        timestamp: Timestamp.now()
      })
    });
    
    this.permanentRef.add(document)
      .then((docRef) => {
        if (onSuccess) {
          // Could use docRef.data() to get doc content instead
          onSuccess(docRef.id);
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
  
  /**
   * Get a participant document from permanent collection
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Document) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPermanent(docId, onNext, onError) {
    return this.permanentRef.doc(docId)
      .onSnapshot({
        next: (docSnap) => {
          let doc = docSnap.data();
          if (doc) {
            onNext(doc);
            return;
          }
          if (onError) {
            onError(new Error("Document not exist"));
          }
        },
        error: (error) =>{
          if (onError) {
            onError(error);
          }
        }
      });
  }
  
  /**
   * Get all participant documents from permanent collection
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPermanentList(onChildNext, onError) {
    return this.permanentRef
      .onSnapshot({
        next: (querySnap) => {
          querySnap.docChanges().forEach((docChg) => {
            let doc = docChg.doc.data();
            onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
          });
        },
        error: (error) => {
          if (onError) {
            onError(error);
          }
        }
      });
  }
  
  /**
   * Update a participant document in permanent collection
   * @param {docId: string}
   *  Document id
   * @param {data: object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updatePermanent(docId, data, onSuccess, onError) {
    let document = Object.assign({}, data, {
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Updated",
        timestamp: Timestamp.now()
      })
    });
    
    this.permanentRef.doc(docId).update(document)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
  
  /**
   * Delete a participant document from permanent collection
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deletePermanent(docId, onSuccess, onError) {
    let document = {
      status: "Deleted",
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Deleted",
        timestamp: Timestamp.now()
      })
    };
    
    this.permanentRef.doc(docId).update(document)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
      });
  }
}
