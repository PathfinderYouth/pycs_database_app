import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Controller from './Controller';
import { status, eventType, QUERY_FIELDS } from '../constants';
import moment from 'moment';

const FieldValue = firebase.firestore.FieldValue;

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
   */
  _buildQuery(ref, filter, sorter) {
    let entries = Object.entries(filter);
    if (entries.length > 0) {
      const [searchBy, searchText] = entries[0];

      if (searchText) {
        let lastIndex = searchText.length - 1;
        let searchTextEnd = searchText.substring(0, lastIndex);
        searchTextEnd += String.fromCharCode(searchText.charCodeAt(lastIndex) + 1);

        return ref
          .where(searchBy, '>=', searchText)
          .where(searchBy, '<', searchTextEnd)
          .orderBy(searchBy, sorter[searchBy] ? sorter[searchBy] : 'asc');
      }
    }

    const [orderBy, order] = Object.entries(sorter)[0];
    return ref.orderBy(orderBy, order ? order : 'asc');
  }

  _updateCaseInsensitiveFields(data) {
    for (const [id, queryId] of QUERY_FIELDS) {
      data[queryId] = data[id] ? data[id].toLowerCase() : '';
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
   * @param {participant: Object}
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
      'Received registration data from participant',
    );
    let document = {
      ...data,
      status: status.NEW,
      createdAt: moment.utc().format(),
      history: newHistory,
    };
    this._updateCaseInsensitiveFields(document);

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
   * @param {docId: string}
   *  Document id
   * @param {data: Object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  _updateDocument(ref, oldData, newData, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory } = oldData;
    const updatedFields = this.getUpdatedFields(oldData, newData);
    const updatedHistory =
      updatedFields === 'notes'
        ? this.getUpdatedHistory(userName, eventType.UPDATED, 'Note added', oldHistory)
        : this.getUpdatedHistory(
            userName,
            eventType.UPDATED,
            'Participant record updated',
            oldHistory,
            updatedFields,
          );

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
   * @param {docId: string}
   *  Document id
   * @param {data: Object}
   *  Object containing updated values
   * @param {onSuccess?: () => void}
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

    batch.delete(docRef);
    batch.update(this.statRef.doc('participant'), { numOfNew: FieldValue.increment(-1) });
    batch.commit().then(onSuccess).catch(onError);
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
  addPermanent(data, userName, onSuccess, onError) {
    const newHistory = this.getUpdatedHistory(
      userName,
      eventType.CREATED,
      'Created new participant record',
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
  updatePermanent(oldData, newData, userName, onSuccess, onError) {
    this._updateDocument(this.permanentRef, oldData, newData, userName, onSuccess, onError);
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
  deletePermanent(data, userName, onSuccess, onError) {
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
   * Undo deleting a participant document from permanent collection.
   * @param {docId: string}
   *  Document id
   * @param {onSuccess?: () => void}
   *  Callback function when success
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   */
  undoDeletePermanent(data, userName, onSuccess, onError) {
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
  deleteForeverPermanent(docId, onSuccess, onError) {
    this.permanentRef.doc(docId).delete().then(onSuccess).catch(onError);
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
  moveToPermanent(data, userName, onSuccess, onError) {
    const { id: docId, history: oldHistory } = data;
    const updatedHistory = this.getUpdatedHistory(
      userName,
      eventType.MOVED,
      'Participant record saved to database',
      oldHistory,
    );

    let oldDocRef = this.newRef.doc(docId);
    let newDocRef = this.permanentRef.doc(docId); // put docId in to keep same ID
    let updateFunction = (transaction) => {
      return transaction.get(oldDocRef).then((docSnap) => {
        let doc = docSnap.data();
        if (!doc) {
          throw new Error('Document does not exist');
        }

        doc.status = status.PENDING;
        doc.history = updatedHistory;

        transaction.set(newDocRef, doc);
        transaction.delete(oldDocRef);
      });
    };

    return this.db
      .runTransaction(updateFunction)
      .then(() => {
        if (onSuccess) {
          onSuccess(newDocRef.id);
          this.statRef.doc('participant').update({ numOfNew: FieldValue.increment(-1) })
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
   * @param {docId: string}
   *  Document id
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
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {Controller}
   *  A controller object
   */
  getNewList(filter, sorter, limit, onChildNext, onError) {
    let { status, ...newFilter } = filter;
    let query = this._buildQuery(this.newRef, newFilter, sorter);
    return new Controller(query, limit, onChildNext, onError);
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
   * @param {onError?: (error: Error) => void}
   *  Callback function when fail
   * @returns {Controller}
   *  A controller object
   */
  getPermanentList(filter, sorter, limit, onChildNext, onError) {
    let { status: participantStatus, ...newFilter } = filter;
    let query = this._buildQuery(this.permanentRef, newFilter, sorter);

    if (participantStatus) {
      query = query.where('status', '==', participantStatus);
    } else {
      query = query.where('status', 'in', [status.PENDING, status.APPROVED, status.DECLINED]);
    }
    return new Controller(query, limit, onChildNext, onError);
  }

  /**
   * Get entire permanent participants collection. Use only for statistics.
   * @param callback
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
