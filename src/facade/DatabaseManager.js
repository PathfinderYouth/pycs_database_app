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

export default class DatabaseManager {
  static instance;

  /**
   * Get an instance of DatabaseManager.
   * @returns {DatabaseManager}
   *  Instance of DatabaseManager
   */
  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  constructor() {
    if (DatabaseManager.instance) {
      throw new Error('DatabaseManager is a singleton class');
    }

    this.db = firebase.firestore();
    this.permanentRef = this.db.collection('permanent');
    this.newRef = this.db.collection('new');
  }

  /**
   * Private helper method to get single document
   */
  _getSingleParticipant(ref, docId, onNext, onError) {
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
   * Private helper method to get list of documents
   */
  _getList(ref, filter, sorter, onChildNext, onError) {
    for (const field in filter) {
      if (filter[field]) {
        ref = ref.where(field, '==', filter[field]);
      }
    }

    for (const field in sorter) {
      ref = ref.orderBy(field, sorter[field] ? sorter[field] : undefined);
    }

    return ref.onSnapshot({
      next: querySnap => {
        querySnap.docChanges().forEach(docChg => {
          let doc = docChg.doc.data();
          doc.id = docChg.doc.id;
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
      createdAt: FieldValue.serverTimestamp(),
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
    return this._getSingleParticipant(this.newRef, docId, onNext, onError);
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
      createdAt: FieldValue.serverTimestamp(),
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
    let ref = this.permanentRef;
    return this._getSingleParticipant(ref, docId, onNext, onError);
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
   * @param {onSuccess?: (docId: string) => void}
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
      .then(() => {
        if (onSuccess) {
          onSuccess(newDocRef.id);
        }
      })
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
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNewList(filter, sorter, onChildNext, onError) {
    return this._getList(this.newRef, filter, sorter, onChildNext, onError);
  }

  /**
   * Get all participant documents from permanent collection.
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getPermanentList(filter, sorter, onChildNext, onError) {
    let ref = this.permanentRef;
    return this._getList(ref, filter, sorter, onChildNext, onError);
  }

  /**
   * Get all participant documents from both new and permanent collections.
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getAllList(filter, sorter, onChildNext, onError) {
    let unsubNew = this.getNewList(filter, sorter, onChildNext, onError);
    let unsubPer = this.getPermanentList(filter, sorter, onChildNext, onError);

    return () => {
      unsubNew();
      unsubPer();
    };
  }
}
