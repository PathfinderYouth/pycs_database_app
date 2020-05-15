import { action, computed, decorate, observable } from 'mobx';
import { viewModes, participantDetailViewModes } from '../constants';

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

  currentViewMode = viewModes.PARTICIPANT_LIST;

  currentParticipantDetailStep = 0; // index of current details step (corresponding to intake form steps)

  currentParticipantDetailViewMode = participantDetailViewModes.VIEW;

  currentParticipantViewOrder = 'asc';

  currentParticipantViewOrderBy = this.participantHeaders[0].id;

  currentStaffViewOrder = 'asc';

  currentStaffViewOrderBy = this.staffHeaders[0].id;

  navigationDrawerOpen = false;

  get headers() {
    return this.currentViewMode === viewModes.STAFF_LIST
      ? this.staffHeaders
      : this.participantHeaders;
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

  get currentParticipantListOrder() {
    return this.currentParticipantViewOrder;
  }

  get currentParticipantListOrderBy() {
    return this.currentParticipantViewOrderBy;
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

  setNavigationDrawerOpen = (isOpen) => {
    this.navigationDrawerOpen = isOpen;
  };
  
  setCurrentListViewOrder = (order) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrder = order;
    } else {
      this.currentParticipantViewOrder = order;
    }
  }
  
  setCurrentListViewOrderBy = (orderBy) => {
    if (this.currentViewMode === viewModes.STAFF_LIST) {
      this.currentStaffViewOrderBy = orderBy;
    } else {
      this.currentParticipantViewOrderBy = orderBy;
    }
  }
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
  headers: computed,
  currentDetailViewMode: computed,
  currentListViewMode: computed,
  currentListViewOrder: computed,
  currentListViewOrderBy: computed,
  setCurrentViewMode: action,
  setCurrentParticipantDetailStep: action,
  setCurrentParticipantDetailViewMode: action,
  setNavigationDrawerOpen: action,
  setCurrentListViewOrder: action,
  setCurrentListViewOrderBy: action,
});

let participantStore = new UIStore();
export default participantStore;
