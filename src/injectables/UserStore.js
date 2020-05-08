import {
  observable,
  action,
  computed,
  autorun,
  decorate,
} from 'mobx';
import service from '../facade/service';

const db = service.getUserList();

class UserStore {
  _filter = {};

  _sorter = {};

  _users = [];

  _unsubscribe = null;

  _onChildNext = (doc, newIndex, oldIndex, type) => {
    let newList = this._users.slice();

    switch (type) {
      case 'added':
        newList.splice(newIndex, 0, doc);
        break;

      case 'modified':
        newList.splice(oldIndex, 1);
        newList.splice(newIndex, 0, doc);
        break;

      case 'removed':
        newList.splice(oldIndex, 1);
        break;

      default:
      // Do nothing
    }

    this._users = newList;
  };

  _updateList = autorun(() => {
    if (this._unsubscribe) {
      this._users = [];
      this._unsubscribe();
    }

    this._unsubscribe = db.getAllList(
      this._filter,
      this._sorter,
      this._onChildNext,
    );
  });

  setFilter = (filter) => {
    this._filter = filter;
  };

  setSorter = (sorter) => {
    this._sorter = sorter;
  };

  get users() {
    return this._users;
  }
}

decorate(UserStore, {
  _filter: observable,
  _sorter: observable,
  _users: observable,
  setFilter: action,
  setSorter: action,
  users: computed,
});

let userStore = new UserStore();
export default userStore;
