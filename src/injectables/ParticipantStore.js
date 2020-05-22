import { action, autorun, computed, decorate, observable } from 'mobx';
import { collectionType } from '../constants';
import service from '../facade/service';
import { uiStore } from '../injectables';

const db = service.getDatabase();

/**
 * Object equality function
 * @param {Object} obj1
 * @param {Object} obj2
 */
const checkEqual = (obj1, obj2) => {
  return Object.entries(obj1).sort().toString() === Object.entries(obj2).sort().toString();
};

/**
 * MobX state management store for the participant data
 */
class ParticipantStore {
  documentType = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };

  // current filter
  _filter = { status: null };

  // current sorter
  _sorter = { createdAt: 'desc' };

  // number of results allowed per page
  _limit = 20;

  // list of participants fetched from Firestore
  _participants = [];

  // currently-selected participant
  _currentParticipant = null;

  // current collection being fetched - new | permanent
  _collection = collectionType.PERMANENT;

  // Controller object for filtering/sorting/listening
  _controller = null;

  // isLastPage flag
  _isLastPage = true;

  // statistics fetched from the database
  _statistics = null;

  // isListLoading flag
  isListLoading = false;

  constructor() {
    db.getNumOfNew(
      (doc) => {
        this._statistics = doc;
      },
      () => {
        /* Do nothing. This is to catch the Firestore permissions console warning on
         * the login page. It will try again to get this number once it's logged in. */
      },
    );
  }

  /**
   * A function acts as an event listener/handler for when any document in the current query
   * changes. Firestore will send the event, and this method will handle it. Reference:
   * https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentChange
   * @param {doc: Object}
   *  The participant data/document
   * @param {newIndex: number}
   *  The new index of the document
   * @param {oldIndex: number}
   *  The old index of the document
   * @param {type: string}
   *  Type of document change. Can be either 'added', 'modified', or 'removed'
   */
  _onChildNext = (doc, newIndex, oldIndex, type) => {
    let newList = this._participants.slice();

    switch (type) {
      case this.documentType.ADDED:
        newList.splice(newIndex, 0, doc);
        break;

      case this.documentType.MODIFIED:
        newList.splice(oldIndex, 1);
        newList.splice(newIndex, 0, doc);
        break;

      case this.documentType.REMOVED:
        newList.splice(oldIndex, 1);
        break;

      default:
      // Do nothing
    }

    this._participants = newList;
    this.setIsListLoading(false);

    // Update last page status
    this._isLastPage =
      newList.length > 0 ? this._controller.endId === newList[newList.length - 1].id : true;
  };

  /**
   * An autorun function for making a new query when there are changes in UI.
   */
  _updateList = autorun(
    () => {
      // Don't run if not on database view (i.e., login or intake form)
      if (uiStore.databaseActive) {
        // Run this whenever type of collection, filter, or sorter changes
        this.setIsListLoading(true);

        // Unsubscribe to previous real-time listener and reset list to empty
        if (this._controller) {
          this._isLastPage = true;
          this._participants = [];
          this._controller.unsubscribe();
        }

        switch (this._collection) {
          case collectionType.NEW:
            this._controller = db.getNewList(
              this._filter,
              this._sorter,
              this._limit,
              this._onChildNext,
              this.setIsListLoading,
            );
            break;

          case collectionType.PERMANENT:
            this._controller = db.getPermanentList(
              this._filter,
              this._sorter,
              this._limit,
              this._onChildNext,
              this.setIsListLoading,
            );
            break;

          default:
          // Do nothing
        }
      }
    },
    // Setting delay so we don't make too many queries in a short amount of time
    { delay: 500 },
  );

  /**
   * Setter for currentParticipant
   * @param {Object} participant participant data object
   */
  setCurrentParticipant = (participant) => {
    this._currentParticipant = participant;
  };

  /**
   * Setter for filter
   * @param {Object} filter filter object
   */
  setFilter = (filter) => {
    if (checkEqual(filter, this._filter)) {
      return;
    }

    let { status: oldStatus, ...oldFilter } = this._filter;
    let { status: newStatus, ...newFilter } = filter;
    if (oldStatus === newStatus && !Object.values(oldFilter)[0] && !Object.values(newFilter)[0]) {
      return;
    }

    this._filter = filter;
  };

  /**
   * Setter for sorter
   * @param {Object} sorter sorter object
   */
  setSorter = (sorter) => {
    if (checkEqual(sorter, this._sorter)) {
      return;
    }
    this._sorter = sorter;
  };

  /**
   * Setter for limit
   * @param {int} limit page limit
   */
  setLimit = (limit) => {
    this._limit = limit;
  };

  /**
   * Setter for collection
   * @param {string} collection collection type - new | permanent
   */
  setCollection = (collection) => {
    this._collection = collection;
  };

  /**
   * Backward page change handler function
   */
  goToPreviousPage = () => {
    this._controller.back(() => {
      this.isListLoading = true;
      this._participants = [];
    });
  };

  /**
   * Forward page change handler function
   */
  goToNextPage = () => {
    this._controller.next(() => {
      this.isListLoading = true;
      this._participants = [];
    });
  };

  /**
   * Setter for isLoading flag
   * @param {boolean} isLoading isLoading flag
   */
  setIsListLoading = (isLoading) => {
    this.isListLoading = isLoading;
  };

  /**
   * Getter for participants
   */
  get participants() {
    return this._participants;
  }

  /**
   * Getter for collection
   */
  get collection() {
    return this._collection;
  }

  /**
   * Getter for currentParticipant
   */
  get currentParticipant() {
    return this._currentParticipant;
  }

  /**
   * Getter for numOfNew. Returns 0 if statistics is not defined
   */
  get numOfNewParticipants() {
    if (this._statistics && this._statistics.numOfNew) {
      return this._statistics.numOfNew;
    }
    return 0;
  }

  /**
   * Getter for statisticsGroupCounts (if defined)
   */
  get statisticsCounts() {
    if (this._statisticsGroupCounts) {
      return this._statisticsGroupCounts;
    }
    return null;
  }

  /**
   * Getter for isLastPage
   */
  get isLastPage() {
    return this._isLastPage;
  }

  /**
   * Getter for limit
   */
  get limit() {
    return this._limit;
  }

  /**
   * Clear store function that resets all observables to initial values and clears participant data
   */
  clearStore = () => {
    this._filter = { status: null };
    this._sorter = { createdAt: 'desc' };
    this._limit = 20;
    this._participants = [];
    this._currentParticipant = null;
    this._collection = collectionType.PERMANENT;
    this._controller = null;
    this._isLastPage = true;
    this._statistics = null;
    this.isListLoading = false;
  };
}

decorate(ParticipantStore, {
  _filter: observable,
  _sorter: observable,
  _limit: observable,
  _participants: observable,
  _currentParticipant: observable,
  _collection: observable,
  _isLastPage: observable,
  _statistics: observable,
  isListLoading: observable,
  setCurrentParticipant: action,
  setFilter: action,
  setSorter: action,
  setLimit: action,
  setCollection: action,
  goToPreviousPage: action,
  goToNextPage: action,
  setIsListLoading: action,
  participants: computed,
  numOfNewParticipants: computed,
  isLastPage: computed,
  limit: computed,
  clearStore: action,
});

let participantStore = new ParticipantStore();
export default participantStore;
