import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Controller from './Controller';

/**
 * This class is used to simplify the interaction between the UI and user collection.
 */
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

  checkEmailNotExist(docId, emailLower, onSuccess, onError) {
    if (emailLower) {
      this.userRef
        .where('emailLower', '==', emailLower)
        .get()
        .then((querySnap) => {
          if (querySnap.docs.length > 0) {
            querySnap.docs.forEach((queryDocSnap) => {
              // Perform document id check to allow update on that document
              if (queryDocSnap.id !== docId && onError) {
                let error = new Error('Email already exists');
                error.name = 'DuplicateError';
                throw error;
              }
            });
          }

          // Email is not being used
          onSuccess();
        })
        .catch(onError);
      return;
    }

    if (onError) {
      onError(new Error('Email cannot be empty'));
    }
  }

  /**
   * Add a new document into user collection.
   * @param {user: Object}
   *  Object containing user info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addUser(user, onSuccess, onError) {
    // Update fields used for case-insensitive search and sort. 
    user = {
      ...user,
      nameLower: user.name.toLowerCase(),
      emailLower: user.email.toLowerCase(),
    };

    this.checkEmailNotExist(
      null,
      user.emailLower,
      () => {
        this.userRef
          .add(user)
          .then((docRef) => {
            if (onSuccess) {
              onSuccess(docRef.id);
            }
          })
          .catch(onError);
      },
      onError,
    );
  }

  /**
   * Get a document from user collection.
   * @param {email: string}
   *  Email of the user
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getUser(email, onNext, onError) {
    // Search for the document with provided email
    return this.userRef.where('emailLower', '==', email.toLowerCase()).onSnapshot({
      next: (querySnap) => {
        if (querySnap.docs.length === 0) {
          onNext(null);
        } else {
          // Found the document
          onNext(querySnap.docs[0].data());
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
    // Update fields used for case-insensitive search and sort. 
    data.nameLower = data.name ? data.name.toLowerCase() : '';
    data.emailLower = data.email ? data.email.toLowerCase() : '';

    this.checkEmailNotExist(
      docId,
      data.emailLower,
      () => {
        this.userRef.doc(docId).update(data).then(onSuccess).catch(onError);
      },
      onError,
    );
  }

  /**
   * Update a document in user collection when user do inital sign-in.
   * @param {email: string}
   *  Email of the user who does inital sign-in
   * @param {uid: string}
   *  Firebase uid of the user who does inital sign-in
   * @param {onSuccess?: (doc: Object) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updateFirstTimeUser(email, uid, onSuccess, onError) {
    // Search for the document with provided email
    this.userRef
      .where('emailLower', '==', email.toLowerCase())
      .get()
      .then((querySnap) => {
        if (querySnap.docs.length === 0) {
          throw new Error('Email does not exist');
        }

        // Found the document
        let doc = querySnap.docs[0];
        doc.ref
          .update({ uid: uid })
          .then(() => {
            onSuccess(doc.data());
          })
          .catch(onError);
      })
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
    this.userRef.doc(docId).delete().then(onSuccess).catch(onError);
  }

  /**
   * Get all documents from user collection.
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {limit: number}
   *  Number of documents for a page
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {Controller}
   *  A controller object
   */
  getAllList(filter, sorter, limit, onChildNext, onError) {
    let query = this.userRef;
    let entries = Object.entries(filter);
    if (entries.length > 0) {
      // Get first property of the filter object
      const [searchBy, searchText] = entries[0];

      if (searchText) {
        let lastIndex = searchText.length - 1;
        let searchTextEnd = searchText.substring(0, lastIndex);
        searchTextEnd += String.fromCharCode(searchText.charCodeAt(lastIndex) + 1);

        // Find documents that has a field value starts with searchText value.
        // Because of the orderBy statement here, other orderBy statements have little effect.
        query = query
          .where(searchBy, '>=', searchText)
          .where(searchBy, '<', searchTextEnd)
          .orderBy(searchBy, sorter[searchBy] ? sorter[searchBy] : 'asc');
        return new Controller(query, limit, onChildNext, onError);
      }
    }

    // Using the first property of the sorter object to sort the documents
    const [orderBy, order] = Object.entries(sorter)[0];
    query = query.orderBy(orderBy, order ? order : 'asc');
    return new Controller(query, limit, onChildNext, onError);
  }
}
