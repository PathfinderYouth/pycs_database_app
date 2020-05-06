import { observable, action, computed, decorate } from 'mobx';

class ParticipantStore {
  // This could be where we set filters like all, approved, denied, etc
  currentViewingState = null;

  // switches between the new list and the permanent list
  list = 'new';

  newParticipants = [
    {
      lastName: 'Friend',
      firstName: 'Hello',
      address: '123 1st St',
      city: 'Surrey',
      id: 3,
      status: 'Pending',
      birthDate: 'Jan 1, 1999',
    },
    {
      lastName: 'There',
      firstName: 'Hi',
      address: '125 2nd St',
      city: 'Surrey',
      id: 4,
      status: 'Pending',
      birthDate: 'Dec 31, 2002',
    },
  ];

  permanentParticipants = [
    {
      lastName: 'McTest',
      firstName: 'Test',
      address: '123 1st St',
      city: 'Surrey',
      id: 1,
      status: 'Approved',
      birthDate: 'Feb 29, 2000',
    },
    {
      lastName: 'McBob',
      firstName: 'Bob',
      address: '125 2nd St',
      city: 'Surrey',
      id: 2,
      status: 'Denied',
      birthDate: 'Jan 1, 1979',
    },
  ];

  constructor() {
    this.fetchParticipants();
  }

  fetchParticipants = () => {
    // call DatabaseManager.getNewParticipants or whatever method gets the participants from the firestore

    // this.setNewParticipants()
    // this.setPermanentParticipants()
    console.log('fetching participants...');
  };

  setViewingState = (state) => {
    this.currentViewingState = state;
  };

  setListView = (list) => {
    this.list = list;
  };

  setNewParticipants = (participants) => {
    this.newParticipants = participants;
  };

  setPermanentParticipants = (participants) => {
    this.permanentParticipants = participants;
  };

  sortParticipantsByValue = (value) => {
    // sorting functionality tbd
  };

  get participants() {
    return this.list === 'new'
      ? this.newParticipants
      : this.permanentParticipants;
  }

  // This method needs some work & testing with actual data
  // getParticipantsByState = () =>
  //   // returns a filtered list of participants by current viewing state (approved, declined, etc)
  //   this.participants.filter(
  //     (participant) =>
  //       participant.state === this.currentViewingState.get(),
  //   );
}

decorate(ParticipantStore, {
  currentViewingState: observable,
  list: observable,
  newParticipants: observable,
  permanentParticipants: observable,
  participants: computed,
  setViewingState: action,
  setListView: action,
  setNewParticipants: action,
  setPermanentParticipants: action,
});

let participantStore = new ParticipantStore();
export default participantStore;
