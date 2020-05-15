import { observable, action, computed, autorun, decorate } from 'mobx';
import service from '../facade/service';

const db = service.getUserList();

const checkEqual = (obj1, obj2) => {
  return Object.entries(obj1).sort().toString() === Object.entries(obj2).sort().toString();
};

class UserStore {
  documentType = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };

  _filter = {};

  _sorter = { name: 'asc' };

  _users = [];

  _selectedUser = null;

  _controller = null;

  _isLastPage = true;

  _limit = 20;

  _unsubscribe = null;

  _onChildNext = (doc, newIndex, oldIndex, type) => {
    let newList = this._users.slice();

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

    this._users = newList;
  };

  _updateList = autorun(() => {
    if (this._controller) {
      this._isLastPage = true;
      this._users = [];
      this._controller.unsubscribe();
    }

    this._unsubscribe = db.getAllList(this._filter, this._sorter, this._onChildNext);
  });

  setSelectedUser = (user) => {
    this._selectedUser = user;
  };

  goToPreviousPage = () => {
    this._controller.back(() => (this._participants = []));
  };

  goToNextPage = () => {
    this._controller.next(() => (this._participants = []));
  };

  setFilter = (filter) => {
    if (checkEqual(filter, this._filter)) {
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

  goToPreviousPage = () => {
    this._controller.back(() => (this._users = []));
  };

  goToNextPage = () => {
    this._controller.next(() => (this._users = []));
  };

  get users() {
    return this._users;
  }

  get isLastPage() {
    return this._isLastPage;
  }
}

decorate(UserStore, {
  _filter: observable,
  _sorter: observable,
  _users: observable,
  _controller: observable,
  _isLastPage: observable,
  setSelectedUser: action,
  setFilter: action,
  setSorter: action,
  setLimit: action,
  goToPreviousPage: action,
  goToNextPage: action,
  users: computed,
  isLastPage: computed,
});

let userStore = new UserStore();
export default userStore;
