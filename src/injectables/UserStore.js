import { action, autorun, computed, decorate, observable } from 'mobx';
import service from '../facade/service';
import { uiStore } from './index';

const userService = service.getUserList();
const authService = service.getAuthentication();

/**
 * Object equality function
 * @param {Object} obj1
 * @param {Object} obj2
 */
const checkEqual = (obj1, obj2) => {
  return Object.entries(obj1).sort().toString() === Object.entries(obj2).sort().toString();
};

/**
 * MobX state management store for the user account data
 */
class UserStore {
  documentType = {
    ADDED: 'added',
    MODIFIED: 'modified',
    REMOVED: 'removed',
  };

  // current filter
  _filter = {};

  // current sorter
  _sorter = { nameLower: 'asc' };

  // list of users
  _users = [];

  // currently-signed in user
  _currentSignedInUser = {};

  // currently-selected user
  _selectedUser = null;

  // Controller object for filtering/sorting/listening
  _controller = null;

  // isLastPage flag
  _isLastPage = true;

  // number of results allowed per page
  _limit = 20;

  // isInit flag
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

  /**
   * Setter for selectedUser
   * @param {Object} user user data object
   */
  setSelectedUser = (user) => {
    this._selectedUser = user;
  };

  /**
   * Setter for filter
   * @param {Object} filter filter object
   */
  setFilter = (filter) => {
    if (checkEqual(filter, this._filter)) {
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
   * Backward page change handler function
   */
  goToPreviousPage = () => {
    this._controller.back(() => (this._users = []));
  };

  /**
   * Backward page change handler function
   */
  goToNextPage = () => {
    this._controller.next(() => (this._users = []));
  };

  /**
   * Getter for users
   */
  get users() {
    return this._users;
  }

  /**
   * Getter for isLastPage flag
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
   * Getter for currentSignedInUser
   */
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
