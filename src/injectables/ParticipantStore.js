import { action, computed, observable } from 'mobx';

class ParticipantStore {
  // This could be where we set filters like all, approved, denied, etc
  currentViewingState = observable.box(null);

  // switches between the new list and the permanent list
  list = observable.box('new');

  newParticipants = observable([
    {
      lastName: 'Friend',
      firstName: 'Hello',
      address: '123 1st St',
      city: 'Surrey',
      id: 3,
    },
    {
      lastName: 'There',
      firstName: 'Hi',
      address: '125 2nd St',
      city: 'Surrey',
      id: 4,
    },
  ]);

  permanentParticipants = observable([
    {
      lastName: 'McTest',
      firstName: 'Test',
      address: '123 1st St',
      city: 'Surrey',
      id: 1,
    },
    {
      lastName: 'McBob',
      firstName: 'Bob',
      address: '125 2nd St',
      city: 'Surrey',
      id: 2,
    },
  ]);

  constructor() {
    this.fetchParticipants()
  }

  fetchParticipants = () => {
    // call DatabaseManager.getNewParticipants or whatever method gets the participants from the firestore

    // this.setNewParticipants()
    // this.setPermanentParticipants()
    console.log('fetching participants...')
  }

  setViewingState = action((state) => {
    this.currentViewingState = state;
  });

  setNewParticipants = action((participants) => {
    this.newParticipants = participants;
  });

  setPermanentParticipants = action((participants) => {
    this.permanentParticipants = participants;
  });

  sortParticipantsByValue = action((value) => {
    // sorting functionality tbd
  });

  getCurrentViewingState = () => this.currentViewingState;
  
  getListMode = () => this.list;

  getParticipants = () => {
    if (this.list.get() === 'new') {
      return this.newParticipants
    } else {
      return this.permanentParticipants
    }
  }

  getParticipantsByState = computed(() =>
    // returns a filtered list of participants by current viewing state (approved, declined, etc)
    this.getParticipants().filter(
      (participant) => participant.state === this.currentViewingState.get(),
    ));
}

let participantStore = new ParticipantStore();
export default participantStore;
