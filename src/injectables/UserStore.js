import { action, autorun, computed, decorate, observable } from 'mobx';
import service from '../facade/service';
import { uiStore } from './index';

const userService = service.getUserList();
const authService = service.getAuthentication();

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

  _sorter = { nameLower: 'asc' };

  _users = [];

  _currentSignedInUser = {};

  _selectedUser = null;

  _controller = null;

  _isLastPage = true;

  _limit = 20;

  _isInit = false;

  /**
   * synchronize firebase authentication current user profile if information of a user
   * in user collection is updated
   * @param {email: string}
   * email of the user gets information updated.
   */
  updateCurrentUser = (email) => {
    if (!this._isInit) {
      userService.getUser(
        email,
        (user) => {
          if (user == null) {
            authService.signOut();
            return;
          }
          this._currentSignedInUser = user;
          let authUser = authService.getCurrentUser();
          if (!!authUser && authUser.displayName !== user.name) {
            authUser.updateProfile({
              displayName: user.name,
            });
          }
        },
        () => {},
      );
      this._isInit = true;
    }
  };

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
        if (this._controller) {
          this._isLastPage = true;
          this._users = [];
          this._controller.unsubscribe();
        }

        this._controller = userService.getAllList(
          this._filter,
          this._sorter,
          this._limit,
          this._onChildNext,
        );
      }
    },
    { delay: 500 },
  );

  setSelectedUser = (user) => {
    this._selectedUser = user;
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

  get limit() {
    return this._limit;
  }

  get currentSignedInUser() {
    return this._currentSignedInUser;
  }
}

decorate(UserStore, {
  _filter: observable,
  _sorter: observable,
  _limit: observable,
  _currentSignedInUser: observable,
  _users: observable,
  _isLastPage: observable,
  setSelectedUser: action,
  setFilter: action,
  setSorter: action,
  setLimit: action,
  updateCurrentUser: action,
  goToPreviousPage: action,
  goToNextPage: action,
  users: computed,
  isLastPage: computed,
  limit: computed,
  currentSignedInUser: computed,
});

let userStore = new UserStore();
export default userStore;
