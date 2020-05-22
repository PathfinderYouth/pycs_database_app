import { action, computed, decorate, observable } from 'mobx';
import { participantDetailViewModes, viewModes } from '../constants';

/**
 * MobX state management store for the user interface
 */
class UIStore {
  // participant list table headers
  participantHeaders = [
    { id: 'nameLast', queryId: 'nameLastLower', label: 'Last Name', sortable: true },
    { id: 'nameGiven', queryId: 'nameGivenLower', label: 'Given Name(s)', sortable: true },
    { id: 'status', label: 'Status', sortable: false },
    { id: 'birthDate', queryId: 'birthDate', label: 'Date of Birth', sortable: true },
    { id: 'addressCity', queryId: 'addressCityLower', label: 'City', sortable: true },
    { id: 'createdAt', queryId: 'createdAt', label: 'Enrolled', sortable: true },
  ];

  // staff list table headers
  staffHeaders = [
    { id: 'name', queryId: 'nameLower', label: 'Name', sortable: true },
    { id: 'email', queryId: 'emailLower', label: 'Email', sortable: true },
    { id: 'role', queryId: 'role', label: 'Role', sortable: true },
    { id: 'action', label: 'Actions', sortable: false },
  ];

  // participant search bar options
  participantSearchFilters = [
    { id: 'nameLast', queryId: 'nameLastLower', label: 'Last Name' },
    { id: 'nameGiven', queryId: 'nameGivenLower', label: 'Given Name(s)' },
    { id: 'addressStreet', queryId: 'addressStreetLower', label: 'Street Address' },
    { id: 'addressCity', queryId: 'addressCityLower', label: 'City' },
    { id: 'email', queryId: 'emailLower', label: 'Email' },
    { id: 'phoneHome', queryId: 'phoneHome', label: 'Home Phone' },
    { id: 'phoneCell', queryId: 'phoneCell', label: 'Cell Phone' },
    { id: 'sin', queryId: 'sin', label: 'SIN' },
  ];

  // staff search bar options
  staffSearchFilters = [
    { id: 'name', queryId: 'nameLower', label: 'Name' },
    { id: 'email', queryId: 'emailLower', label: 'Email' },
    { id: 'role', queryId: 'role', label: 'Role' },
  ];

  // current intake for m index, initialized to -1 so the form always starts on the intake form start page
  currentIntakeFormStep = -1;

  // current view mode of the list of the database app
  currentViewMode = viewModes.PARTICIPANT_LIST;

  // current index of participant details step (corresponding to intake form steps)
  currentParticipantDetailStep = 0;

  // current view mode of the detail view
  currentParticipantDetailViewMode = participantDetailViewModes.VIEW;

  // current sorting order for participant list
  currentParticipantViewOrder = 'desc';

  // current header to order by for participant list
  currentParticipantViewOrderBy = 'createdAt';

  // current sorting order for user list
  currentStaffViewOrder = 'asc';

  // current header to order by for user list
  currentStaffViewOrderBy = 'name';

  // current header to search with for the participant list
  currentParticipantSearchField = this.participantSearchFilters[0].queryId;

  // current header to search with for the user list
  currentStaffSearchField = this.staffSearchFilters[0].queryId;

  // current search text
  currentSearchValue = '';

  // list of visited steps for the intake form
  visitedIntakeFormSteps = [0];

  // flag for active search bar
  recordSearchBoxActive = false;

  // open close state of the navigation drawer
  navigationDrawerOpen = false;

  // flag whether the database is active and connected or not
  databaseActive = false;

