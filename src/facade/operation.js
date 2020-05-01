import * as firebase from "firebase/app";
import "firebase/firestore";

const FieldValue = firebase.firestore.FieldValue;
const Timestamp = firebase.firestore.Timestamp;

const STATUS = {
  new: "New",
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
  deleted: "Deleted"
}

// TODO: converter, query, order, limit, paging, indices, cached

export default class Operation {
  static instance;
  
  /**
   * Get an instance of Operation.
   * @returns {Operation}
   *  Instance of Operation
   */
  static getInstance() {
    if (!Operation.instance) {
      Operation.instance = new Operation();
    }
    return Operation.instance;
  }
  
  constructor() {
    if (Operation.instance) {
      throw new Error("Operation is a singleton class");
    }
    
    this.db = firebase.firestore();
    this.permanentRef = this.db.collection("permanent");
    this.newRef = this.db.collection("new");
  }
  
  /**
   * Add a new participant document into new collection.
   * @param {participant: object}
   *  Object containing participant info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addNew(participant, onSuccess, onError) {
    let document = Object.assign({}, participant, {
      status: STATUS.new,
      history: FieldValue.arrayUnion({
        user: "System",
        event: "Received registration data from paticipant.",
        timestamp: Timestamp.now()
      })
    });
    
    this.newRef.add(document)
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
   * Get a participant document from new collection.
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Document) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNew(docId, onNext, onError) {
    return this.newRef.doc(docId)
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
   * Update a participant document in new collection.
   * @param {docId: string}
   *  Document id
   * @param {data: object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updateNew(docId, data, onSuccess, onError) {
    let document = Object.assign({}, data, {
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Updated",
        timestamp: Timestamp.now()
      })
    });
    
    this.newRef.doc(docId).update(document)
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
   * Delete a participant document from new collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deleteNew(docId, onSuccess, onError) {
    this.newRef.doc(docId).delete()
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
   * Add a new participant document into permanent collection.
   * @param {participant: object}
   *  Object containing participant info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addPermanent(participant, onSuccess, onError) {
    let document = Object.assign({}, participant, {
      status: STATUS.pending,
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
   * Get a participant document from permanent collection.
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
   * Update a participant document in permanent collection.
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
   * Delete a participant document from permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deletePermanent(docId, onSuccess, onError) {
    let document = {
      status: STATUS.deleted,
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
  
  /**
   * Undo deleting a participant document from permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  undoDeletePermanent(docId, onSuccess, onError) {
    let document = {
      // TODO: revert back to old state
      status: STATUS.pending,
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Undid deleting",
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
  
  /**
   * Move a document in new collection to permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  moveToPermanent(docId, onSuccess, onError) {
    let oldDocRef = this.newRef.doc(docId);
    let newDocRef = this.permanentRef.doc(); // put docId in to keep same ID
    let updateFunction = (transaction) => {
      return transaction.get(oldDocRef).then((docSnap) => {
        let doc = docSnap.data();
        if (!doc) {
          throw new Error("Document not exist");
        }
        
        doc.status = STATUS.pending;
        doc.history.push({
          user: "TODO",
          event: "TODO: Moved",
          timestamp: Timestamp.now()
        });
        
        transaction.set(newDocRef, doc);
        transaction.delete(oldDocRef);
      });
    };
    
    return this.db.runTransaction(updateFunction)
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
   * Approve a pending document in permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  approvePending(docId, onSuccess, onError) {
    let document = {
      status: STATUS.approved,
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Approved",
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
  
  /**
   * Decline a pending document in permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  declinePending(docId, onSuccess, onError) {
    let document = {
      status: STATUS.declined,
      history: FieldValue.arrayUnion({
        user: "TODO",
        event: "TODO: Declined",
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
  
  /**
   * Get all participant documents from new collection.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNewList(onChildNext, onError) {
    return this.newRef
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
   * Get all pending participant documents from permanent collection.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPendingList(onChildNext, onError) {
    return this.permanentRef.where("status", "==", STATUS.pending)
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
   * Get all approved participant documents from permanent collection.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getApprovedList(onChildNext, onError) {
    return this.permanentRef.where("status", "==", STATUS.approved)
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
   * Get all declined participant documents from permanent collection.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getDeclinedList(onChildNext, onError) {
    return this.permanentRef.where("status", "==", STATUS.declined)
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
   * Get all deleted participant documents from permanent collection.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getDeletedList(onChildNext, onError) {
    return this.permanentRef.where("status", "==", STATUS.deleted)
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
   * Get all participant documents from both new and permanent collections.
   * @param {onChildNext: (doc: Document, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getAllDocuments(onChildNext, onError) {
    let unsubNew = this.getNewList(onChildNext, onError);
    let unsubPermanent = this.permanentRef
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
    
    return () => {
      unsubNew();
      unsubPermanent();
    };
  }
}
