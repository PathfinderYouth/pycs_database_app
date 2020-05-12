import { action, autorun, computed, decorate, observable } from 'mobx';
import service from '../facade/service';

const db = service.getDatabase();

class ParticipantStore {
  collectionType = {
    NEW: 'new',
    PERMANENT: 'permanent',
  };

  documentType = {
    ADDED: 'added',
    MODIFIED: 'modifed',
    REMOVED: 'removed',
  };

  _filter = {};

  _sorter = { lastName: 'asc' };

  _limit = 20;

  _participants = [];

  _currentParticipant = null;

  _collection = this.collectionType.NEW;

  _controller = null;

  _isFirstPage = true;

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

    let currentEndId = newList[newList.length - 1].id;
    this._isLastPage = this._controller.endId === currentEndId;
  };

  _updateList = autorun(() => {
    // Run this whenever type of collection, filter, or sorter changes

    // Unsubscribe to previous real-time listener and reset list to empty
    if (this._controller) {
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
  });

  setCurrentParticipant = participant => {
    this._currentParticipant = participant;
  };

  setFilter = filter => {
    this._filter = filter;
  };

  setSorter = sorter => {
    this._sorter = sorter;
  };

  setLimit = limit => {
    this._limit = limit;
  };

  setCollection = collection => {
    this._collection = collection;
  };

  goToPreviousPage = () => {
    this._controller.prevPage(page => {
      this._participants = [];
      this._isFirstPage = page === 0;
    });
  };

  goToNextPage = () => {
    this._controller.nextPage(page => {
      this._participants = [];
    });
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

  get isFirstPage() {
    return this._isFirstPage;
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
  _isFirstPage: observable,
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
  isFirstPage: computed,
  isLastPage: computed,
});

let participantStore = new ParticipantStore();
export default participantStore;
