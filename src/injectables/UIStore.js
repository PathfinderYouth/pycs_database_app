import { action, computed, decorate, observable } from 'mobx';

class UIStore {
  participantHeaders = [
    { id: 'nameLast', label: 'Last Name' },
    { id: 'nameGiven', label: 'Given Name(s)' },
    { id: 'status', label: 'Status' },
    { id: 'birthDate', label: 'Date of Birth' },
    { id: 'addressStreet', label: 'Street Address' },
    { id: 'addressCity', label: 'City' },
  ];

  staffHeaders = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
  ];

  viewModes = {
    PARTICIPANT_LIST: 'participantList',
    PARTICIPANT_DETAIL: 'participantDetail',
    STAFF_LIST: 'staffList',
    STAFF_DETAIL: 'staffDetail',
    STATISTICS: 'statistics',
  };

  participantSearchFilters = [
    { id: 'nameLast', label: 'Last Name' },
    { id: 'nameGiven', label: 'Given Name(s)' },
    { id: 'addressStreet', label: 'Street Address' },
    { id: 'addressCity', label: 'City' },
    { id: 'email', label: 'Email' },
    { id: 'phoneHome', label: 'Home Phone' },
    { id: 'phoneCell', label: 'Cell Phone' },
    { id: 'sin', label: 'SIN' },
  ];

  staffSearchFilters = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
  ];

  currentViewMode = this.viewModes.PARTICIPANT_LIST;

  currentParticipantDetailStep = 0; // index of current details step (corresponding to intake form steps)

  navigationDrawerOpen = false;

  get headers() {
    return this.currentViewMode === this.viewModes.STAFF_LIST
      ? this.staffHeaders
      : this.participantHeaders;
  }

  get searchFilters() {
    return this.currentViewMode === this.viewModes.PARTICIPANT_LIST
      ? this.participantSearchFilters
      : this.staffSearchFilters;
  }

  get currentDetailViewMode() {
    return this.currentViewMode === this.viewModes.STAFF_LIST
      ? this.viewModes.STAFF_DETAIL
      : this.viewModes.PARTICIPANT_DETAIL;
  }

  get currentListViewMode() {
    return this.currentViewMode === this.viewModes.STAFF_DETAIL
      ? this.viewModes.STAFF_LIST
      : this.viewModes.PARTICIPANT_LIST;
  }

  setCurrentViewMode = (viewMode) => {
    this.currentViewMode = viewMode;
  };

  setCurrentParticipantDetailStep = (stepIndex) => {
    this.currentParticipantDetailStep = stepIndex;
  };

  setNavigationDrawerOpen = (isOpen) => {
    this.navigationDrawerOpen = isOpen;
  };
}

decorate(UIStore, {
  currentViewMode: observable,
  navigationDrawerOpen: observable,
  currentParticipantDetailStep: observable,
  headers: computed,
  currentDetailViewMode: computed,
  currentListViewMode: computed,
  setCurrentViewMode: action,
  setCurrentParticipantDetailStep: action,
  setNavigationDrawerOpen: action,
});

let participantStore = new UIStore();
export default participantStore;
