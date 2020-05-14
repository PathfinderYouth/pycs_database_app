import { action, autorun, computed, decorate, observable } from 'mobx';
import service from '../facade/service';

const db = service.getDatabase();

const checkEqual = (obj1, obj2) => {
  return Object.entries(obj1).sort().toString() === Object.entries(obj2).sort().toString();
}

class ParticipantStore {
  collectionType = {
    NEW: 'new',
    PERMANENT: 'permanent',
  };

  documentType = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };

  _filter = { status: null };

  _sorter = { nameLast: 'asc' };

  _limit = 20;

  _participants = [];

  _currentParticipant = null;

  _collection = this.collectionType.PERMANENT;

  _controller = null;

  _isLastPage = true;

  _statistics = null;

  constructor() {
    db.getStatistics(doc => {
      this._statistics = doc;
    });
  }

  // This is an event listener/handler for when a document in a collection
  // changes. Firestore will send the event, and this method will handle it.
  // Reference: https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentChange
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

    if (newList.length > 0) {
      let currentEndId = newList[newList.length - 1].id;
      this._isLastPage = this._controller.endId === currentEndId;
    } else {
      this._isLastPage = true;
    }
  };

  _updateList = autorun(() => {
    // Run this whenever type of collection, filter, or sorter changes

    // Unsubscribe to previous real-time listener and reset list to empty
    if (this._controller) {
      this._isLastPage = true;
      this._participants = [];
      this._controller.unsubscribe();
    }

    switch (this._collection) {
      case this.collectionType.NEW:
        this._controller = db.getNewList(
          this._filter,
          this._sorter,
          this._limit,
          this._onChildNext,
        );
        break;

      case this.collectionType.PERMANENT:
        this._controller = db.getPermanentList(
          this._filter,
          this._sorter,
          this._limit,
          this._onChildNext,
        );
        break;

      default:
      // Do nothing
    }
  }, { delay: 500 });

  setCurrentParticipant = participant => {
    this._currentParticipant = participant;
  };

  setFilter = filter => {
    if (checkEqual(filter, this._filter)) {
      return;
    }
    this._filter = filter;
  };

  setSorter = sorter => {
    if (checkEqual(sorter, this._sorter)) {
      return;
    }
    this._sorter = sorter;
  };

  setLimit = limit => {
    this._limit = limit;
  };

  setCollection = collection => {
    this._collection = collection;
  };

  goToPreviousPage = () => {
    this._controller.back(() => this._participants = []);
  };

  goToNextPage = () => {
    this._controller.next(() => this._participants = []);
  };

  get participants() {
    return this._participants;
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

  get isLastPage() {
    return this._isLastPage;
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
  setCurrentParticipant: action,
  setFilter: action,
  setSorter: action,
  setLimit: action,
  setCollection: action,
  goToPreviousPage: action,
  goToNextPage: action,
  participants: computed,
  numOfNewParticipants: computed,
  isLastPage: computed,
});

let participantStore = new ParticipantStore();
export default participantStore;
