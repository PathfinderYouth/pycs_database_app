import { action, computed, decorate, observable } from 'mobx';
import { viewModes, participantDetailViewModes } from '../constants';

class UIStore {
  participantHeaders = [
    { id: 'nameLast', queryId: 'nameLastLower', label: 'Last Name' },
    { id: 'nameGiven', queryId: 'nameGivenLower', label: 'Given Name(s)' },
    { id: 'status', label: 'Status' },
    { id: 'birthDate', queryId: 'birthDate', label: 'Date of Birth' },
    { id: 'addressStreet', queryId: 'addressStreetLower', label: 'Street Address' },
    { id: 'addressCity', queryId: 'addressCityLower', label: 'City' },
  ];

  staffHeaders = [
    { id: 'name', queryId: 'name', label: 'Name' },
    { id: 'email', queryId: 'email', label: 'Email' },
    { id: 'role', queryId: 'role', label: 'Role' },
    { id: 'action', label: 'Action'},
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
    { id: 'name', queryId: 'name', label: 'Name' },
    { id: 'email', queryId: 'email', label: 'Email' },
    { id: 'role', queryId: 'role', label: 'Role' },
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
    for (const header of this.participantHeaders) {
      if (header.id === this.currentParticipantViewOrderBy) {
        return header.queryId;
      }
    }
    return null;
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
