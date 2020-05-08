import React, { useEffect, useState } from 'react';
import { ListContainer, NavDrawer, TopNavBar } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { participantStore } from '../injectables';
import Typography from '@material-ui/core/Typography';
import { viewModes } from './components/viewMode';
import './Database.css';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

// container that holds all database UI objects
export const Database = inject('participantStore')(
  observer(() => {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState(false);
    // Get record clicked from RecordListContainer.js and passed to RecordDialog.js
    const [openParticipantRecord, setOpenParticipantRecord] = useState(null);
    const [openStaffRecord, setOpenStaffRecord] = useState(null);
    const [viewMode, setViewMode] = useState(viewModes.PARTICIPANT_LIST);

    const { participants, setCollection, numOfNewParticipants } = participantStore;

    const participantHeaders = [
      { id: 'status', label: 'Status' },
      { id: 'lastName', label: 'Last Name' },
      { id: 'firstName', label: 'First Name' },
      { id: 'birthDate', label: 'Date of Birth' },
      { id: 'address', label: 'Address' },
      { id: 'city', label: 'City' },
    ];

    const staffHeaders = [
      { id: 'lastName', label: 'Last Name' },
      { id: 'firstName', label: 'First Name' },
      { id: 'role', label: 'Role' },
    ];

    const handleDrawerOpen = () => {
      setDrawerState(true);
    };

    const handleDrawerClose = () => {
      setDrawerState(false);
    };

    const handleParticipantOpen = () => {
      setViewMode(viewModes.PARTICIPANT_DETAIL);
    };

    const handleParticipantClose = () => {
      setViewMode(viewModes.PARTICIPANT_LIST);
    };

    const handleStaffOpen = () => {
      setViewMode(viewModes.STAFF_DETAIL);
    };

    const handleStaffClose = () => {
      setViewMode(viewModes.STAFF_LIST);
    };

    const viewSwitch = () => {
      switch (viewMode) {
        case viewModes.PARTICIPANT_LIST:
          return (
            <ListContainer
              headers={participantHeaders}
              records={participants}
              setRowClicked={setOpenParticipantRecord}
              handleRowOpened={handleParticipantOpen}
              handleRowClosed={handleParticipantClose}
            />
          );
        case viewModes.PARTICIPANT_DETAIL:
          return (
            <div>
              <Typography variant="h1" onClick={handleParticipantClose}>
                Back!
              </Typography>
            </div>
          );
        case viewModes.STAFF_LIST:
          return (
            <ListContainer
              headers={staffHeaders}
              records={null} //TODO
              setRowClicked={setOpenStaffRecord}
              handleRowOpened={handleStaffOpen}
              handleRowClosed={handleStaffClose}
            />
          );
        case viewModes.STAFF_DETAIL:
          //TODO
          return null;
        default:
          return null;
      }
    };

    useEffect(() => {
      // Do this after the component is initialized
      setCollection('new');

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={`${classes.root} root`}>
        <TopNavBar handleDrawerOpen={handleDrawerOpen} handleDrawerState={drawerState} />
        <NavDrawer
          handleDrawerClose={handleDrawerClose}
          handleDrawerState={drawerState}
          viewMode={viewMode}
          numNew={numOfNewParticipants}
        />
        <div className={`${classes.content} content`}>{viewSwitch(viewMode)}</div>
      </div>
    );
  }),
);
