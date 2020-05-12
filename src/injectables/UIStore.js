import { action, computed, decorate, observable } from 'mobx';

class UIStore {
  participantHeaders = [
    { id: 'status', label: 'Status' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'firstName', label: 'First Name' },
    { id: 'birthDate', label: 'Date of Birth' },
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
  ];

  staffHeaders = [
    { id: 'email', label: 'Email' },
    { id: 'name', label: 'Name' },
    { id: 'role', label: 'Role' },
  ];

  viewModes = {
    PARTICIPANTS_LIST: 'participantList',
    PARTICIPANT_DETAIL: 'participantDetail',
    STAFF_LIST: 'staffList',
    STAFF_DETAIL: 'staffDetail',
    STATISTICS: 'statistics',
  };

  currentViewMode = this.viewModes.PARTICIPANT_LIST;

  currentParticipantDetailStep = 0; // index of current details step (corresponding to intake form steps)

  navigationDrawerOpen = false;

  get headers() {
    return this.currentViewMode === this.viewModes.STAFF_LIST
      ? this.staffHeaders
      : this.participantHeaders;
  }

  get currentDetailViewMode() {
    return this.currentViewMode === this.viewModes.STAFF_LIST
      ? this.viewModes.STAFF_DETAIL
      : this.viewModes.PARTICIPANT_DETAIL;
  }

  get currentListViewMode() {
    return this.currentViewMode === this.viewModes.STAFF_DETIAL
      ? this.viewModes.STAFF_LIST
      : this.viewModes.PARTICIPANT_LIST;
  }

  setCurrentViewMode = (viewMode) => {
    this.currentViewMode = viewMode;
  };

  setCurrentParticipantDetailStep = (stepIndex) => {
    this.currentParticipantDetailStep = stepIndex;
  }

  setNavigationDrawerOpen = (isOpen) => {
    this.navigationDrawerOpen = isOpen;
  };
}

decorate(UIStore, {
  currentViewMode: observable,
  navigationDrawerOpen: observable,
  headers: computed,
  currentDetailViewMode: computed,
  currentListViewMode: computed,
  setCurrentViewMode: action,
  setCurrentParticipantDetailStep: action,
  setNavigationDrawerOpen: action,
});

let participantStore = new UIStore();
export default participantStore;
