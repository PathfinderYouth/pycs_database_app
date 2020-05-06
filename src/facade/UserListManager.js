import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class UserListManager {
  static instance;

  /**
   * Get an instance of UserListManager.
   * @returns {UserListManager}
   *  Instance of UserListManager
   */
  static getInstance() {
    if (!UserListManager.instance) {
      UserListManager.instance = new UserListManager();
    }
    return UserListManager.instance;
  }

  constructor() {
    if (UserListManager.instance) {
      throw new Error('UserListManager is a singleton class');
    }

    this.db = firebase.firestore();
    this.userRef = this.db.collection('user');
  }

  /**
   * Add a new document into user collection.
   * @param {email: string}
   *  Email of the new user
   * @param {role: string}
   *  Role of the new user
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addUser(email, role, onSuccess, onError) {
    this.userRef
      .add({ email: email, role: role })
      .then(docRef => {
        if (onSuccess) {
          onSuccess(docRef.id);
        }
      })
      .catch(onError);
  }

  /**
   * Get a document from user collection.
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getUser(docId, onNext, onError) {
    return this.userRef.doc(docId).onSnapshot({
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
   * Update a document in user collection.
   * @param {docId: string}
   *  Document id
   * @param {data: Object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updateUser(docId, data, onSuccess, onError) {
    this.userRef
      .doc(docId)
      .update(data)
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * Delete a document from user collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deleteUser(docId, onSuccess, onError) {
    this.userRef
      .doc(docId)
      .delete()
      .then(onSuccess)
      .catch(onError);
  }

  /**
   * Get all documents from user collection.
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
    let ref = this.userRef;

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
          onChildNext(doc, docChg.newIndex, docChg.oldIndex, docChg.type);
        });
      },
      error: onError,
    });
  }
}
