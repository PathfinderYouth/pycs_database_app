import { action, computed, decorate, observable } from 'mobx';
import { participantDetailViewModes, viewModes } from '../constants';

class UIStore {
  participantHeaders = [
    { id: 'nameLast', queryId: 'nameLastLower', label: 'Last Name', sortable: true },
    { id: 'nameGiven', queryId: 'nameGivenLower', label: 'Given Name(s)', sortable: true },
    { id: 'status', label: 'Status', sortable: false },
    { id: 'birthDate', queryId: 'birthDate', label: 'Date of Birth', sortable: true },
    { id: 'addressCity', queryId: 'addressCityLower', label: 'City', sortable: true },
    { id: 'createdAt', queryId: 'createdAt', label: 'Enrolled', sortable: true },
  ];

  staffHeaders = [
    { id: 'name', queryId: 'nameLower', label: 'Name', sortable: true },
    { id: 'email', queryId: 'emailLower', label: 'Email', sortable: true },
    { id: 'role', queryId: 'role', label: 'Role', sortable: true },
    { id: 'action', label: 'Action', sortable: false },
  ];

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

  staffSearchFilters = [
    { id: 'name', queryId: 'nameLower', label: 'Name' },
    { id: 'email', queryId: 'emailLower', label: 'Email' },
    { id: 'role', queryId: 'role', label: 'Role' },
  ];

  currentViewMode = viewModes.PARTICIPANT_LIST;

  currentParticipantDetailStep = 0; // index of current details step (corresponding to intake form steps)

  currentParticipantDetailViewMode = participantDetailViewModes.VIEW;

  currentParticipantViewOrder = 'desc';

  currentParticipantViewOrderBy = 'createdAt';

  currentStaffViewOrder = 'asc';

  currentStaffViewOrderBy = this.staffHeaders[0].id;

  currentParticipantSearchField = this.participantSearchFilters[0].queryId;

  currentStaffSearchField = this.staffSearchFilters[0].queryId;

  currentSearchValue = '';

  recordSearchBoxActive = false;

  navigationDrawerOpen = false;

  get headers() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.staffHeaders
      : this.participantHeaders;
  }

  get filters() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.staffSearchFilters
      : this.participantSearchFilters;
  }

  get searchFilters() {
    return this.currentViewMode === viewModes.PARTICIPANT_LIST
      ? this.participantSearchFilters
      : this.staffSearchFilters;
  }

  get currentDetailViewMode() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? viewModes.STAFF_DETAIL
      : viewModes.PARTICIPANT_DETAIL;
  }

  get currentListViewMode() {
    return this.currentViewMode === viewModes.STAFF_DETAIL
      ? viewModes.STAFF_LIST
      : viewModes.PARTICIPANT_LIST;
  }

  get currentListViewOrder() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffViewOrder
      : this.currentParticipantViewOrder;
  }

  get currentListViewOrderBy() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffViewOrderBy
      : this.currentParticipantViewOrderBy;
  }

  get currentSearchField() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.currentStaffSearchField
      : this.currentParticipantSearchField;
  }

  get currentSearchText() {
    return this.currentSearchValue;
  }

  setCurrentViewMode = (viewMode) => {
    this.currentViewMode = viewMode;
  };

  setCurrentParticipantDetailStep = (stepIndex) => {
    this.currentParticipantDetailStep = stepIndex;
  };

  setCurrentParticipantDetailViewMode = (viewMode) => {
    this.currentParticipantDetailViewMode = viewMode;
  };

  setCurrentSearchField = (field) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffSearchField = field;
    } else {
      this.currentParticipantSearchField = field;
    }
  };

  setCurrentSearchText = (text) => {
    this.currentSearchValue = text;
  };

  setRecordSearchBoxActive = (isActive) => {
    this.recordSearchBoxActive = isActive;
  };

  setNavigationDrawerOpen = (isOpen) => {
    this.navigationDrawerOpen = isOpen;
  };

  setCurrentListViewOrder = (order) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrder = order;
    } else {
      this.currentParticipantViewOrder = order;
    }
  };

  setCurrentListViewOrderBy = (orderBy) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrderBy = orderBy;
    } else {
      this.currentParticipantViewOrderBy = orderBy;
    }
  };
}

decorate(UIStore, {
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
  currentSearchValue: observable,
  recordSearchBoxActive: observable,
  headers: computed,
  filters: computed,
  currentDetailViewMode: computed,
  currentListViewMode: computed,
  currentListViewOrder: computed,
  currentListViewOrderBy: computed,
  currentSearchField: computed,
  currentSearchText: computed,
  setCurrentViewMode: action,
  setCurrentParticipantDetailStep: action,
  setCurrentParticipantDetailViewMode: action,
  setCurrentSearchField: action,
  setCurrentSearchText: action,
  setRecordSearchBoxActive: action,
  setNavigationDrawerOpen: action,
  setCurrentListViewOrder: action,
  setCurrentListViewOrderBy: action,
});

let participantStore = new UIStore();
export default participantStore;
