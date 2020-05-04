import React from 'react';
import { RecordTable } from './RecordTable';

// for testing table view
const records = [
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
];

export const RecordListContainer = props => {
  /*
    Valid values for props.type
     + 'new': new collection
     + 'pending': status = 'Pending'
     + 'approved': status = 'Approved'
     + 'declined': status = 'Declined'
     + 'deleted': status = 'Deleted'
     + null | undefined: both collections
    What records to send to <RecordTable /> depends on this value.
  */
  return (
    <div>
      {/* TODO: filter components here */}
      <RecordTable records={records} />
    </div>
  );
};
