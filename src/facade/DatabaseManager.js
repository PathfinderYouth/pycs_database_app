import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Controller from './Controller';
import { eventType, QUERY_FIELDS, status } from '../constants';
import moment from 'moment';

const FieldValue = firebase.firestore.FieldValue;

/**
 * This class is used to simplify the interaction between the UI and participant collections.
 */
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
    this.statRef = this.db.collection('statistics');
  }

  /**
   * Private helper method to help build a query for getting a list of documents.
   * @param {ref: CollectionReference}
   *  A reference to a collection in Firestore
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @returns {Query}
   *  A Firestore query
   */
  _buildQuery(ref, filter, sorter) {
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
        return ref
          .where(searchBy, '>=', searchText)
          .where(searchBy, '<', searchTextEnd)
          .orderBy(searchBy, sorter[searchBy] ? sorter[searchBy] : 'asc');
      }
    }

    // Using the first property of the sorter object to sort the documents
    const [orderBy, order] = Object.entries(sorter)[0];
    return ref.orderBy(orderBy, order ? order : 'asc');
  }

  /**
   * Private helper method to update fields used for case-insensitive search and sort.
   * @param {data: Object}
   *  Object containing participant info
   */
  _updateCaseInsensitiveFields(data) {
    for (const [id, queryId] of QUERY_FIELDS) {
      data[queryId] = data[id] ? data[id].toLowerCase() : '';
    }
  }

  /**
   * Private helper method to check for valid SIN
   * @param {docId: string}
   *  Document id
   * @param {sin: string}
   *  SIN of the participant
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when SIN is valid
   * @param {onError?: (error: Error) => void}
   *  Callback function when SIN is invalid
   */
  _checkSin(docId, sin, onSuccess, onError) {
    if (!!sin) {
      this.permanentRef
        .where('sin', '==', sin)
        .get()
        .then((querySnap) => {
          if (querySnap.docs.length > 0) {
            querySnap.docs.forEach((queryDocSnap) => {
              // Perform document id check to allow update on that document
              if (queryDocSnap.id !== docId && onError) {
                let error = new Error('SIN already exists');
                error.name = 'DuplicateError';
                throw error;
              }
            });
          }

          // SIN is valid (no duplicate found)
          onSuccess();
        })
        .catch(onError);
      return;
    }

    if (onError) {
      onError(new Error('SIN cannot be empty'));
    }
  }

  /**
   * Private helper method to get single document.
   * Generates a list of updated fields
   * @param {Object} oldData
   * @param {Object} newData
   */
  getUpdatedFields(oldData, newData) {
    if (oldData.notes !== newData.notes) {
      return 'notes';
    } else if (oldData.actionPlan !== newData.actionPlan) {
      return 'actionPlan';
    } else {
      let updatedFields = [];
      Object.entries(newData).forEach(([key, value]) => {
        if (value !== oldData[key]) {
          updatedFields.push({
            name: key, // name of field
            oldValue: oldData[key], // old field value
            newValue: value, // new field value
          });
        }
      });
      return updatedFields;
    }
  }

  /**
   * Updates the history list of a participant
   * @param {string} userName
   * @param {string} eventType
   * @param {string} eventText
   * @param {array} oldHistory
   * @param {array} fields
   */
  getUpdatedHistory(userName, eventType, eventText, oldHistory = undefined, fields = undefined) {
    const timestamp = moment.utc().format();
    const event = !!fields
      ? {
          user: userName,
          event: eventType,
          text: eventText,
          fields: fields,
          timestamp: timestamp,
        }
      : {
          user: userName,
          event: eventType,
          text: eventText,
          timestamp: timestamp,
        };
    const history = !!oldHistory ? oldHistory : [];
    return [event, ...history];
  }

  /**
   * Private helper method to get single document
   * @param {ref: CollectionReference}
   *  A reference to a collection in Firestore
   * @param {docId: string}
   *  Document id
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  _getSingleParticipant(ref, docId, onNext, onError) {
    return ref.doc(docId).onSnapshot({
      next: (docSnap) => {
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
   * Add a new participant document into new collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addNew(data, onSuccess, onError) {
    const newHistory = this.getUpdatedHistory(
      'System',
      eventType.CREATED,
      'Registration data submitted by participant',
    );
    let document = {
      ...data,
      status: status.NEW,
      createdAt: moment.utc().format(),
      history: newHistory,
    };
    this._updateCaseInsensitiveFields(document);

    // Add a document in new collection and increase the count in one write batch
    let docRef = this.newRef.doc();
    let batch = this.db.batch();
    batch.set(docRef, document);
    batch.update(this.statRef.doc('participant'), { numOfNew: FieldValue.increment(1) });
    batch
      .commit()
      .then(() => {
        if (onSuccess) {
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
   * Update a participant document in the specified collection.
   * @param {ref: database reference}
   *  Database reference
   * @param {oldData: string}
   *  Old data of the participant
   * @param {newData: Object}
   *  New/updated data of the participant
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (participant: Object) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  _updateDocument(ref, oldData, newData, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory } = oldData;
    const updatedFields = this.getUpdatedFields(oldData, newData);
    let updatedHistory;
    if (updatedFields === 'notes') {
      updatedHistory = this.getUpdatedHistory(
        userName,
        eventType.UPDATED,
        'Note added',
        oldHistory,
      );
    } else if (updatedFields === 'actionPlan') {
      updatedHistory = this.getUpdatedHistory(
        userName,
        eventType.UPDATED,
        'Action plan updated',
        oldHistory,
      );
    } else {
      updatedHistory = this.getUpdatedHistory(
        userName,
        eventType.UPDATED,
        'Participant record updated',
        oldHistory,
        updatedFields,
      );
    }

    const participant = {
      ...newData,
      history: updatedHistory,
    };

    // make a copy of the participant object to strip out id
    let document = { ...participant };
    delete document.id;
    this._updateCaseInsensitiveFields(document);

    ref
      .doc(docId)
      .update(document)
      .then(() => {
        if (onSuccess) {
          onSuccess(participant);
        }
      })
      .catch(onError);
  }

  /**
   * Update a participant document in new collection.
   * @param {oldData: string}
   *  Old data of the participant
   * @param {newData: Object}
   *  New/updated data of the participant
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (participant: Object) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updateNew(oldData, newData, userName, onSuccess, onError) {
    this._updateDocument(this.newRef, oldData, newData, userName, onSuccess, onError);
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
    let docRef = this.newRef.doc(docId);
    let batch = this.db.batch();

    // Delete a document in new collection and decrease the count in one write batch
    batch.delete(docRef);
    batch.update(this.statRef.doc('participant'), { numOfNew: FieldValue.increment(-1) });
    batch.commit().then(onSuccess).catch(onError);
  }

  /**
   * Add a new participant document into permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  addPermanent(data, userName, onSuccess, onError) {
    this._checkSin(
      null,
      data.sin,
      () => {
        const newHistory = this.getUpdatedHistory(
          userName,
          eventType.CREATED,
          'Participant record created',
          data.history,
        );
        let document = {
          ...data,
          status: status.PENDING,
          createdAt: moment.utc().format(),
          history: newHistory,
        };
        this._updateCaseInsensitiveFields(document);

        this.permanentRef
          .add(document)
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
   * @param {oldData: string}
   *  Old data of the participant
   * @param {newData: Object}
   *  New/updated data of the participant
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (participant: Object) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  updatePermanent(oldData, newData, userName, onSuccess, onError) {
    this._checkSin(
      oldData.id,
      newData.sin,
      () => {
        this._updateDocument(this.permanentRef, oldData, newData, userName, onSuccess, onError);
      },
      onError,
    );
  }

  /**
   * Archive a participant document in permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (participant: Object) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  archivePermanent(data, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory, status: participantStatus } = data;
    const updatedHistory = this.getUpdatedHistory(
      userName,
      eventType.ARCHIVED,
      'Participant record archived',
      oldHistory,
    );

    let document = {
      status: status.ARCHIVED,
      prevStatus: participantStatus,
      history: updatedHistory,
    };

    this.permanentRef
      .doc(docId)
      .update(document)
      .then(onSuccess({ ...data, ...document }))
      .catch(onError);
  }

  /**
   * Restore an archived participant document in permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  restorePermanent(data, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory, prevStatus } = data;
    const updatedHistory = this.getUpdatedHistory(
      userName,
      eventType.RESTORED,
      'Participant record restored',
      oldHistory,
    );

    let document = {
      status: prevStatus,
      history: updatedHistory,
    };

    this.permanentRef.doc(docId).update(document).then(onSuccess).catch(onError);
  }

  /**
   * Delete a participant document forever from permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  deletePermanent(docId, onSuccess, onError) {
    this.permanentRef.doc(docId).delete().then(onSuccess).catch(onError);
  }

  /**
   * Move a document in new collection to permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: (docId: string) => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  moveToPermanent(data, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory, sin } = data;
    this._checkSin(
      null,
      sin,
      () => {
        const updatedHistory = this.getUpdatedHistory(
          userName,
          eventType.MOVED,
          'Participant record saved to database',
          oldHistory,
        );

        let oldDocRef = this.newRef.doc(docId);
        let newDocRef = this.permanentRef.doc(docId);
        let updateFunction = (transaction) => {
          return transaction.get(oldDocRef).then((docSnap) => {
            let doc = docSnap.data();
            if (!doc) {
              throw new Error('Document does not exist');
            }

            doc.status = status.PENDING;
            doc.history = updatedHistory;

            // Copy the document to permanent collection, delete the old document, and decrease the
            // count in one transaction
            transaction.set(newDocRef, doc);
            transaction.delete(oldDocRef);
            transaction.update(this.statRef.doc('participant'), {
              numOfNew: FieldValue.increment(-1),
            });
          });
        };

        this.db
          .runTransaction(updateFunction)
          .then(() => {
            if (onSuccess) {
              onSuccess(newDocRef.id);
            }
          })
          .catch(onError);
      },
      onError,
    );
  }

  /**
   * Approve a pending document in permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {confirmationNumber: string}
   *  The confirmation number
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  approvePending(data, userName, confirmationNumber, onSuccess, onError) {
    const { id: docId, history: oldHistory } = data;
    const updatedHistory = this.getUpdatedHistory(
      userName,
      eventType.APPROVED,
      'Participant approved',
      oldHistory,
    );

    let document = {
      status: status.APPROVED,
      confirmationNumber: confirmationNumber,
      history: updatedHistory,
    };

    this.permanentRef.doc(docId).update(document).then(onSuccess).catch(onError);
  }

  /**
   * Decline a pending document in permanent collection.
   * @param {data: Object}
   *  Object containing participant info
   * @param {userName: string}
   *  Username of the user performing the update action
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  declinePending(data, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory } = data;
    const updatedHistory = this.getUpdatedHistory(
      userName,
      eventType.DECLINED,
      'Participant declined',
      oldHistory,
    );
    let document = {
      status: status.DECLINED,
      history: updatedHistory,
    };

    this.permanentRef.doc(docId).update(document).then(onSuccess).catch(onError);
  }

  /**
   * Get all participant documents from new collection.
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {limit: number}
   *  Number of documents for a page
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onSuccess: (isLoaded: boolean) => void}
   *  Callback function when fetching data is done
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {Controller}
   *  A controller object
   */
  getNewList(filter, sorter, limit, onChildNext, onSuccess, onError) {
    // Remove the status property from filter object before building a query
    let { status, ...newFilter } = filter;
    let query = this._buildQuery(this.newRef, newFilter, sorter);
    return new Controller(query, limit, onChildNext, onSuccess, onError);
  }

  /**
   * Get participant documents from permanent collection.
   * @param {filter: Object}
   *  Object containing fields and values for filtering
   * @param {sorter: Object}
   *  Object containing fields and orders for sorting
   * @param {limit: number}
   *  Number of documents for a page
   * @param {onChildNext: (doc: Object, newIndex: number,
   *                       oldIndex: number, type: string) => void}
   *  Callback function when document changes in the collection
   * @param {onSuccess: (isLoaded: boolean) => void}
   *  Callback function when fetching data is completed
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {Controller}
   *  A controller object
   */
  getPermanentList(filter, sorter, limit, onChildNext, onSuccess, onError) {
    let { status: participantStatus, ...newFilter } = filter;
    let query = this._buildQuery(this.permanentRef, newFilter, sorter);

    // Filter documents by status field
    if (participantStatus) {
      query = query.where('status', '==', participantStatus);
    } else {
      // Ignore 'Archived' status by default
      query = query.where('status', 'in', [status.PENDING, status.APPROVED, status.DECLINED]);
    }
    return new Controller(query, limit, onChildNext, onSuccess, onError);
  }

  /**
   * Get entire permanent participants collection. Use only for statistics.
   * @param {callback: (participantsList: Array<Object>) => void}
   *  Callback function when fetching data is completed
   */
  getAllPermanentParticipants(callback) {
    this.permanentRef
      .where('status', 'in', [status.PENDING, status.APPROVED, status.DECLINED])
      .get()
      .then(function (querySnapshot) {
        let participantsList = [];
        querySnapshot.forEach(function (doc) {
          participantsList.push(doc.data());
        });
        callback(participantsList);
      });
  }

  /**
   * Get participant statistical info stored in a firestore document.
   * @param {onNext: (doc: Object) => void}
   *  Callback function when document changes
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {() => void}
   *  Unsubscribe function
   */
  getNumOfNew(onNext, onError) {
    return this.statRef.doc('participant').onSnapshot({
      next: (docSnap) => {
        onNext(docSnap.data());
      },
      error: onError,
    });
  }

  getStatisticsGroups(onNext, onError) {
    return this.statRef.doc('statsCount').onSnapshot({
      next: (docSnap) => {
        onNext(docSnap.data());
      },
      error: onError,
    });
  }

  getTotalCounts(onNext, onError) {
    return this.statRef.doc('totalCounts').onSnapshot({
      next: (docSnap) => {
        onNext(docSnap.data());
      },
      error: onError,
    });
  }

  getAllStatistics(callback) {
    return this.statRef.get().then(function (querySnapshot) {
      let statistics = {};
      querySnapshot.forEach(function (doc) {
        statistics[doc.id] = doc.data();
      });
      callback(statistics);
    });
  }

  addStatsCounts(totalCounts, statisticsGroups, onSuccess, onError) {
    const batch = this.db.batch();
    batch.set(this.statRef.doc('totalCounts'), { ...totalCounts });
    batch.set(this.statRef.doc('statisticsGroups'), {
      ...statisticsGroups,
      createdAt: moment.utc().format(),
    });

    batch.commit().then(onSuccess(statisticsGroups)).catch(onError);
  }
}
