import { observable, action, computed, autorun, decorate } from 'mobx';
import service from "../facade/service"

const db = service.getDatabase();

class ParticipantStore {
  _filter = {};
  
  _sorter = {};
  
  _participants = [];
  
  _collection = null;
  
  _unsubscribe = null;
  
  _onNext = (doc, newIndex, oldIndex, type) => {
    let newList = this._participants.slice();
    
    switch (type) {
      case 'added':
        newList.splice(newIndex, 0, doc);
        this._participants = newList;
        break;
        
      case 'modified':
        // TODO: update record in list
        break;
        
      case 'removed':
        // TODO: remove record from list
        break;

      default:
        // Do nothing
    }
  }
  
  _updateList = autorun(() => {
    // Run this whenever type of collection, filter, or sorter changes
    
    // Unsubscribe to previous real-time listener and reset list to empty
    if (this._unsubscribe) {
      this._participants = [];
      this._unsubscribe();
    }
    
    switch (this._collection) {
      case 'new':
        this._unsubscribe = db.getNewList(
          this._filter,
          this._sorter,
          this._onNext
        );
        break;
        
      case 'permanent':
        this._unsubscribe = db.getPermanentList(
          this._filter,
          this._sorter,
          this._onNext
        );
        break;
        
      default:
        // Do nothing
    }
  })
  
  setFilter = filter => {
    this._filter = filter;
  }
  
  setSorter = sorter => {
    this._sorter = sorter;
  }
  
  setCollection = collection => {
    this._collection = collection;
  }
  
  get participants() {
    return this._participants;
  }
}

decorate(ParticipantStore, {
  _filter: observable,
  _sorter: observable,
  _participants: observable,
  _collection: observable,
  setFilter: action,
  setSorter: action,
  setCollection: action,
  participants: computed,
});

let participantStore = new ParticipantStore();
export default participantStore;
