import { action, autorun, computed, decorate, observable } from 'mobx';
import { collectionType } from '../constants';
import service from '../facade/service';

const db = service.getDatabase();

const checkEqual = (obj1, obj2) => {
  return Object.entries(obj1).sort().toString() === Object.entries(obj2).sort().toString();
};

class ParticipantStore {
  documentType = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };

  _filter = { status: null };

  _sorter = { createdAt: 'desc' };

  _limit = 20;

  _participants = [];

  _currentParticipant = null;

  _collection = collectionType.PERMANENT;

  _controller = null;

  _isLastPage = true;

  _statistics = null;

  isListLoading = false;

  constructor() {
    db.getNumOfNew((doc) => {
      this._statistics = doc;
    });
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
            this.setIsListLoading
          );
          break;

        case collectionType.PERMANENT:
          this._controller = db.getPermanentList(
            this._filter,
            this._sorter,
            this._limit,
            this._onChildNext,
            this.setIsListLoading
          );
          break;

        default:
        // Do nothing
      }
    },
    // Setting delay so we don't make too many queries in a short amount of time
    { delay: 500 },
  );

  setCurrentParticipant = (participant) => {
    this._currentParticipant = participant;
  };

  setFilter = (filter) => {
    if (checkEqual(filter, this._filter)) {
      return;
    }

    let { status: oldStatus, ...oldFilter } = this._filter;
    let { status: newStatus, ...newFilter } = filter;
    if (!Object.values(oldFilter)[0] && !Object.values(newFilter)[0]) {
      return;
    }

    this._filter = filter;
  };

  setSorter = (sorter) => {
    if (checkEqual(sorter, this._sorter)) {
      return;
    }
    this._sorter = sorter;
  };

  setLimit = (limit) => {
    this._limit = limit;
  };

  setCollection = (collection) => {
    this._collection = collection;
  };

  goToPreviousPage = () => {
    this._controller.back(() => (this._participants = []));
  };

  goToNextPage = () => {
    this._controller.next(() => (this._participants = []));
  };

  setIsListLoading = (isLoading) => {
    this.isListLoading = isLoading;
  };

  get participants() {
    return this._participants;
  }

  get collection() {
    return this._collection;
  }

  /**
   * Gets the currently-selected participant
   */
  get currentParticipant() {
    return this._currentParticipant;
  }

  get numOfNewParticipants() {
    if (this._statistics && this._statistics.numOfNew) {
      return this._statistics.numOfNew;
    }
    return 0;
  }

  get statisticsCounts() {
    if (this._statisticsGroupCounts) {
      return this._statisticsGroupCounts;
    }
    return null;
  }

  get isLastPage() {
    return this._isLastPage;
  }

  get limit() {
    return this._limit;
  }

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
  }
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
  clearStore: action
});

let participantStore = new ParticipantStore();
export default participantStore;
