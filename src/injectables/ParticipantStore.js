import { action, autorun, computed, decorate, observable } from 'mobx';
import service from '../facade/service';

const db = service.getDatabase();

class ParticipantStore {

  collectionType = {
    NEW: 'new',
    PERMANENT: 'permanent'
  }

  documentType = {
    ADDED: 'added',
    MODIFIED: 'modifed',
    REMOVED: 'removed'
  }

  _filter = {};

  _sorter = {};

  _participants = [];

  _currentParticipant = null;

  _collection = this.collectionType.NEW;

  _controller = null;

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
          10,
          this._onChildNext,
        );
        break;

      case this.collectionType.PERMANENT:
        this._controller = db.getPermanentList(
          this._filter,
          this._sorter,
          10,
          this._onChildNext,
        );
        break;

      default:
      // Do nothing
    }
  });

  setCurrentParticipant = (participant) => {
    this._currentParticipant = participant;
  }

  setFilter = (filter) => {
    this._filter = filter;
  };

  setSorter = sorter => {
    this._sorter = sorter;
  };

  setCollection = collection => {
    this._collection = collection;
  };

  get participants() {
    // console.log(this._participants)
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
}

decorate(ParticipantStore, {
  _filter: observable,
  _sorter: observable,
  _participants: observable,
  _currentParticipant: observable,
  _collection: observable,
  _statistics: observable,
  setCurrentParticipant: action,
  setFilter: action,
  setSorter: action,
  setCollection: action,
  participants: computed,
  numOfNewParticipants: computed,
});

let participantStore = new ParticipantStore();
export default participantStore;
