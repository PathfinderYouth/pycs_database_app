import * as firebase from 'firebase/app';
import 'firebase/firestore';

const FieldValue = firebase.firestore.FieldValue;
const Timestamp = firebase.firestore.Timestamp;

const STATUS = {
  new: 'New',
  pending: 'Pending',
  approved: 'Approved',
  declined: 'Declined',
  deleted: 'Deleted',
};

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
      throw new Error('Operation is a singleton class');
    }

    this.db = firebase.firestore();
    this.permanentRef = this.db.collection('permanent');
    this.newRef = this.db.collection('new');
  }

  /**
   * Helper method to get single document
   */
  _getSingle(ref, docId, onNext, onError) {
    return ref.doc(docId).onSnapshot({
      next: docSnap => {
        let doc = docSnap.data();
        if (doc) {
          onNext(doc);
          return;
        }

        if (onError) {
          onError(new Error('Document does not exist'));
        }
      },
      error: onError,
    });
  }

  /**
   * Helper method to get list of documents
   */
  _getList(ref, onChildNext, onError, status) {
    if (status) {
      ref = ref.where('status', '==', status);
    }

    return ref.onSnapshot({
      next: querySnap => {
        querySnap.docChanges().forEach(docChg => {
          let doc = docChg.doc.data();
          onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
        });
      },
      error: onError,
    });
  }

  /**
   * Add a new participant document into new collection.
   * @param {participant: Object}
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
        user: 'System',
        event: 'Received registration data from participant.',
        timestamp: Timestamp.now(),
      }),
    });

    this.newRef
      .add(document)
      .then(docRef => {
        if (onSuccess) {
          // Could use docRef.data() to get doc content instead
          onSuccess(docRef.id);
        }
      })
      .catch(onError);
  }

  /**
   * Get a participant document from new collection.
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNew(docId, onNext, onError) {
    return this._getSingle(this.newRef, docId, onNext, onError);
  }

  /**
   * Update a participant document in new collection.
   * @param {docId: string}
   *  Document id
   * @param {data: Object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updateNew(docId, data, onSuccess, onError) {
    let document = Object.assign({}, data, {
      history: FieldValue.arrayUnion({
        user: 'TODO',
        event: 'TODO: Updated',
        timestamp: Timestamp.now(),
      }),
    });

    this.newRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
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
    this.newRef
      .doc(docId)
      .delete()
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * Add a new participant document into permanent collection.
   * @param {participant: Object}
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
        user: 'TODO',
        event: 'TODO: Created',
        timestamp: Timestamp.now(),
      }),
    });

    this.permanentRef
      .add(document)
      .then(docRef => {
        if (onSuccess) {
          // Could use docRef.data() to get doc content instead
          onSuccess(docRef.id);
        }
      })
      .catch(onError);
  }

  /**
   * Get a participant document from permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPermanent(docId, onNext, onError) {
    return this._getSingle(this.permanentRef, docId, onNext, onError);
  }

  /**
   * Update a participant document in permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {data: Object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updatePermanent(docId, data, onSuccess, onError) {
    let document = Object.assign({}, data, {
      history: FieldValue.arrayUnion({
        user: 'TODO',
        event: 'TODO: Updated',
        timestamp: Timestamp.now(),
      }),
    });

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
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
        user: 'TODO',
        event: 'TODO: Deleted',
        timestamp: Timestamp.now(),
      }),
    };

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
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
        user: 'TODO',
        event: 'TODO: Undid deleting',
        timestamp: Timestamp.now(),
      }),
    };

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
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
    let updateFunction = transaction => {
      return transaction.get(oldDocRef).then(docSnap => {
        let doc = docSnap.data();
        if (!doc) {
          throw new Error('Document does not exist');
        }

        doc.status = STATUS.pending;
        doc.history.push({
          user: 'TODO',
          event: 'TODO: Moved',
          timestamp: Timestamp.now(),
        });

        transaction.set(newDocRef, doc);
        transaction.delete(oldDocRef);
      });
    };

    return this.db
      .runTransaction(updateFunction)
      .then(onSuccess)
      .catch(onError);
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
        user: 'TODO',
        event: 'TODO: Approved',
        timestamp: Timestamp.now(),
      }),
    };

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
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
        user: 'TODO',
        event: 'TODO: Declined',
        timestamp: Timestamp.now(),
      }),
    };

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * Get all participant documents from new collection.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNewList(onChildNext, onError) {
    return this._getList(this.newRef, onChildNext, onError);
  }

  /**
   * Get all pending participant documents from permanent collection.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPendingList(onChildNext, onError) {
    let status = STATUS.pending;
    return this._getList(this.permanentRef, onChildNext, onError, status);
  }

  /**
   * Get all approved participant documents from permanent collection.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getApprovedList(onChildNext, onError) {
    let status = STATUS.approved;
    return this._getList(this.permanentRef, onChildNext, onError, status);
  }

  /**
   * Get all declined participant documents from permanent collection.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getDeclinedList(onChildNext, onError) {
    let status = STATUS.declined;
    return this._getList(this.permanentRef, onChildNext, onError, status);
  }

  /**
   * Get all deleted participant documents from permanent collection.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getDeletedList(onChildNext, onError) {
    let status = STATUS.deleted;
    return this._getList(this.permanentRef, onChildNext, onError, status);
  }

  /**
   * Get all participant documents from both new and permanent collections.
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getAllDocuments(onChildNext, onError) {
    let unsubNew = this.getNewList(onChildNext, onError);
    let unsubPerm = this._getList(this.permanentRef, onChildNext, onError);

    return () => {
      unsubNew();
      unsubPerm();
    };
  }
}