  // sets list of headers to the correct list of headers depending on the currentViewMode
  get headers() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.staffHeaders
      : this.participantHeaders;
  }

  // sets list of filters to the correct list of headers depending on the currentViewMode
  get filters() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.staffSearchFilters
      : this.participantSearchFilters;
  }

  // sets list of searching filters to the correct list of headers depending on the currentViewMode
  get searchFilters() {
    return this.currentViewMode === viewModes.PARTICIPANT_LIST
      ? this.participantSearchFilters
      : this.staffSearchFilters;
  }

  // sets list of filters to the correct list of headers depending on the currentViewMode
  get currentDetailViewMode() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? viewModes.STAFF_DETAIL
      : viewModes.PARTICIPANT_DETAIL;
  }

  // sets currentListViewMode depending on the currentViewMode
  get currentListViewMode() {
    return this.currentViewMode === viewModes.STAFF_DETAIL
      ? viewModes.STAFF_LIST
      : viewModes.PARTICIPANT_LIST;
  }

  // sets currentListViewOrder depending on the currentViewMode
  get currentListViewOrder() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffViewOrder
      : this.currentParticipantViewOrder;
  }

  // sets currentListViewOrderBy depending on the currentViewMode
  get currentListViewOrderBy() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffViewOrderBy
      : this.currentParticipantViewOrderBy;
  }

  // sets currentSearchField depending on the currentViewMode
  get currentSearchField() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffSearchField
      : this.currentParticipantSearchField;
  }

  // sets currentSearch text depending on currentSearchValue
  get currentSearchText() {
    return this.currentSearchValue;
  }

  /**
   * Setter for currentIntakeFormStep
   * @param {int} stepIndex index of the current form step
   */
  setCurrentIntakeFormStep = (stepIndex) => {
    this.currentIntakeFormStep = stepIndex;
  };

  /**
   * Setter for currentViewMode
   * @param {string} viewMode view mode to set - participantList | participantDetail | staffList |
   * staffDetail | statistics
   */
  setCurrentViewMode = (viewMode) => {
    this.currentViewMode = viewMode;
  };

  /**
   * Setter for currentParticipantDetailStep
   * @param {int} stepIndex index of the current form step
   */
  setCurrentParticipantDetailStep = (stepIndex) => {
    this.currentParticipantDetailStep = stepIndex;
  };

  /**
   * Setter for currentParticipantDetailViewMode
   * @param {string} viewMode  view mode to set - view | edit | create
   */
  setCurrentParticipantDetailViewMode = (viewMode) => {
    this.currentParticipantDetailViewMode = viewMode;
  };

  /**
   * Setter for currentStaffSearchField or currentParticipantSearchField depending on the currentViewMode
   * @param {string} field field name
   */
  setCurrentSearchField = (field) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffSearchField = field;
    } else {
      this.currentParticipantSearchField = field;
    }
  };

  /**
   * Setter for currentSearchValue
   * @param {string} text search text
   */
  setCurrentSearchText = (text) => {
    this.currentSearchValue = text;
  };

  /**
   * Setter for recordSearchBoxActive
   * @param {boolean} isActive isActive flag
   */
  setRecordSearchBoxActive = (isActive) => {
    this.recordSearchBoxActive = isActive;
  };

  /**
   * Setter for navigationDrawerOpen
   * @param {boolean} isOpen isOpen flag
   */
  setNavigationDrawerOpen = (isOpen) => {
    this.navigationDrawerOpen = isOpen;
  };

  /**
   * Setter for currentStaffViewOrder or currentParticipantViewOrder, depending on currentViewMode
   * @param {string} order order direction - asc | desc
   */
  setCurrentListViewOrder = (order) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrder = order;
    } else {
      this.currentParticipantViewOrder = order;
    }
  };

  /**
   * Setter for currentStaffViewOrderBy or currentParticipantViewOrderBy, depending on currentViewMode
   * @param {string} orderBy header to order by
   */
  setCurrentListViewOrderBy = (orderBy) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrderBy = orderBy;
    } else {
      this.currentParticipantViewOrderBy = orderBy;
    }
  };

  /**
   * Setter for databaseActive
   * @param {boolean} isActive isActive flag
   */
  setDatabaseActive = (isActive) => {
    this.databaseActive = isActive;
  };
}

decorate(UIStore, {
  currentIntakeFormStep: observable,
  currentViewMode: observable,
  navigationDrawerOpen: observable,
  currentParticipantDetailStep: observable,
  currentParticipantDetailViewMode: observable,
  currentParticipantViewOrder: observable,
  currentParticipantViewOrderBy: observable,
  currentStaffViewOrder: observable,
  currentStaffViewOrderBy: observable,
  currentStaffSearchField: observable,
  currentParticipantSearchField: observable,
  visitedIntakeFormSteps: observable,
  currentSearchValue: observable,
  recordSearchBoxActive: observable,
  databaseActive: observable,
  headers: computed,
  filters: computed,
  currentDetailViewMode: computed,
  currentListViewMode: computed,
  currentListViewOrder: computed,
  currentListViewOrderBy: computed,
  currentSearchField: computed,
  currentSearchText: computed,
  setCurrentIntakeFormStep: action,
  setCurrentViewMode: action,
  setCurrentParticipantDetailStep: action,
  setCurrentParticipantDetailViewMode: action,
  setCurrentSearchField: action,
  setCurrentSearchText: action,
  setRecordSearchBoxActive: action,
  visitIntakeFormStep: action,
  setNavigationDrawerOpen: action,
  setCurrentListViewOrder: action,
  setCurrentListViewOrderBy: action,
  setDatabaseActive: action,
});

let participantStore = new UIStore();
export default participantStore;
